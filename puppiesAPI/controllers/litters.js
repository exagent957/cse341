/**** CSE341 Web Services - Project 2 - Puppies API ****//*eslint-disable*/ 
const { application } = require('express');
const mongodb = require('../db/connect');
const { json } = require('body-parser');
const ObjectId = require('mongodb').ObjectId;

const getAllLitters = async (req, res) => {
  /*
  #swagger.description = 'READ all litters.'
*/
  const result = await mongodb
    .getDb()
    .db()
    .collection('litters')
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

const getLitterById = async (req, res) => {
  /*
  #swagger.description = 'READ a specific litter by id.'
*/
  const litterId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('litters')
    .find({ _id: litterId });
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
          err.message || `Error locating contact with id ${litterId}`
        });
      });
};

const addLitter = async(req, res) => {
    /*
  #swagger.description = 'CREATE a new litter.'
*/
  if (!req.body.litterAKC) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }
  const newLitter = {
    litterAKC: req.body.litterAKC,
    sireName: req.body.sireName,
    damName: req.body.damName,
    litterConceived: req.body.litterConceived,
    litterDelivered: req.body.litterDelivered,
    femalesBorn: req.body.femalesBorn,
    femalesSurvived: req.body.femalesSurvived,
    malesBorn: req.body.malesBorn,
    malesSurvived: req.body.malesSurvived,
    puppiesYellow: req.body.puppiesYellow,
    puppiesChocolate: req.body.puppiesChocolate,
    puppiesBlack: req.body.puppiesBlack
  };
  console.log(newLitter);
  const response = await mongodb
  .getDb()
  .db()
  .collection('litters')
  .insertOne(newLitter);
  if (response.acknowledged){
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || "An error occurred creating the litter.");
  }
}

const updateLitter = async (req, res) => {
    /*
  #swagger.description = 'UPDATE a specific litter by id.'
*/
  const litterId = new ObjectId(req.params.id);
  const changeLitter = {
    litterAKC: req.body.litterAKC,
    sireName: req.body.sireName,
    damName: req.body.damName,
    litterConceived: req.body.litterConceived,
    litterDelivered: req.body.litterDelivered,
    femalesBorn: req.body.femalesBorn,
    femalesSurvived: req.body.femalesSurvived,
    malesBorn: req.body.malesBorn,
    malesSurvived: req.body.malesSurvived,
    puppiesYellow: req.body.puppiesYellow,
    puppiesChocolate: req.body.puppiesChocolate,
    puppiesBlack: req.body.puppiesBlack
  };
  console.log(changeLitter);
  const response = await mongodb
    .getDb()
    .db()
    .collection('litters')
    .updateOne({ _id: litterId}, {$set: changeLitter});
  if (response.modifiedCount > 0){
    console.log("Litter updated.");
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "An error occurred updating the contact.")
  }
};

const deleteLitter = async (req, res, next) => {
    /*
  #swagger.description = 'DELETE a specific litter by id.'
*/
  const litterId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection('litters')
    .deleteOne({ _id: litterId });
  if (response.deletedCount > 0){
    console.log("Litter deleted.");
    res.status(200).send();
  } else {
    res.status(500).json(response.error || "An error occurred deleting the puppy.")
  }
};

module.exports = { 
  getAllLitters, 
  getLitterById,
  addLitter, 
  updateLitter, 
  deleteLitter 
};