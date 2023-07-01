const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const authController = require('../controllers/authController');
const { protect, restrictTo } = require('../controllers/authController');
// const { ensureAuth } = require('../controllers/auth');

// router.get('/', ensureAuth, usersController.getAllUsers);
router.get('/', usersController.getAllUsers);

router.get('/:id', protect, restrictTo('admin'), usersController.getUserById);

router.put('/:id', protect, restrictTo('admin'), usersController.updateUser);

router.delete('/:id', protect, restrictTo('admin'), usersController.deleteUser);

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

module.exports = router;
