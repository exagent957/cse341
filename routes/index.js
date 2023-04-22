const routes = require('express').Router();

const myController = require('../controllers');

routes.get('/', myController.myFirst);

module.exports = routes;