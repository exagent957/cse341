/***CSE341 Web Services Project 2 Puppies API ***/
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { ensureAuth, ensureGuest } = require('../controllers/auth');

router.use(bodyParser.json());
// @desc Login/Landing page
// @route GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login'
  });
});

router.get('/api-docs', ensureAuth);

router.use('/', require('./swagger'));
router.use('/puppies', require('./puppies'));
router.use('/litters', require('./litters'));
router.use('/users', require('./users'));
router.use('/auth', require('./auth'));
router.use(
  '/',
  (docData = (req, res) => {
    let docData = {
      documentationURL: 'https://puppies-api-ek0y.onrender.com/api-docs'
    };
    res.send(docData);
  })
);

module.exports = router;
