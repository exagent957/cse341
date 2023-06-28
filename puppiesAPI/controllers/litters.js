/**** CSE341 Web Services - Project 2 - Puppies API ****/
const { application } = require('express');
const mongoose = require('../db/connect');
const { json } = require('body-parser');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const ObjectId = require('mongodb').ObjectId;
const Litter = require('./../models/litter');

const getAllLitters = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'READ all litters.'
*/
  const litters = await Litter.find();
  res.status(200).json({
    status: 'success',
    results: litters.length,
    data: { litters }
  });
});

const getLitterById = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'READ a specific litter by id.'
*/
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid litter id to find desired litter.');
  }
  const litterId = new ObjectId(req.params.id);
  const litter = await Litter.findById(litterId);
  res.status(200).json({
    status: 'success',
    data: { litter }
  });
});

const getLittersStats = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'GET litters-stats.'
*/
  const litters = await Litter.find();
  res.status(200).json({
    status: 'success',
    results: litters.length,
    data: { litters }
  });
});

const addLitter = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'CREATE a new litter.'
*/
  if (!req.body.litterAKC) {
    res.status(400).send({ message: 'Content cannot be empty!' });
    return;
  }
  const litter = new Litter({
    litterAKC: req.body.litterAKC,
    sireName: req.body.sireName,
    damName: req.body.damName,
    litterConceived: req.body.litterConceived,
    litterDelivered: req.body.litterDelivered,
    femalesBorn: req.body.femalesBorn,
    femalesSurvived: req.body.femalesSurvived,
    malesBorn: req.body.malesBorn,
    malesSurvived: req.body.malesSurvived,
    puppiesYellow: req.body.puppiesYellow,
    puppiesChocolate: req.body.puppiesChocolate,
    puppiesBlack: req.body.puppiesBlack
  });
  const newLitter = await Litter.create(litter);
  res.status(201).json({
    status: 'success',
    data: { litter: newLitter }
  });
});

const updateLitter = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'UPDATE a specific litter by id.'
*/
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid litter id to update desired litter.');
  }
  const litterId = new ObjectId(req.params.id);
  const changeLitter = {
    litterAKC: req.body.litterAKC,
    sireName: req.body.sireName,
    damName: req.body.damName,
    litterConceived: req.body.litterConceived,
    litterDelivered: req.body.litterDelivered,
    femalesBorn: req.body.femalesBorn,
    femalesSurvived: req.body.femalesSurvived,
    malesBorn: req.body.malesBorn,
    malesSurvived: req.body.malesSurvived,
    puppiesYellow: req.body.puppiesYellow,
    puppiesChocolate: req.body.puppiesChocolate,
    puppiesBlack: req.body.puppiesBlack
  };
  const litter = await Litter.findByIdAndUpdate(litterId, changeLitter, {
    new: true,
    runValidators: true
  });
  res.status(200).json({
    status: 'success',
    data: { litter }
  });
});

const deleteLitter = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'DELETE a specific litter by id.'
*/
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid litter id to delete desired litter.');
  }
  const litterId = new ObjectId(req.params.id);
  await Litter.findByIdAndDelete(litterId);
  res.status(204).json({
    status: 'success',
    data: null
  });
});

module.exports = {
  getAllLitters,
  getLitterById,
  getLittersStats,
  addLitter,
  updateLitter,
  deleteLitter
};
