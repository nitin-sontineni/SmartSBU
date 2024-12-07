import React, { useState } from "react";
import { auth } from "./firebaseConfig";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  Avatar,
  CssBaseline,
  Container,
} from "@mui/material";

// Create a Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#ff4081",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

function Login() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user.auth.currentUser.email);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            mt: 8,
            p: 4,
            borderRadius: 2,
            textAlign: "center",
            backgroundColor: "#f7f9fc",
          }}
        >
          <Avatar
            sx={{
              m: "auto",
              mb: 2,
              bgcolor: theme.palette.primary.main,
              width: 56,
              height: 56,
            }}
          >
            {/* Custom logo from the public folder */}
            <img
              src="/logo.png"
              alt="SmartSBU Logo"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{ mb: 3, fontWeight: "bold" }}
          >
            SmartSBU
          </Typography>
          {user ? (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Welcome, {user.displayName}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
            >
              Login with Google
            </Button>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
