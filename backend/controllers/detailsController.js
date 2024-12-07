const mongoose = require('mongoose');
const Course = require('../models/Course');
const User = require('../models/User');

const getCourseDetails = async (req, res) => {
  console.log('Incoming request query:', req.query);

  try {
    const { courseId, email } = req.query;

    if (!courseId || !email) {
      return res.status(400).json({ message: 'courseId and email are required' });
    }

    // Validate courseId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'Invalid courseId format' });
    }

    const course = await Course.findOne({ _id: courseId, user_mail: email });
    if (!course) {
      return res.status(404).json({ message: 'Course not found for the given user' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(course)

    res.json({
      user_name: user.name,
      course_name: course.course_name,
      course_description: course.course_description,
      materials: course.materials || [],
    });
  } catch (error) {
    console.error('Error in getCourseDetails:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

module.exports = { getCourseDetails };