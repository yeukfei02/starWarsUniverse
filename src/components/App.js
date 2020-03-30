import React from 'react';
import Normalize from 'react-normalize';
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider as MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import MainPage from './mainPage/MainPage';

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#3399ff"
    }
  },
  typography: {
    "fontFamily": "Fredoka One', cursive",
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
