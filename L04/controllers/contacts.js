/**** CSE341 Web Services - L03 personal - Controller ****//*eslint-disable*/ 
/*eslint-disable*/
const { application } = require('express');
const mongodb = require('../db/connect');
const { json } = require('body-parser');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  /*
  #swagger.description = 'READ all contacts.'
*/
  const result = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .find();
  result.toArray().then((lists) => {
    if (err) {
      res.status(400).json({ message: err});
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  })
  .catch((err) => {
    res.status(500).send({
      message:
        err.message || 'Unexpected server error occurred while retrieving this request'
    });
  });
};

const getSingle = async (req, res) => {
  /*
  #swagger.description = 'READ a specific contact by id.'
*/
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid contact id to find the contact desired.')
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .find({ _id: userId });
//  result.toArray().then((data) => {
    result.toArray((err, data) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(data[0]);
      })
    .catch((err) => {
        res.status(500).send({
          message:
          err.message || `Error locating contact with id ${userId}`
        });
    });
};

const addContact = async(req, res) => {
    /*
  #swagger.description = 'CREATE a new contact.'
*/
  if (!req.body.firstName) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }
  const newContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
    shoeSize: req.body.shoeSize,
    language: req.body.language,
    member: req.body.member
  };
  console.log(newContact);
  const response = await mongodb
  .getDb()
  .db()
  .collection('contacts')
  .insertOne(newContact);
  if (response.acknowledged){
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || "An error occurred creating the contact.");
  }
}

const updateContact = async (req, res) => {
    /*
  #swagger.description = 'UPDATE a specific contact by id.'
*/
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid contact id to update the desired contact.');
  }
  const userId = new ObjectId(req.params.id);
  const changeContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday : req.body.birthday,
    shoeSize: req.body.shoeSize,
    language: req.body.language,
    member: req.body.member
  };
  console.log(changeContact);
  const response = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .updateOne({ _id: userId}, {$set: changeContact});
  if (response.modifiedCount > 0){
    console.log("Contact updated.");
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "An error occurred updating the contact.")
  }
};

const deleteContact = async (req, res, next) => {
    /*
  #swagger.description = 'DELETE a specific contact by id.'
*/
if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid contact id to delete desired contact.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .deleteOne({ _id: userId });
  if (response.deletedCount > 0){
    console.log("Contact deleted.");
    res.status(200).send();
  } else {
    res.status(500).json(response.error || "An error occurred deleting the contact.")
  }
};

module.exports = { getAll, getSingle, addContact, updateContact, deleteContact};