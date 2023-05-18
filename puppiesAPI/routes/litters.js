/*eslint-disable*/
/**** CSE341 Project 2 Puppies API****/
const express = require('express');
const router = express.Router();

const littersController = require('../controllers/litters');

router.get('/', littersController.getAllLitters);

router.get('/:id', littersController.getLitterById);

router.post('/', littersController.addLitter);

router.put('/:id', littersController.updateLitter);

router.delete('/:id', littersController.deleteLitter);

module.exports = router;