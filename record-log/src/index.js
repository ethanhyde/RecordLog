/*
File: index.js
Authors: John HT, Ethan H
Creation Date: 5-22-24
Purpose: This file is the basic index.js file defined upon the creation of a Node project. It simple renders the App component
which is the main part of the software.
*/
import React from 'react'; // Import React library
import ReactDOM from 'react-dom/client'; // Import ReactDom library for React structure.
import './index.css'; // Import style sheet
import App from './App'; // Import App React component
import reportWebVitals from './reportWebVitals'; // Import reportWebVitals library
import { BrowserRouter } from "react-router-dom" // Import BrowserRouter function for routing

const root = ReactDOM.createRoot(document.getElementById('root')); // Defines the root for the React structure
// Wrap main application in route, allowing the Navbar to route between "pages".
root.render( // HTML code that defines the structure of what should be rendered.
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// reportWebVitals function call
reportWebVitals();
