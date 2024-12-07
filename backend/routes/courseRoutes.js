const express = require('express');
const { getCourses, createCourse, getCourseById } = require('../controllers/courseController');
const router = express.Router();

router.route('/').get(getCourses).post(createCourse);
router.route('/:id').get(getCourseById); // New route
// Route to get course details by courseId and email
// router.route('/details').get(getCourseDetails);

module.exports = router;



