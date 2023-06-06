const mongoose = require('mongoose');
mongoose.Schema.Types.String.set('trim', true);
const puppySchema = new mongoose.Schema({
  puppyTempName: {
    type: String,
    required: [true, 'Poor puppy needs a name'],
    unique: true,
    maxLength: [15, 'Name should be less than 16 characters']
  },
  puppyDOB: {
    type: Date,
    required: [true, 'Puppy must have a birth date.']
  },
  puppySex: {
    type: String,
    required: [true, 'Puppy must have a gender. M or F'],
    maxLength: [1, 'Use single character. M or F'],
    enum: { values: ['F', 'M'], message: '{VALUE} is not supported. Enter M or F' }
  },
  puppyColor: {
    type: String,
    required: [true, 'Puppy must be have a color.'],
    enum: { values: ['chocolate', 'yellow', 'black'], message: '{VALUE} is not supported' }
  },
  puppyCollar: {
    type: String,
    required: [true, 'For marketing purposes puppy must have a colored collar.'],
    maxLength: [25, 'Color should be less than 26 characters']
  },
  puppyAKC: {
    type: String,
    required: [true, 'Puppy must have AKC registration number.'],
    maxLength: [10, 'AKC registration must be less than 11 characters']
  },
  puppyNewName: {
    type: String,
    required: false,
    maxLength: [15, 'Puppy new name must be less than 16 characters'],
    default: 'Responsibility of new owner.'
  }
});

const Puppy = mongoose.model('Puppy', puppySchema);

module.exports = Puppy;
