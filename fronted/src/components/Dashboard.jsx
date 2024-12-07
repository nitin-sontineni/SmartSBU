import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Snackbar,
  Alert,
  TextField,
  Paper,
} from "@mui/material";

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

const Dashboard = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([
    { id: 1, number: "AMS 691", name: "Topics in Applied Mathematics" },
    { id: 2, number: "CSE 564", name: "Visualization" },
  ]);
  const [newCourse, setNewCourse] = useState({ number: "", name: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({ number: false, name: false });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
    setErrors({ ...errors, [name]: false }); // Clear error on change
  };

  const handleCreateCourse = () => {
    let hasError = false;
    const newErrors = { number: false, name: false };

    if (!newCourse.number.trim()) {
      newErrors.number = true;
      hasError = true;
    }
    if (!newCourse.name.trim()) {
      newErrors.name = true;
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      setCourses([
        ...courses,
        { id: courses.length + 1, number: newCourse.number, name: newCourse.name },
      ]);
      setSuccessMessage(`Course '${newCourse.number}' created successfully!`);
      setNewCourse({ number: "", name: "" });
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleViewCourse = (courseId) => {
    navigate(`/coursepage/cse512`);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(to bottom, #e3f2fd, #f9fbe7)" }}>
      {/* Navbar */}
      <Navbar onLogout={handleLogout} />

      {/* Dashboard Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          SmartSBU Dashboard
        </Typography>
        <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
          Welcome to your course dashboard. Here you can view your courses or create new ones.
        </Typography>

        {/* Create New Course Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" gutterBottom>
            Create a New Course
          </Typography>
          <Paper
            elevation={4}
            sx={{
              padding: 3,
              borderRadius: 3,
              backgroundColor: "#ffffff",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              maxWidth: "600px",
              margin: "auto",
              textAlign: "left",
            }}
          >
            <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
              <Grid item xs={12} sm={5}>
                <TextField
                  name="number"
                  label="Course Number"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={newCourse.number}
                  onChange={handleInputChange}
                  error={errors.number}
                  helperText={errors.number && "Course Number is required"}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  name="name"
                  label="Course Name"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={newCourse.name}
                  onChange={handleInputChange}
                  error={errors.name}
                  helperText={errors.name && "Course Name is required"}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="medium"
                  onClick={handleCreateCourse}
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </Paper>
          {successMessage && (
            <Snackbar
              open={true}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              autoHideDuration={3000}
            >
              <Alert severity="success" sx={{ width: "100%" }}>
                {successMessage}
              </Alert>
            </Snackbar>
          )}
        </Box>

        {/* Your Courses Section */}
        <Typography variant="h5" gutterBottom>
          Your Courses
        </Typography>
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card
                sx={{
                  textAlign: "center",
                  height: "100%",
                  borderRadius: 3,
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#ffffff",
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {course.number}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.name}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleViewCourse(course.id)}
                  >
                    View Course
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
