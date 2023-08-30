import * as React from "react";
import { useMemo } from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Toolbar,
  Typography,
  Container,
  Paper,
  Stack,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Divider,
  CircularProgress,
} from "@mui/material";
import { formatDate, getChartData } from "./Helpers";
import { getCurrentUser, getCurrentTemp, getAllData } from "../firebase";
import Chart from "./Chart";

export default function Home(props) {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  const [server, setServer] = useState("");
  const [chartData, setChartData] = useState([]);
  const [temperature, setTemperature] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      let firstName = currentUser.displayName.split(" ")[0];
      setUsername(firstName);
    }
  }, []);

  useEffect(() => {
    getData();
    getTemp();
  }, [data]);

  function getData() {
    let temp = getAllData();
    setData(temp);
  }

  function getTemp() {
    let temperature = getCurrentTemp();
    setTemperature(temperature);
    (data.length>0) && setLoading(false);
  }

  const handleChange = (event) => {
    let selected = event.target.value;
    setServer(selected);
    const index = data && data.map((item) => item.date).indexOf(selected);
    const myData = getChartData(data, index);
    setChartData(myData);
  };

  return (
    <>
      {loading ? (
        <Container
      maxWidth={"xl"}
      sx={{ display:"flex", margin: "auto", justifyContent: "center", pt: 30 }}
    >
      <CircularProgress />
    </Container>
      ) : (
        <>
          <Toolbar />
          <Container maxWidth="xl">
            <Stack
              direction={{
                xl: "row",
                lg: "row",
                md: "column",
                sm: "column",
                xs: "column",
              }}
              spacing={{
                xl: 5,
                lg: 5,
                md: 2,
                sm: 2,
                xs: 2,
              }}
              sx={{ justifyContent: "space-between" }}
            >
              <Box>
                <Typography noWrap={true} variant="h4">
                  Welcome, {username}
                </Typography>
              </Box>
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
                  Select Date
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select Date"
                  defaultValue=""
                  onChange={handleChange}
                >
                  {data.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.date}>
                        {formatDate(item.date)}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Stack>
            <Divider sx={{ mt: 2, mb: 2 }} />
          </Container>
          <Container component={Paper} sx={{ m: "auto", p: 4 }}>
            <Stack
              direction={{
                xl: "row",
                lg: "row",
                md: "column",
                sm: "column",
                xs: "column",
              }}
              spacing={{
                xl: 5,
                lg: 5,
                md: 3,
                sm: 3,
                xs: 3,
              }}
            >
              <Stack direction={"column"} spacing={3}>
                <Container
                  sx={{
                    backgroundColor: "#aeaeae",
                    borderRadius: 5,
                    px: 3,
                    py: 3,
                    textAlign: "center",
                  }}
                >
                  <Typography variant="paragraph">
                    CURRENT TEMPERATURE
                  </Typography>
                  <Typography variant="h2">{temperature}</Typography>
                </Container>
              </Stack>
              <Chart charta={chartData} />
            </Stack>
          </Container>
        </>
      )}
    </>
  );
}
