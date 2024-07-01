/*
File: Navbar.js
Authors: John HT, Ethan H, Eric E
Creation Date: 5-24-24
Purpose: This file defines the implementation of the Navigation Bar component which is always rendered at the top of the window
in the Record log software. The navigation bar helps facilitate the rendering of alternate pages such as List View of Graph View. 
Structure: This Navbar Component it utilized in the App.js File.
*/
import React from "react";
import "./Navbar.css"; // Import styling sheet.
import StylizedBox from "./components/stylizedBox"; // Import the StylizedBox component
import Logo from "./Logo.png"; // Import Record-Log Logo file
import { Typography } from "@mui/material"; // Import UI materials.

// Navbar component which allows for user navigation between the pages of the application .
const Navbar = ({ boxHeight, boxWidth, boxFontSize }) => {
  return ( // Front end HTML for rending the Navbar buttons and box's. The styling is found in Navbar.css
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo-container" style={{ display: "inline-flex" }}>
          <img src={Logo} alt="Logo" className="logo-image" />
          <Typography variant="about_h1">record-log</Typography>
        </div>
        <div className="navbar-buttons">
          <StylizedBox
            text="Home"
            href="/"
            height={boxHeight}
            width={boxWidth}
            fontSize={boxFontSize}
          />
          <StylizedBox
            text="View Lists"
            href="/view-lists"
            height={boxHeight}
            width={boxWidth}
            fontSize={boxFontSize}
          />
          <StylizedBox
            text="Graph View"
            href="/graph-view"
            height={boxHeight}
            width={boxWidth}
            fontSize={boxFontSize}
          />
          <StylizedBox
            text="About"
            href="/about"
            height={boxHeight}
            width={boxWidth}
            fontSize={boxFontSize}
          />
        </div>
      </div>
    </nav>
  );
};
// Exports the Navbar component.
export default Navbar;
