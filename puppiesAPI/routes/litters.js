/**** CSE341 Project 2 Puppies API****/
const express = require('express');
const router = express.Router();

const littersController = require('../controllers/litters');
const { ensureAuth } = require('../controllers/auth');

router.get('/', littersController.getAllLitters);

router.get('/litters-stats', littersController.getLittersStats);

router.get('/:id', littersController.getLitterById);

router.post('/', ensureAuth, littersController.addLitter);

router.put('/:id', ensureAuth, littersController.updateLitter);

router.delete('/:id', ensureAuth, littersController.deleteLitter);

module.exports = router;
