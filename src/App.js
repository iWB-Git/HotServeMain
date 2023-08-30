import React from 'react';
import './App.css';
import RoutesTree from './Components/RoutesTree';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/material";
import "@fontsource/alata";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#212f92',
    },
    secondary: {
      main: '#ffcc01',
    },
    background: {
      paper: '#e6e7ef',
      default: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Alata, sans-serif',
  },
  shape: {
    borderRadius: 4,
  },
})

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
          <RoutesTree />
      </ThemeProvider>
    </div>
  );
}

export default App;
