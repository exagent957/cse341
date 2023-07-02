const { application } = require('express');
const mongoose = require('../db/connect');
const { json } = require('body-parser');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const ObjectId = require('mongodb').ObjectId;
const User = require('./../models/userModel');
const JWTUser = require('./../models/userModel');

// object filtering to loop through object keeping only allowedFields
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const getAllUsers = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'READ all users.'
*/
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users }
  });
});

const updateMe = catchAsync(async (req, res, next) => {
  //get error if users tries to update password as this is done elsewhere
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('Use /updateMyPassword for password updates', 400));
  }
  //filter out everything but name and email
  const filteredBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await JWTUser.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

const getUserById = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'READ a specific user by id.'
*/
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid user id to find desired user.');
  }
  const userId = new ObjectId(req.params.id);
  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: { user }
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'UPDATE a specific user by id.'
*/
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid user id to update desired user.');
  }
  const userId = new ObjectId(req.params.id);
  const changeUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  };
  const user = await User.findByIdAndUpdate(userId, changeUser, {
    new: true,
    runValidators: true
  });
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: { user }
  });
});

const deleteMe = catchAsync(async (req, res, next) => {
  await JWTUser.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'DELETE a specific user by id.'
*/
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid user id to delete desired user.');
  }
  const userId = new ObjectId(req.params.id);
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe
};
