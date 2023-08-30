import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { getCurrentUser, signInMicrosoft, signOutMicrosoft } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = getCurrentUser();
  const navigate = useNavigate();

  const handleMenu = () => {
    user ? navigate("/dashboard") : navigate("/");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function signUp() {
    signInMicrosoft();
  }

  async function signOut() {
    await signOutMicrosoft();
    window.location.assign("/");
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <div>
              <IconButton
                size="medium"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
                sx={{ mr: 2 }}
              >
                <Avatar
                  sx={{
                    padding: 1,
                    bgcolor: "#7dace7",
                  }}
                  src="/logo192.png"
                />
              </IconButton>
            </div>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              HotServe
            </Typography>
            {user ? (
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  color: "#000",
                  width: "20vh",
                  padding: 1,
                  borderRadius: 3,
                }}
                onClick={signOut}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  color: "#000",
                  width: "20vh",
                  padding: 1,
                  borderRadius: 3,
                }}
                onClick={signUp}
              >
                Get Started
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
