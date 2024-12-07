const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  user_mail: { type: String, required: true },
  course_name: { type: String, required: true },
  course_description: { type: String },
  materials: [{ type: String }], // Array of integers
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
