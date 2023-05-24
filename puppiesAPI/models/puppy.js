/*eslint-disable*/
const mongoose = require('mongoose');

const puppySchema = new mongoose.Schema({
  puppyTempName: {
    type: String,
    required: [true, 'Poor puppy needs a name'],
    unique: true,
    maxLength: 15
  },
  puppyDOB: {
    type: Date,
    required: [true, 'Puppy must have a birth date.']
  },
  puppySex: {
    type: String,
    required: [true, 'Puppy must have a gender. M or F'],
    maxLength: 1,
    enum: { values: ['F', 'M'], message: '{VALUE} is not supported. Enter M or F'}
  },
  puppyColor: {
    type: String,
    required: [true, 'Puppy must be have a color.'],
    enum: { values: ['chocolate', 'yellow', 'black'], message:'{VALUE} is not supported' }
  },
  puppyCollar: {
    type: String,
    required: [true, 'For marketing purposes puppy must have a colored collar.']
  },
  puppyAKC: {
    type: String,
    required: [true, 'Puppy must have AKC registration number.']
  },
  puppyNewName: {
    type: String,
    required: false,
    default: 'Responsibility of new owner.'
  }
});

const Puppy = mongoose.model('Puppy', puppySchema);

module.exports = Puppy;

