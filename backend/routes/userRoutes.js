const express = require('express');
const { createOrUpdateUser } = require('../controllers/userController');

const router = express.Router();

router.post('/create-or-update', createOrUpdateUser);

module.exports = router;