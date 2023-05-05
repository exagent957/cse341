/***CSE341 Web Services L03 Personal - router ***/
const express = require('express');
const router = express.Router();

router.use('/contacts', require('./contacts'))

module.exports = router;