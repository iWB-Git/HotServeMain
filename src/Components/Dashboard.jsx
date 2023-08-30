import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  CssBaseline,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Link,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import Navigation from "./Navigation";
import { useNavigate } from "react-router-dom";
import Home from "./Home";
import Reports from "./Reports";
import Help from "./Help";
import Settings from "./Settings";
import { getCurrentUser, getAllData } from "../firebase";

const drawerWidth = "12em";

export default function Dashboard() {
  const user = getCurrentUser();
  const [selectedPage, setSelectedPage] = useState("home");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <HomeIcon />, link: "home" },
    { name: "Reports", icon: <ArticleIcon />, link: "reports" },
    { name: "Settings", icon: <SettingsIcon />, link: "settings" },
    { name: "Help", icon: <HelpIcon />, link: "help" },
  ];
  
  useEffect(() => {
    user ? navigate("/dashboard") : navigate("/", { replace: true });
  }, [user, navigate]);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    let temp = getAllData();
    setData(temp);
  }

  return (
    <>
      <Navigation />
      <div>
        <Box component="main" sx={{ width: "100%" }}>
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              backgroundColor: "#212f92",
              height: "100vh",
            }}
          >
            <Box
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                  boxSizing: "border-box",
                },
                pt: "4em",
              }}
              variant="permanent"
              anchor="left"
            >
              <List>
                {menuItems.map((item) => (
                  <ListItem
                    component={Link}
                    key={item.name}
                    disablePadding
                    sx={{ color: "white" }}
                    onClick={() => setSelectedPage(item.link)}
                  >
                    <ListItemButton
                      sx={{
                        color: "white",
                        ":hover": {
                          backgroundColor: "#ffcc01",
                          color: "black",
                        },
                      }}
                    >
                      <ListItemIcon sx={{ color: "white" }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                bgcolor: "background.default",
                p: 3,
                overflow: "auto",
              }}
            >
              {selectedPage === "reports" ? (
                <Reports data={data} />
              ) : selectedPage === "settings" ? (
                <Settings data={data} />
              ) : selectedPage === "help" ? (
                <Help data={data} />
              ) : (
                <Home data={data} />
              )}
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
}
