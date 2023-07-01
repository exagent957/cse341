const express = require('express');
const router = express.Router();

const puppiesController = require('../controllers/puppies');
const { protect, restrictTo } = require('../controllers/authController');
// const { ensureAuth } = require('../controllers/auth');//this one was used with OAuth

router.get('/', puppiesController.getAllPuppies);

router.get('/puppies-stats', puppiesController.getPuppiesStats);

router.get('/:id', puppiesController.getPuppyById);

router.post('/', protect, restrictTo('admin'), puppiesController.addPuppy);

router.put('/:id', protect, restrictTo('admin'), puppiesController.updatePuppy);

router.delete('/:id', protect, restrictTo('admin'), puppiesController.deletePuppy);

module.exports = router;
