import React, { useEffect } from "react";
import { useState } from "react";
import { ThemeProvider, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Box, Container, CssBaseline, Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import Stack from "@mui/material/Stack";
import { autoPlay } from "react-swipeable-views-utils";
import Navigation from "./Navigation";
import { useNavigate } from "react-router-dom";
import { signInMicrosoft, getCurrentUser } from "../firebase";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: "Welcome to HotServe",
    text: "A server temperature-monitoring and overheat notification system",
    imgPath: "/server1.jpg",
  },
  {
    label: "Monitor Server Temperatures",
    text: "Get immediate alerts when your server temperatures are too high",
    imgPath: "/server4.jpg",
  },
  {
    label: "Detailed Dashboard",
    text: "Comprehensive, user-friendly dashboard to monitor your servers and control your notifications",
    imgPath: "/server2.jpg",
  },
  {
    label: "No Code Required",
    text: "Backed by Google Firebase, HotServe is easy to set up and use",
    imgPath: "/server3.jpg",
  },
];

export default function Landing() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  function signIn(e) {
    e.preventDefault();
    currentUser === null || currentUser === undefined
      ? signInMicrosoft()
      : navigate("/dashboard");
    console.log("The link was clicked.");
  }

  useEffect(() => {
    if (currentUser !== null && currentUser !== undefined) {
      navigate("/dashboard", { replace: true });
    }
  }, [currentUser, navigate]);

  return (
    <>
      <Navigation />
      <div id="innerdiv2">
        <Box
          maxWidth={{ xs: "xs", sm: "xs", md: "md", lg: "lg", xl: "lg" }}
          sx={{
            bgcolor: "#212f92",
            borderRadius: 3,
            m: { xs: 1.5, sm: 1.5, md: "auto", lg: "auto", xl: "auto" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            alignSelf: "center",
          }}
        >
          <Stack direction={{ md: "column", lg: "row" }}>
            <Container>
              <Stack
                sx={{
                  p: { xs: 1, sm: 1, md: 3, lg: 5, xl: 5 },
                  my: 3,
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    p: 3,
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: {
                      xs: "2.0rem",
                      sm: "2.0rem",
                      md: "2.5rem",
                      lg: "3.0rem",
                      xl: "3.0rem",
                    },
                  }}
                >
                  {images[activeStep].label}
                </Typography>
                <Typography variant="h6" sx={{ color: "#7dace7" }}>
                  {images[activeStep].text}
                </Typography>
                <Button
                  sx={{
                    bgcolor: "#ffcc01",
                    color: "#000",
                    marginTop: 5,
                    width: "30vh",
                    padding: 2,
                    borderRadius: 3,
                    alignSelf: "center",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                  color="inherit"
                  onClick={signIn}
                >
                  Learn More
                </Button>
              </Stack>
            </Container>
            <Box
              maxWidth="lg"
              sx={{
                py: 1,
                bgcolor: "#212f92",
                borderRadius: 3,
              }}
            >
              <Box
                sx={{
                  display: {
                    xl: "block",
                    lg: "block",
                    md: "block",
                    sm: "none",
                    xs: "none",
                  }
                }}
              >
                <AutoPlaySwipeableViews
                  axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                  index={activeStep}
                  onChangeIndex={handleStepChange}
                  enableMouseEvents
                >
                  {images.map((step, index) => (
                    <div key={step.label}>
                      {Math.abs(activeStep - index) <= 2 ? (
                        <img
                          component="img"
                          style={{
                            height: "60vh",
                            overflow: "hidden",
                            width: "100%",
                            objectFit: "cover",
                          }}
                          src={step.imgPath}
                          alt={step.label}
                        />
                      ) : null}
                    </div>
                  ))}
                </AutoPlaySwipeableViews>
              </Box>
              <MobileStepper
                steps={maxSteps}
                position="static"
                sx={{ bgcolor: "#212f92", color: "#fff" }}
                activeStep={activeStep}
                nextButton={
                  <Button
                    size="small"
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1}
                    sx={{ color: "#fff" }}
                  >
                    Next
                    {theme.direction === "rtl" ? (
                      <KeyboardArrowLeft />
                    ) : (
                      <KeyboardArrowRight />
                    )}
                  </Button>
                }
                backButton={
                  <Button
                    size="small"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    sx={{ color: "#fff" }}
                  >
                    {theme.direction === "rtl" ? (
                      <KeyboardArrowRight />
                    ) : (
                      <KeyboardArrowLeft />
                    )}
                    Back
                  </Button>
                }
              />
            </Box>
          </Stack>
        </Box>
      </div>
    </>
  );
}
