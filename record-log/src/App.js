/*
File: App.js
Authors: John HT, Ethan H, John O, Eric E
Creation Date: 5-22-24
Purpose: This file defines the main structure of the Record Log application. It handles the rendering of the Navigation Bar
component and defines the routes for the Navigation Bar buttons.
Structure: This App Component it utilized in the Index.js File.
*/

import "./App.css"; // Import style sheet
import Navbar from "./Navbar.js"; // Import Navbar react Component
import Home from "./Home.js"; // Import Home react component
import Graph from "./Graph.js"; // Import Graph react component
import List from "./ListView.js"; // Import List react component
import AboutText from "./AboutText.js"; // Import AboutText react component
import { Route, Routes } from "react-router-dom"; // Import function for routing
import { ThemeProvider } from "@mui/material"; // Import themes from mui library
import theme from "./components/palette"; // import specific theme

// Main application component: Navbar is rendered, and the routes are defined to render components accessed through the navbar.
function App() {
  return ( // Defines the structure of the application, along with the routes and what react component to load for those routes.
    <ThemeProvider theme={theme}>
      <Navbar boxHeight={30} boxWidth={140} boxFontSize="0.9rem" />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/graph-view" element={<Graph />} />
          <Route path="/view-lists" element={<List />} />
          <Route path="/about" element={<AboutText />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}
// export the APP react component 
export default App;
