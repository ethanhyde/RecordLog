/*
File: stylizedBox.js
Author: Ethan H 
Creation Date: 5-21-24
Purpose: This file implements the stylizedBox component that is used in the Navbar and Graph view for displaying text in a formatted manner.
Structure: This file imports various tools for UI, including a box and button component, along with a theme accessor. The function takes in text, a link URI, default width, height, and font size, and returns a formatted box with all of the necessary properties in a styled manner.
*/
import React from "react";
import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material";

const StylizedBox = ({
  text,
  href,
  width = 85,
  height = 30,
  fontSize = "0.875rem",
}) => {
  const theme = useTheme();
  return (
    <Box
      color="black"
      sx={{
        width: width,
        height: height,
        backgroundColor: `${theme.palette.primary.white}`,
        padding: 1,
        borderRadius: 4,
        display: "flex",
        alignItems: "center",
        border: "1px solid black",
        justifyContent: "center",
        fontSize: fontSize,
        fontFamily: "Raleway, sans-serif",
        boxShadow: "7px 7px rgba(15, 28, 67)",
        "&:hover a": {
          textDecoration: "underline",
        },
      }}
    >
      <Button
        href={href}
        sx={{
          color: "primary",
          textDecoration: "none",
          fontFamily: "Raleway, sans-serif",
        }}
      >
        {text}
      </Button>
    </Box>
  );
};

export default StylizedBox;
