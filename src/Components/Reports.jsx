import * as React from "react";
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
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { getAllData } from "../firebase";
import { formatDate, getTableData } from "./Helpers";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#212f92",
    color: "#fff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Reports() {
  const [server, setServer] = useState(false);
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);

  const handleChange = (e) => {
    let temp = e.target.value;
    setServer(temp);
    const index = data.map((item) => item.date).indexOf(temp);
    const myData = getTableData(data, index);
    setTableData(myData);
  };

  function getData() {
    let data = getAllData();
    setData(data);
  }

  useEffect(() => {
    getData();
  }, []);

  function formatDate(mydate) {
    let day = Math.floor(mydate / 1000000);
    let month = Math.floor(mydate / 10000) - day * 100;
    if (month < 10) {
      month = `0${month}`;
    }
    let year = mydate - day * 1000000 - month * 10000;
    let newDate = `${day}/${month}/${year}`;
    return newDate;
  }

  function getStatus(temperature) {
    if (temperature < 30) {
      return "Normal";
    } else {
      return "High";
    }
  }

  return (
    <>
      {data ? (
        <>
          <Toolbar />
          <Container maxWidth="xl">
            <Stack
              direction="row"
              spacing={5}
              sx={{ justifyContent: "space-between" }}
            >
              <Typography
                sx={{ alignSelf: "center" }}
                noWrap={true}
                variant="h4"
              >
                Reports
              </Typography>
              <Box>
                <Stack direction={"row"} spacing={2}>
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
                      label="Select Server"
                      defaultValue=""
                      onChange={handleChange}
                    >
                      {data &&
                        data.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item.date}>
                              {formatDate(item.date)}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                  <Button variant="filled" onClick={getData}>
                    Export Report
                  </Button>
                </Stack>
              </Box>
            </Stack>
            <Divider sx={{ mt: 2, mb: 4 }} />
          </Container>
          <Container maxWidth="xl" sx={{ mt: 3 }}>
            <Stack direction="column" spacing={2}>
              {tableData && (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 500 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Date</StyledTableCell>
                        <StyledTableCell align="right">Time</StyledTableCell>
                        <StyledTableCell align="right">
                          Temperature&nbsp;(F)
                        </StyledTableCell>
                        <StyledTableCell align="right">Status</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableData &&
                        tableData.map((item) => (
                          <StyledTableRow>
                            <StyledTableCell>
                              {formatDate(server)}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {item.time}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {item.temp}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {getStatus(item.temp)}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Stack>
          </Container>
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}
