/**** CSE341 Web Services - Project 2 - Puppies API ****//*eslint-disable*/ 
const { application } = require('express');
const mongodb = require('../db/connect');
const { json } = require('body-parser');
const ObjectId = require('mongodb').ObjectId;

const getAllPuppies = async (req, res) => {
  /*
  #swagger.description = 'READ all puppies.'
*/
  const result = await mongodb
    .getDb()
    .db()
    .collection('puppies')
    .find();
  result.toArray().then((lists) => {
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

const getPuppyById = async (req, res) => {
  /*
  #swagger.description = 'READ a specific puppy by id.'
*/
  const puppyId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('puppies')
    .find({ _id: puppyId });
  result.toArray().then((data) => {
    //   if (!data){
       //   res.status(404).send({ message: `Contact with id ${userId} not found`});
     // return;
    //   } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(data[0]);
      })
  .catch((err) => {
        res.status(500).send({
          message:
          err.message || `Error locating contact with id ${puppyId}`
        });
      });
};

const addPuppy = async(req, res) => {
    /*
  #swagger.description = 'CREATE a new puppy.'
*/
  if (!req.body.puppyTempName) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }
  const newPuppy = {
    puppyTempName: req.body.puppyTempName,
    puppyDOB: req.body.puppyDOB,
    puppySex: req.body.puppySex,
    puppyColor: req.body.puppyColor,
    puppyCollar: req.body.puppyCollar,
    puppyAKC: req.body.puppyAKC,
    puppyNewName: req.body.puppyNewName
  };
  console.log(newPuppy);
  const response = await mongodb
  .getDb()
  .db()
  .collection('puppies')
  .insertOne(newPuppy);
  if (response.acknowledged){
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || "An error occurred creating the puppy.");
  }
}

const updatePuppy = async (req, res) => {
    /*
  #swagger.description = 'UPDATE a specific puppy by id.'
*/
  const puppyId = new ObjectId(req.params.id);
  const changePuppy = {
    puppyTempName: req.body.puppyTempName,
    puppyDOB: req.body.puppyDOB,
    puppySex: req.body.puppySex,
    puppyColor: req.body.puppyColor,
    puppyCollar: req.body.puppyCollar,
    puppyAKC: req.body.puppyAKC,
    puppyNewName: req.body.puppyNewName
  };
  console.log(changePuppy);
  const response = await mongodb
    .getDb()
    .db()
    .collection('puppies')
    .updateOne({ _id: puppyId}, {$set: changePuppy});
  if (response.modifiedCount > 0){
    console.log("Puppy updated.");
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "An error occurred updating the contact.")
  }
};

const deletePuppy = async (req, res, next) => {
    /*
  #swagger.description = 'DELETE a specific puppy by id.'
*/
  const puppyId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection('puppies')
    .deleteOne({ _id: puppyId });
  if (response.deletedCount > 0){
    console.log("Puppy deleted.");
    res.status(200).send();
  } else {
    res.status(500).json(response.error || "An error occurred deleting the puppy.")
  }
};

module.exports = { 
  getAllPuppies, 
  getPuppyById, 
  addPuppy,
  updatePuppy,
  deletePuppy, 
};