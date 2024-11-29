import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Navbar = ({ onLogout }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2", mb: 4 }}>
      <Toolbar>
        {/* Title on the Left */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold" }}
        >
          SmartSBU
        </Typography>

        {/* Logout Button on the Right */}
        <Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={onLogout}
            sx={{ color: "#fff" }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;