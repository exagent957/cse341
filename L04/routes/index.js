/*eslint-disable*/
/***CSE341 Web Services L04 Personal - router ***/

const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/contacts', require('./contacts'))
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