import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
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

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, email } = location.state || {}; // Get logged-in user data
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ number: "", name: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({ number: false, name: false });

  // Fetch courses on component load
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/courses", {
          params: { email }, // Pass email as query parameter
        });
        setCourses(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching courses:", error.message);
      }
    };

    if (email) {
      fetchCourses();
    }
  }, [email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
    setErrors({ ...errors, [name]: false }); // Clear error on change
  };

  const handleCreateCourse = async () => {
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
      try {
        const response = await axios.post("http://localhost:5001/api/courses", {
          user_mail: email,
          course_name: newCourse.number,
          course_description: newCourse.name,
          materials: [],
        });

        // Add the newly created course to the list of courses
        setCourses([...courses, response.data]);

        setSuccessMessage(`Course '${newCourse.number}' created successfully!`);
        setNewCourse({ number: "", name: "" });
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        console.error("Error creating course:", error.message);
      }
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleViewCourse = (courseId) => {
    navigate(`/coursepage/${courseId}`, { state: { email, courseId } });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #e3f2fd, #f9fbe7)",
      }}
    >
      <Navbar onLogout={handleLogout} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          SmartSBU Dashboard
        </Typography>
        <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
          Hi {name}, Welcome to your course dashboard. Here you can view your courses or
          create new ones.
        </Typography>

        {/* Create New Course Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" gutterBottom>
            Create a New Course
          </Typography>
          <Paper elevation={4} sx={{ padding: 3, borderRadius: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
                <TextField
                  name="number"
                  label="Course Number"
                  fullWidth
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
                  fullWidth
                  value={newCourse.name}
                  onChange={handleInputChange}
                  error={errors.name}
                  helperText={errors.name && "Course Name is required"}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button variant="contained" onClick={handleCreateCourse}>
                  Create
                </Button>
              </Grid>
            </Grid>
          </Paper>
          {successMessage && (
            <Snackbar open={true} autoHideDuration={3000}>
              <Alert severity="success">{successMessage}</Alert>
            </Snackbar>
          )}
        </Box>

        {/* Your Courses Section */}
        <Typography variant="h5" gutterBottom sx={{ marginBottom: 2 }}>
          Your Courses
        </Typography>
        <Grid container spacing={3}>
        {Array.isArray(courses) && courses.length > 0 ? (
          courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course._id}>
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
                    {course.course_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.course_description || "No description available"}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleViewCourse(course._id)}
                  >
                    View Course
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) :
        (
          <Typography
            variant="subtitle1"
              sx={{
                marginTop: 2, // Add spacing above the text
                fontStyle: "italic", // Optional: Add some styling
                textAlign: "center",
              }}
            >
            No courses available
          </Typography>
        )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
