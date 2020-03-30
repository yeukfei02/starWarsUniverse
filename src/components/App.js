import React from 'react';
import Normalize from 'react-normalize';
import CssBaseline from "@material-ui/core/CssBaseline";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from "@material-ui/core/styles";

import MainPage from './mainPage/MainPage';

const theme = createMuiTheme({
  palette: {
    background: {
      default: "lightblue"
    }
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Normalize />
      <MainPage />
    </MuiThemeProvider>
  );
}

export default App;
