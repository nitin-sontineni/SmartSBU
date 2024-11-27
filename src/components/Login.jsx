import React, { useState } from "react";
import { auth } from "./firebaseConfig";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";


// Create a Material-UI theme
const theme = createTheme();

function Login() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      navigate("/dashboard")
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
      <div className="App">
        <h1>Firebase Google Auth in React</h1>
        {user ? (
          <div>
            <p>Welcome, {user.displayName}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <button onClick={handleLogin}>Login with Google</button>
        )}
      </div>
    </ThemeProvider>
  );
}

export default Login;