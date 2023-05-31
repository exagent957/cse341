const mongoose = require('mongoose');
const validator = require('validator');
mongoose.Schema.Types.String.set('trim', true);
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email address'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    require: [true, 'Please provide a password'],
    minLength: [8, 'Password should be at least 8 characters.']
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password']
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
