const mongoose = require("mongoose");
const { spawn } = require("child_process");

const getAnswer = async (req, res) => {
    const { question, courseId } = req.body;
    console.log(question, courseId)

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  try {
    // Spawn the Python process
    const pythonProcess = spawn("python3", ["process_question.py", question]);

    let pythonOutput = "";
    pythonProcess.stdout.on("data", (data) => {
      pythonOutput += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Python error: ${data}`);
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        return res.status(500).json({ error: "Failed to process the question." });
      }

      // Send the Python output back as the response
      res.json({ answer: pythonOutput.trim() });
    });
  } catch (error) {
    console.error("Error communicating with Python script:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

module.exports = { getAnswer };