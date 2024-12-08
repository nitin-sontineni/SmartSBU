const mongoose = require('mongoose');
const Course = require('../models/Course');
const User = require('../models/User');

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCourse = async (req, res) => {
  try {
    const { user_mail, course_name, course_description, materials } = req.body;

    if (!user_mail || !course_name) {
      return res.status(400).json({ message: 'user_mail and course_name are required' });
    }

    const course = new Course({ user_mail, course_name, course_description, materials });
    const createdCourse = await course.save();
    res.status(201).json(createdCourse); // Send the created course back to the frontend
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCourseDetails = async (req, res) => {
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

module.exports = { getCourses, createCourse, getCourseById, getCourseDetails };