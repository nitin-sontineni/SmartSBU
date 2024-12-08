const express = require('express');
const { getAnswer } = require('../controllers/answerController');

const router = express.Router();

// Use POST method for receiving data in the request body
router.route('/').post(getAnswer);

module.exports = router;