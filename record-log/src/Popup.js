/*
File: Popup.js
Authors: John HT
Creation Date: 5-31-24
Purpose: This file defines the implementation for the Popup component. The Popup component is utilized by the List Window
component and helps facilitate the searching of entries in the database for when a user wants to add an entry to a list.
The functionality includes the ability for the user to refine their entry search by typing in the entry title they are searching for.  
Structure: This Popup Component it utilized in the ListMenu.js File.
*/

import React, { useState, useEffect } from 'react'; // Import React functions.
import axios from 'axios'; // Import axios API library.
import './Popup.css'; // Import styling sheet.

const Popup = ({ onClose, onSelect, selectedEntries }) => {
  const [allEntries, setAllEntries] = useState([]); // Global array for storing all the entries retrieved from the database.
  const [filteredEntries, setFilteredEntries] = useState([]); // Global array for storing what entries have been filtered from the database depending on the searchTerm.
  const [searchTerm, setSearchTerm] = useState(''); // Global string for what the user has inputted in the search bar.

  useEffect(() => { 
    axios.get('http://localhost:5001/entries') // Gets API call to get all the entries from the database.
      .then(response => { // If get API call was successful then fill global variables with response from get call.
        setAllEntries(response.data);
        setFilteredEntries(response.data);
      })
      .catch(error => { // Log if there was an error for the get API call.
        console.error('There was an error fetching the entries!', error);
      });
  }, []);

  useEffect(() => {
    const results = allEntries.filter(entry => // Function to filter what entries will be displayed depending on the searchTerm global string data.
      entry.entryName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedEntries.some(selectedEntry => selectedEntry._id === entry._id)
    );
    setFilteredEntries(results); // Set global variable to data stored in results.
  }, [searchTerm, allEntries, selectedEntries]);

  return ( // Front end HTML for rendering the popup, its styling can be found in Popup.css
    <div className="popup">
      <button className="close-btn" onClick={onClose}>x</button>
      <div className="popup-content">
        <input
          type="text"
          placeholder="Search entries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="entry-list">
          {filteredEntries.map((entry, idx) => (
            <div key={entry._id} className="entry-item" onClick={() => onSelect(entry)}>
              {entry.entryName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popup;
