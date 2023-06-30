const { application } = require('express');
const { json } = require('body-parser');
const mongoose = require('../db/connect');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ObjectId = require('mongodb').ObjectId;
const APIFeatures = require('../utils/apiFeatures');
const Puppy = require('./../models/puppy');

const getAllPuppies = catchAsync(async (req, res) => {
  /*
  #swagger.description = 'READ all puppies.'
*/

  const features = new APIFeatures(Puppy.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const puppies = await features.query;

  res.status(200).json({
    status: 'success',
    results: puppies.length,
    data: { puppies }
  });
});

const getPuppiesStats = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'GET stats for puppies.'
*/
  const stats = await Puppy.aggregate([
    // {
    //   $match: { puppyColor: { $eq: 'black' } }
    // },

    {
      $group: {
        _id: { $toUpper: '$puppyColor' },
        countByColor: { $count: {} }
        // _id: '$puppySex',
        // countByGender: { $count: {} }
      }
    },
    {
      $sort: { countByColor: -1 }
    }
  ]);
  res.status(200).json({
    status: 'success',
    data: { stats }
  });
});

const getPuppyById = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'READ a specific puppy by id.'
*/
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid id to find desired puppy.');
  }
  const puppyId = new ObjectId(req.params.id);
  const puppy = await Puppy.findById(puppyId);
  if (!puppy) {
    return next(new AppError('No puppy found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: { puppy }
  });
});

const addPuppy = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'CREATE a new puppy.'
*/
  if (!req.body.puppyTempName) {
    res.status(400).send({ message: 'Content cannot be empty!' });
    return;
  }
  const puppy = new Puppy({
    puppyTempName: req.body.puppyTempName,
    puppyDOB: req.body.puppyDOB,
    puppySex: req.body.puppySex,
    puppyColor: req.body.puppyColor,
    puppyCollar: req.body.puppyCollar,
    puppyAKC: req.body.puppyAKC,
    puppyNewName: req.body.puppyNewName
  });
  const newPuppy = await Puppy.create(puppy);
  res.status(201).json({
    status: 'success',
    data: { puppy: newPuppy }
  });
});

const updatePuppy = catchAsync(async (req, res) => {
  /*
  #swagger.description = 'UPDATE a specific puppy by id.'
*/
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid id to update desired puppy.');
  }
  const puppyId = new ObjectId(req.params.id);
  const changePuppy = {
    puppyTempName: req.body.puppyTempName,
    puppyDOB: req.body.puppyDOB,
    puppySex: req.body.puppySex,
    puppyColor: req.body.puppyColor,
    puppyCollar: req.body.puppyCollar,
    puppyAKC: req.body.puppyAKC,
    puppyNewName: req.body.puppyNewName
  };
  const puppy = await Puppy.findByIdAndUpdate(puppyId, changePuppy, {
    new: true,
    runValidators: true
  });
  if (!puppy) {
    return next(new AppError('No puppy found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: { puppy }
  });
});

const deletePuppy = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'DELETE a puppy by id.'
*/
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid id to delete desired puppy.');
  }
  const puppyId = new ObjectId(req.params.id);
  const puppy = await Puppy.findByIdAndDelete(puppyId);
  if (!puppy) {
    return next(new AppError('No puppy found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});

module.exports = {
  getAllPuppies,
  getPuppyById,
  getPuppiesStats,
  addPuppy,
  updatePuppy,
  deletePuppy
};
