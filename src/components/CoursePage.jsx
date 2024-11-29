import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Paper,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onLogout }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        {/* Title on the Left */}
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          SmartSBU
        </Typography>

        {/* Logout Button on the Right */}
        <Button
          variant="contained"
          onClick={onLogout}
          sx={{
            backgroundColor: "#ff4081",
            "&:hover": { backgroundColor: "#e91e63" },
            color: "#fff",
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

const CoursePage = () => {
  const [files, setFiles] = useState([]);
  const [question, setQuestion] = useState("");

  const navigate = useNavigate(); // Hook for navigation

  const onDrop = (acceptedFiles) => {
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

  const handleSubmitFiles = () => {
    alert("Files submitted successfully!");
    // Add file upload logic here
  };

  const handleSubmitQuestion = () => {
    console.log(question)
    // Add question submission logic here
  };

  const handleLogout = () => {
    navigate("/"); // Redirect to the home page
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(to bottom, #e3f2fd, #f9fbe7)" }}>
      {/* Navbar */}
      <Navbar onLogout={handleLogout} />

      {/* Course Page Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Left Panel: Upload Files */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                borderRadius: 3,
                backgroundColor: "#ffffff",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="h6" gutterBottom>
                AMS 691 Course Material
              </Typography>
              <Typography variant="body2" gutterBottom>
                Upload your files below:
              </Typography>
              <Paper
                {...getRootProps()}
                sx={{
                  padding: 3,
                  border: "2px dashed #ccc",
                  borderRadius: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  marginBottom: 2,
                  backgroundColor: "#f7f9fc",
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
              {files.length > 0 && (
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSubmitFiles}
                  sx={{ marginTop: 2 }}
                >
                  Submit Files
                </Button>
              )}
            </Paper>
          </Grid>

          {/* Right Panel: Ask Questions */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={3}
              sx={{
                padding: 4,
                borderRadius: 3,
                textAlign: "center",
                backgroundColor: "#ffffff",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="h4" gutterBottom>
                SmartSBU
              </Typography>
              <Typography variant="body1" gutterBottom>
                Ask questions based on the uploaded course materials:
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Ask a question from the uploaded files"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                sx={{ maxWidth: "600px", marginBottom: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitQuestion}
              >
                Submit Question
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CoursePage;