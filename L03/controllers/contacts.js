/**** CSE341 Web Services - L03 personal - Controller ****//*eslint-disable*/ 
/*eslint-disable*/
const { application } = require('express');
const mongodb = require('../db/connect');
const { json } = require('body-parser');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const addContact = async(req, res) => {
  const newContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday : req.body.birthday
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
  const userId = new ObjectId(req.params.id);
  const changeContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday : req.body.birthday
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