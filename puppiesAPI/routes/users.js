const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const authController = require('../controllers/authController');

router.get('/', usersController.getAllUsers);

router.get('/:id', usersController.getUserById);

router.post('/', usersController.addUser);

router.put('/:id', usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

router.post('/signup', authController.signup);

module.exports = router;
