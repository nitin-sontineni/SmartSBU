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
// import * as pdfjsLib from "pdfjs-dist";
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
  // const [savedFiles, setSavedFiles] = useState([]);
  const [question, setQuestion] = useState("");
  const [primaryResponse, setPrimaryResponse] = useState(null);
  const [followUpResponse, setFollowUpResponse] = useState(null);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  // const [fileContent, setFileContent] = useState("");
  // const pdfCanvasRef = useRef(null);

  // Fetch course details and materials
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/course_details`, {
          params: { courseId, email },
        });
        const { user_name, course_name, course_description, materials } = response.data;
        setUserDetails({ user_name, course_name, course_description });
        setDocuments(materials)
      } catch (error) {
        console.error("Error fetching course details:", error.message);
      }
    };

    fetchCourseDetails();
  }, [courseId, email, documents]);

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

    // Create the request payload
    const payload = {
      courseId,
      email,
      documentNames, // Pass the array of filenames
    };

    console.log(payload)


    try {
      // Send the POST request
      const response = await axios.post("http://localhost:5001/api/upload_files", payload, {
        headers: {
          "Content-Type": "application/json", // Explicitly set content type
        },
      });
  

      // Update materials list with the uploaded files
      setDocuments((prevDocuments) => [...prevDocuments, ...response.data.materials]);
      // setSavedFiles((prevFiles) => [...prevFiles, ...response.data.materials]);
      setFiles([]); // Clear the upload section
      alert("Files uploaded successfully!");
    } catch (error) {
      console.error("Error uploading files:", error.message);
      alert("Error uploading files. Please try again.");
    }
  };

  const handleSubmitQuestion = async () => {
    console.log("Question submitted:", question);
    setIsButtonLoading(true);

    setTimeout(async () => {
      try {
        let answerFile;
        let updateResponse;

        // Determine file to fetch
        if (!primaryResponse) {
          answerFile = "/answer1.txt";
          updateResponse = setPrimaryResponse;
        } else {
          answerFile = "/answer2.txt";
          updateResponse = setFollowUpResponse;
        }

        const response = await fetch(answerFile);
        if (!response.ok) {
          throw new Error(`Failed to load ${answerFile}.`);
        }
        const answerContent = await response.text();

        updateResponse({ question, answer: answerContent });
      } catch (error) {
        let updateResponse;
        console.error("Error fetching answer file:", error);
        updateResponse({ question, answer: "Could not load the answer." });
      }

      setIsButtonLoading(false);
    }, 5000);

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
              {primaryResponse && (
                <Card elevation={4} sx={{ padding: 2, marginBottom: 3 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Question:
                    </Typography>
                    <Typography>{primaryResponse.question}</Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
                      Answer:
                    </Typography>
                    <pre>{primaryResponse.answer}</pre>
                  </CardContent>
                </Card>
              )}

              {followUpResponse && (
                <Card elevation={4} sx={{ padding: 2, marginBottom: 3 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Question:
                    </Typography>
                    <Typography>{followUpResponse.question}</Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
                      Answer:
                    </Typography>
                    <pre>{followUpResponse.answer}</pre>
                  </CardContent>
                </Card>
              )}

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