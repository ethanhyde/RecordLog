/*
File: palette.js
Author: Eric E
Creation Date: 5-25-24
Purpose: This file defines the color theme for the program. It controls the accent colors and fonts for various components in the program.
Structure: createTheme is imported from material-ui, to allow the theme to be overwritten in index.js with the ThemeProvider component. This theme is then created, with typography for font styles, as well as palette for various coloring functions.
*/

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    about_h1: {
      color: "#0F1C43",
      fontWeight: 700,
      fontFamily: "Raleway, sans-serif",
      fontSize: 40,
    },
    about_h2: {
      color: "#0F1C43",
      fontWeight: 700,
      fontFamily: "Raleway, sans-serif",
      fontSize: 32,
    },
    about_p: {
      fontFamily: "Raleway, sans-serif",
    },
  },

  palette: {
    primary: {
      light: "#3f4968",
      main: "#0F1C43",
      dark: "#0a132e",
      contrastText: "#fff",
      white: "white",
    },
    secondary: {
      light: "#f8d86b",
      main: "#F7CF47",
      dark: "#ac9031",
      contrastText: "#000",
    },
  },
});

export default theme;
