/*eslint-disable*/
/***CSE341 Web Services Project 2 Puppies API ***/
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use('/', require('./swagger'));
router.use('/puppies', require('./puppies'));
router.use('/litters', require('./litters'));
router.use(
  '/',
  (docData = (req, res) => {
    let docData = {
      documentationURL: 'https://puppies-api-ek0y.onrender.com/api-docs',
    };
    res.send(docData);
  })
);

module.exports = router;