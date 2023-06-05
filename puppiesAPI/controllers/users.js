const { application } = require('express');
const mongoose = require('../db/connect');
const { json } = require('body-parser');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const ObjectId = require('mongodb').ObjectId;
const User = require('./../models/User');

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

// const getUserById = catchAsync(async (req, res, next) => {
//   /*
//   #swagger.description = 'READ a specific user by id.'
// */
//   if (!ObjectId.isValid(req.params.id)) {
//     res.status(400).json('Use a valid user id to find desired user.');
//   }
//   const userId = new ObjectId(req.params.id);
//   const user = await User.findById(userId);
//   res.status(200).json({
//     status: 'success',
//     data: { user }
//   });
// });

// const updateUser = catchAsync(async (req, res, next) => {
//   /*
//   #swagger.description = 'UPDATE a specific user by id.'
// */
//   if (!ObjectId.isValid(req.params.id)) {
//     res.status(400).json('Use a valid user id to update desired user.');
//   }
//   const userId = new ObjectId(req.params.id);
//   const changeUser = {
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//     passwordConfirm: req.body.passwordConfirm
//   };
//   const user = await User.findByIdAndUpdate(userId, changeUser, {
//     new: true,
//     runValidators: true
//   });
//   res.status(200).json({
//     status: 'success',
//     data: { user }
//   });
// });

// const deleteUser = catchAsync(async (req, res, next) => {
//   /*
//   #swagger.description = 'DELETE a specific user by id.'
// */
//   if (!ObjectId.isValid(req.params.id)) {
//     res.status(400).json('Use a valid user id to delete desired user.');
//   }
//   const userId = new ObjectId(req.params.id);
//   await User.findByIdAndDelete(userId);
//   res.status(204).json({
//     status: 'success',
//     data: null
//   });
// });

module.exports = {
  getAllUsers
  // getUserById,
  // updateUser,
  // deleteUser
};
