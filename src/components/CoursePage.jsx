import React, { useState } from "react";
import { Box, Button, Typography, List, ListItem, ListItemText, IconButton, TextField, Paper } from "@mui/material";
import { useDropzone } from "react-dropzone";
import CloseIcon from "@mui/icons-material/Close";

const CoursePage = () => {
  const [files, setFiles] = useState([]);
  const [question, setQuestion] = useState("");

  const onDrop = (acceptedFiles) => {
    // Add new files to the current list
    setFiles((prevFiles) => [
      ...prevFiles,
      ...acceptedFiles.map((file) => ({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2), // File size in MB
      })),
    ]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxSize: 200 * 1024 * 1024 }); // 200MB limit

  const handleRemoveFile = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const handleSubmit = () => {
    alert("Files submitted successfully!");
    // Add file upload or question submission logic here
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", padding: 2 }}>
      {/* Left Panel: Upload Files */}
      <Box sx={{ width: "30%", marginRight: 2 }}>
        <Typography variant="h6" gutterBottom>
          AMS 691 Course Material:
        </Typography>
        <Typography variant="body2" gutterBottom>
          Upload your Files
        </Typography>
        <Paper
          {...getRootProps()}
          sx={{
            padding: 2,
            border: "2px dashed #ccc",
            borderRadius: 2,
            textAlign: "center",
            cursor: "pointer",
            marginBottom: 2,
          }}
        >
          <input {...getInputProps()} />
          <Typography>Drag and drop files here</Typography>
          <Typography variant="body2">Limit: 200MB per file</Typography>
          <Button variant="outlined" sx={{ marginTop: 1 }}>
            Browse Files
          </Button>
        </Paper>

        {/* Display Uploaded Files */}
        <List>
          {files.map((file) => (
            <ListItem
              key={file.name}
              secondaryAction={
                <IconButton edge="end" onClick={() => handleRemoveFile(file.name)}>
                  <CloseIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={file.name}
                secondary={`${file.size} MB`}
              />
            </ListItem>
          ))}
        </List>

        {/* Submit Button */}
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ marginTop: 2, display: files.length > 0 ? "block" : "none" }}
        >
          Submit
        </Button>
      </Box>

      {/* Right Panel: Ask Questions */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Typography variant="h4" gutterBottom>
          SmartSBU
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Ask a question from the uploaded files"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          sx={{ maxWidth: "600px", marginBottom: 2 }}
        />
        <Button variant="contained" onClick={() => alert(`Question submitted: ${question}`)}>
          Submit Question
        </Button>
      </Box>
    </Box>
  );
};

export default CoursePage;