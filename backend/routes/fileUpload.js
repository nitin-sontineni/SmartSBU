const express = require("express");
const { uploadFiles } = require("../controllers/uploadController.js");
const router = express.Router();

// Route to handle uploading document names
router.post("/", uploadFiles);

// Note: Uncomment the following line if the course details route is required
// router.route('/details').get(getCourseDetails);

module.exports = router;
