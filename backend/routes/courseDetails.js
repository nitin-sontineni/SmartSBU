const express = require('express');
const { getCourseDetails } = require('../controllers/detailsController');
const router = express.Router();

router.route('/').get(getCourseDetails);
// Route to get course details by courseId and email
// router.route('/details').get(getCourseDetails);

module.exports = router;