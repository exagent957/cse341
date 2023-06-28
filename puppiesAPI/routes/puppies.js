const express = require('express');
const router = express.Router();

const puppiesController = require('../controllers/puppies');
const { ensureAuth } = require('../controllers/auth');

router.get('/', puppiesController.getAllPuppies);

router.get('/puppies-stats', puppiesController.getPuppiesStats);

router.get('/:id', puppiesController.getPuppyById);

router.post('/', puppiesController.addPuppy);

router.put('/:id', ensureAuth, puppiesController.updatePuppy);

router.delete('/:id', ensureAuth, puppiesController.deletePuppy);

module.exports = router;
