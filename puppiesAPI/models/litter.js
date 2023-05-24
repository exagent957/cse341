/*eslint-disable*/
const mongoose = require('mongoose');

const litterSchema = new mongoose.Schema({
  litterAKC: {
    type: String,
    required: [true, 'All litters have an AKC #'],
    unique: true,
    maxLength: 10
  },
  sireName: {
    type: String,
    required: [true, 'Each litter has a father.'],
    maxLength: 15
  },
  damName: {
    type: String,
    required: [true, 'Each litter has a mother.'],
    maxLength: 15
  },
  litterConceived: {
    type: Date,
    required: false
  },
  litterDelivered: {
    type: Date,
    required: [true, 'Each litter has a delivery date.']
  },
  femalesBorn: {
    type: Number,
    default: 0,
    required: [true, '# of girls must be 0 or greater.'],
    max: 20
  },
  femalesSurvived: {
  type: Number,
  required: false,
  max: 20
  },
  malesBorn: {
    type: Number,
    default: 0,
    required: [true, '# of boys must be 0 or greater.'],
    max: 20
  },
  malesSurvived: {
  type: Number,
  required: false,
  max: 20
  },
  puppiesChocolate: {
  type: Number,
  required: [true, '# of chocolate puppies required.'],
  max: 20
  },
  puppiesYellow: {
  type: Number,
  required: [true, '# of yellow puppies required.'],
  max: 20
  },
  puppiesBlack: {
  type: Number,
  required: [true, '# of black puppies required.'],
  max: 20
  }
});

const Litter = mongoose.model('Litter', litterSchema);

module.exports = Litter;

