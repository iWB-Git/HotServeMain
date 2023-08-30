import * as React from "react";
import { useState, useEffect } from "react";
import { Button, Slider } from "@mui/material";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import { setThreshold, getCurrentUser, getThreshold, writeUserSettings, getUserSettings } from "../firebase";
import {
  Box,
  Toolbar,
  Typography,
  Container,
  Paper,
  Stack,
  Divider,
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";

export default function Settings() {
  const [threshold, setThreshold] = useState("");
  const [user, setUser] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedFrequency, setSelectedFrequency] = useState(60);
  const frequency = [
    { label: "15 Minutes", value: 15 },
    { label: "30 Minutes", value: 30 },
    { label: "45 Minutes", value: 45 },
    { label: "1 Hour", value: 60 },
    { label: "2 Hours", value: 120 },
    { label: "4 Hours", value: 240 },
  ];

  useEffect(() => {
    getThreshold()
      .then((data) => {
        setThreshold(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const user = getCurrentUser();
    const userSettings = getUserSettings(user.uid);
    if (userSettings) {
      console.log(userSettings);
    } else {
      const temp = getEmail(user.email);
      const myUser = {
        uid: user.uid,
        name: user.displayName,
        email: temp,
      };
      setName(user.displayName);
      setEmail(temp);
      setUser(myUser);
    }
  }, []);

  function getEmail(email){
    const editEmail = email.split("#")[0];
    const finalEmail = editEmail.replace("_", "@");
    return finalEmail;
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedFrequency(value);
  };

  const handleName = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const handleEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  function handleTempChange(v) {
    setThreshold(v);
  }

  function saveSettings(){
    let settings = {
      uid: user.uid,
      name: name,
      email: email,
      threshold: threshold,
      frequency: selectedFrequency,
      lastMessage: ""
    }
    writeUserSettings(settings);
  }

  return (
    <>
      <Toolbar />
      <Container maxWidth="xl">
        <Stack
          direction="row"
          spacing={5}
          sx={{ justifyContent: "space-between" }}
        >
          <Box>
            <Typography noWrap={true} variant="h4">
              Settings
            </Typography>
          </Box>
        </Stack>
        <Divider sx={{ mt: 2, mb: 2 }} />
      </Container>
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Stack direction="column" spacing={5}>
            {user && (
              <TextField
                required
                id="outlined-name"
                label="Name"
                onChange={handleName}
                defaultValue={user.name}
              />
            )}
            {user && (
              <TextField
                required
                id="outlined-email"
                label="Email"
                onChange={handleEmail}
                defaultValue={user.email}
              />
            )}
            <FormControl
              sx={{
                mt: 2,
                minWidth: {
                  xl: "30em",
                  lg: "30em",
                  md: "22em",
                  sm: "15em",
                  xs: "15em",
                },
                float: "right",
              }}
              size="medium"
            >
              <InputLabel id="demo-simple-select-label">
                Select Notification Frequency
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select Notification Frequency"
                defaultValue=""
                onChange={handleChange}
              >
                {frequency.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Stack direction="row" spacing={5}>
              <DeviceThermostatIcon />
              {threshold !== null && (
                <Slider
                  aria-label="Temperature"
                  size="small"
                  max={150}
                  onChangeCommitted={(_, v) => handleTempChange(v)}
                  value={threshold}
                  valueLabelDisplay="on"
                  label="Temperature Threshold"
                />
              )}
            </Stack>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                color: "#000",
                width: "20vh",
                padding: 1,
                borderRadius: 3
              }}
              onClick={saveSettings}
            >
              Save Settings
            </Button>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}
