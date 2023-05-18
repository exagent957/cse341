/*eslint-disable*/
/**** CSE341 Project 2 Puppies API****/
const express = require('express');
const router = express.Router();

const puppiesController = require('../controllers/puppies');

router.get('/', puppiesController.getAllPuppies);

router.get('/:id', puppiesController.getPuppyById);

router.post('/', puppiesController.addPuppy);

router.put('/:id', puppiesController.updatePuppy);

router.delete('/:id', puppiesController.deletePuppy);

module.exports = router;