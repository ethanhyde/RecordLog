/*
File: Home.js
Author: Ethan H
Creation Date: 6-2-24
Purpose: Defines the implementation for adding a splash screen component. It displays upon startup and 
         when the user clicks the home tab. After 3 seconds, the splash screen animation stops. The functionality
         for the splash screen component is defined in SplashScreen.css
*/
import React, { useEffect } from 'react';  // Imports React library and useEffect hook
import './SplashScreen.css';               // Imports the CSS file for styling the splash screen
import logo from './Logo.png';             // Logo
import logoEye from './Middle.png';        // Logo middle part that spins

const SplashScreen = () => {
  useEffect(() => {
    // Effect sets a timer to hide after 3 seconds
    const splashTimer = setTimeout(() => {
      // Hides after 3 seconds
      document.getElementById('splash-screen').style.display = 'none';
    }, 3000);

    // Clean up the timer if component gets unmounted before the timer finishes
    return () => clearTimeout(splashTimer);
  }, []);

  return (
    // The splash screen container
    <div id="splash-screen" className="splash-screen">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <img src={logoEye} alt="Logo Eye" className="logo-eye spinning" />
      </div>
    </div>
  );
};

export default SplashScreen; // Exports the component as default export
