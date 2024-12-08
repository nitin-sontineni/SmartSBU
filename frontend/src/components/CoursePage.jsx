import React, { useState, useEffect } from "react";
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
  TextField,
  Paper,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Navbar = ({ onLogout }) => (
  <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
        SmartSBU
      </Typography>
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

const CoursePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, courseId } = location.state || {};

  // States
  const [userDetails, setUserDetails] = useState({
    user_name: "",
    course_name: "",
    course_description: "",
  });
  const [documents, setDocuments] = useState([]);
  const [files, setFiles] = useState([]);
  const [question, setQuestion] = useState("");
  const [responses, setResponses] = useState([]); // Array to store multiple Q&A
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  // Fetch course details and materials
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/course_details`, {
          params: { courseId, email },
        });
        const { user_name, course_name, course_description, materials } = response.data;
        setUserDetails({ user_name, course_name, course_description });
        setDocuments(materials);
      } catch (error) {
        console.error("Error fetching course details:", error.message);
      }
    };

    fetchCourseDetails();
  }, [courseId, email]);

  // Dropzone logic
  const onDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2), // File size in MB
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 200 * 1024 * 1024, // 200MB limit
  });

  const handleSubmitFiles = async () => {
    if (files.length === 0) {
      alert("No files to upload!");
      return;
    }

    const documentNames = files.map((file) => file.name);

    try {
      const response = await axios.post("http://localhost:5001/api/upload_files", {
        courseId,
        email,
        documentNames,
      });
      setDocuments((prevDocuments) => [...prevDocuments, ...response.data.materials]);
      setFiles([]); // Clear the upload section
      alert("Files uploaded successfully!");
    } catch (error) {
      console.error("Error uploading files:", error.message);
      alert("Error uploading files. Please try again.");
    }
  };

  const handleSubmitQuestion = async () => {
    if (!question.trim()) {
      alert("Please enter a question before submitting.");
      return;
    }

    setIsButtonLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/get_answer",
        { question, courseId },
        { headers: { "Content-Type": "application/json" } }
      );

      // Add new response to the array
      setResponses((prevResponses) => [
        ...prevResponses,
        { question, answer: response.data.answer },
      ]);
    } catch (error) {
      console.error("Error fetching the answer:", error);
      setResponses((prevResponses) => [
        ...prevResponses,
        { question, answer: "An error occurred while fetching the answer." },
      ]);
    } finally {
      setIsButtonLoading(false);
    }

    setQuestion(""); // Clear input
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(to bottom, #e3f2fd, #f9fbe7)" }}>
      <Navbar onLogout={handleLogout} />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          {userDetails.course_name}: {userDetails.course_description}
        </Typography>

        <Grid container spacing={4}>
          {/* Left Section: Materials and Upload */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>
                Course Materials
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Upload Files
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
                }}
              >
                <input {...getInputProps()} />
                <Typography>Drag and drop files here</Typography>
                <Button variant="outlined" sx={{ marginTop: 1 }}>
                  Browse Files
                </Button>
              </Paper>

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

              {documents.length > 0 ? (
                <List>
                  {documents.map((document, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={document} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography>No Documents Uploaded.</Typography>
              )}
            </Paper>
          </Grid>

          {/* Right Section: Question Asking */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ padding: 4, borderRadius: 3 }}>
              {responses.map((response, index) => (
                <Card
                  key={index}
                  elevation={4}
                  sx={{
                    padding: 2,
                    marginBottom: 3,
                    borderRadius: 2,
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
                    border: "1px solid #e0e0e0", // Light border
                  }}
                >
                  <CardContent>
                    {/* Question Section */}
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "#3f51b5", marginBottom: 1 }}
                    >
                      Question:
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ marginBottom: 2, lineHeight: 1.5 }}
                    >
                      {response.question}
                    </Typography>

                    {/* Answer Section */}
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "#4caf50", marginBottom: 1 }}
                    >
                      Answer:
                    </Typography>
                    <Box
                      component="pre"
                      sx={{
                        whiteSpace: "pre-wrap", // Enables text wrapping
                        wordWrap: "break-word", // Breaks long words
                        overflowX: "auto", // Horizontal scroll if necessary
                        backgroundColor: "#f9fbe7", // Light greenish background
                        padding: 2,
                        borderRadius: 2,
                        fontFamily: "Roboto, sans-serif", // Use clean font
                        fontSize: "0.95rem", // Slightly smaller text for answers
                        color: "#424242", // Neutral dark gray color
                        lineHeight: 1.6, // Improve readability
                      }}
                    >
                      {response.answer}
                    </Box>
                  </CardContent>
                </Card>
              ))}


              <Typography variant="body1" gutterBottom>
                Ask questions here:
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Ask your question here"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                sx={{ maxWidth: "600px", marginBottom: 2 }}
              />

              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitQuestion}
                sx={{ marginBottom: 2 }}
                disabled={isButtonLoading}
              >
                {isButtonLoading ? <CircularProgress size={24} /> : "Submit Question"}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CoursePage;
