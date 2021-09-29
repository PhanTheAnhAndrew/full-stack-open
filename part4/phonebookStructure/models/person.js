/* eslint-disable no-undef */
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    minlength: 8,
  },
  number: {
    type: String,
    required: true,
  },
});

personSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
