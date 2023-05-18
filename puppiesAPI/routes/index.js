/*eslint-disable*/
/***CSE341 Web Services Project 2 Puppies API ***/
const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/puppies', require('./puppies'));
router.use('/litters', require('./litters'));
router.use(
  '/',
  (docData = (req, res) => {
    let docData = {
      documentationURL: 'https://l04.onrender.com//api-docs',
    };
    res.send(docData);
  })
);
module.exports = router;