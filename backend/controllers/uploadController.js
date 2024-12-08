const mongoose = require("mongoose");
const Course = require("../models/Course");

// Simplified upload logic to handle filenames only
const uploadFiles = async (req, res) => {
  try {
    const { courseId, email, documentNames } = req.body;

    // Validate request data
    if (!courseId || !email || !documentNames || !Array.isArray(documentNames)) {
      return res.status(400).json({
        message: "courseId, email, and documentNames (array) are required",
      });
    }

    // Find the course associated with the given user
    const course = await Course.findOne({ _id: courseId, user_mail: email });
    if (!course) {
      return res.status(404).json({ message: "Course not found for the given user" });
    }

    // Add document names to the materials array
    course.materials = [...(course.materials || []), ...documentNames];
    await course.save();

    res.status(200).json({
      message: "Document names added successfully!",
      materials: course.materials,
    });
  } catch (error) {
    console.error("Error in uploadFiles:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { uploadFiles };