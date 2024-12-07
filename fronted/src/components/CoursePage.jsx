import React, { useState, useRef } from "react";
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
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";

const Navbar = ({ onLogout }) => {
  return (
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
};

const CoursePage = () => {
  const [files, setFiles] = useState([]);
  const [savedFiles, setSavedFiles] = useState([]);
  const [question, setQuestion] = useState(""); // User's question
  const [primaryResponse, setPrimaryResponse] = useState(null); // For answer1.txt
  const [followUpResponse, setFollowUpResponse] = useState(null); // For answer2.txt
  const [isButtonLoading, setIsButtonLoading] = useState(false); // State for button loading
  const [previewFile, setPreviewFile] = useState(null);
  const [fileContent, setFileContent] = useState("");

  const pdfCanvasRef = useRef(null);
  const navigate = useNavigate();

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

  const handleRemoveFile = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const handleSubmitFiles = () => {
    setSavedFiles((prevFiles) => [...prevFiles, ...files]); // Move files to savedFiles
    setFiles([]); // Clear the upload section
    alert("Files submitted successfully!");
  };

  const handleSubmitQuestion = async () => {
    console.log("Question submitted:", question);

    // Show loading state for the button
    setIsButtonLoading(true);

    setTimeout(async () => {
      try {
        let answerFile;
        let updateResponse;

        // Determine which file to fetch based on the current state
        if (!primaryResponse) {
          // First question, fetch from answer1.txt
          answerFile = "/answer1.txt";
          updateResponse = setPrimaryResponse;
        } else {
          // Subsequent question, fetch from answer2.txt
          answerFile = "/answer2.txt";
          updateResponse = setFollowUpResponse;
        }

        const response = await fetch(answerFile);
        if (!response.ok) {
          throw new Error(`Failed to load ${answerFile}.`);
        }
        const answerContent = await response.text();

        // Update the appropriate response state
        updateResponse({ question, answer: answerContent });
      } catch (error) {
        console.error("Error fetching answer file:", error);

        if (!primaryResponse) {
          setPrimaryResponse({ question, answer: "Could not load the answer." });
        } else {
          setFollowUpResponse({ question, answer: "Could not load the answer." });
        }
      }

      // Reset loading state
      setIsButtonLoading(false);
    }, 5000);

    setQuestion(""); // Clear the input field
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleViewFile = async (file) => {
    setPreviewFile(file);

    if (file.file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => setFileContent(e.target.result);
      reader.readAsText(file.file);
    } else if (file.file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const pdfData = new Uint8Array(e.target.result);
        const pdf = await pdfjsLib.getDocument(pdfData).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1 });

        const canvas = pdfCanvasRef.current;
        const context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        await page.render(renderContext).promise;

        setFileContent("PDF rendered below.");
      };
      reader.readAsArrayBuffer(file.file);
    } else if (file.file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) =>
        setFileContent(<img src={e.target.result} alt={file.name} style={{ width: "100%" }} />);
      reader.readAsDataURL(file.file);
    } else {
      setFileContent("Preview not supported for this file type.");
    }
  };

  const handleClosePreview = () => {
    setPreviewFile(null);
    setFileContent("");
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(to bottom, #e3f2fd, #f9fbe7)" }}>
      <Navbar onLogout={handleLogout} />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
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
                CSE 512: Machine Learning
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
                <Button variant="outlined" sx={{ marginTop: 1 }}>
                  Browse Files
                </Button>
              </Paper>

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
                    <ListItemText primary={file.name} secondary={`${file.size} MB`} />
                  </ListItem>
                ))}
              </List>

              {files.length > 0 && (
                <Button variant="contained" fullWidth onClick={handleSubmitFiles} sx={{ marginTop: 2 }}>
                  Submit Files
                </Button>
              )}

              {savedFiles.length > 0 && (
                <Box sx={{ marginTop: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Saved Files
                  </Typography>
                  <List>
                    {savedFiles.map((file) => (
                      <ListItem
                        key={file.name}
                        secondaryAction={
                          <IconButton edge="end" onClick={() => handleViewFile(file)}>
                            <VisibilityIcon />
                          </IconButton>
                        }
                      >
                        <ListItemText primary={file.name} secondary={`${file.size} MB`} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Paper>
          </Grid>

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
              {primaryResponse && (
                <Card
                  elevation={4}
                  sx={{
                    backgroundColor: "#e3f2fd",
                    padding: 2,
                    marginBottom: 3,
                    borderRadius: 3,
                    textAlign: "left",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                      Question:
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                      {primaryResponse.question}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                      Answer:
                    </Typography>
                    <pre style={{ fontFamily: "inherit", whiteSpace: "pre-wrap" }}>
                      {primaryResponse.answer}
                    </pre>
                  </CardContent>
                </Card>
              )}

              {followUpResponse && (
                <Card
                  elevation={4}
                  sx={{
                    backgroundColor: "#ffecb3",
                    padding: 2,
                    marginBottom: 3,
                    borderRadius: 3,
                    textAlign: "left",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                      Question:
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                      {followUpResponse.question}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                      Answer:
                    </Typography>
                    <pre style={{ fontFamily: "inherit", whiteSpace: "pre-wrap" }}>
                      {followUpResponse.answer}
                    </pre>
                  </CardContent>
                </Card>
              )}

              {/* <Typography variant="h4" gutterBottom>
                SmartSBU
              </Typography> */}
              <Typography variant="body1" gutterBottom>
                Ask questions here:
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
                sx={{ marginBottom: 2 }}
                disabled={isButtonLoading} // Disable the button while loading
              >
                {isButtonLoading ? <CircularProgress size={24} color="inherit" /> : "Submit Question"}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CoursePage;
