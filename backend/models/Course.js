const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  materials: [String], // Array of file URLs or paths
  queries: [String], // Array of user questions
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
