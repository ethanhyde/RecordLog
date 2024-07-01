/*
File: ListMenu.js
Authors: John HT, John O, Eric E
Creation Date: 5-29-24
Purpose: This file defines the implementation for the List Window component. The List Window component handles the functionality
for viewing the entries in a list, adding entries to a list, removing entries from a list, and deleting a list entirely.
Structure: This List Window Component it utilized in the ListView.js File.
*/

import React, { useState, useEffect } from "react";
import Popup from "./Popup";
import "./ListMenu.css";
import axios from "axios";

const DisplayEntry = ({ entry, onClose }) => (
  // Function to display the entry details for selectedEntry 
  <div className="entry-details-box">
    <button className="close-btn" onClick={onClose}>
      x
    </button>
    <div className="entry-details-header">
      <h3>{entry.entryName}</h3>
    </div>
    <div className="entry-details-content">
      <p>Review: {entry.review}</p>
      <p>Thought: {entry.thought}</p>
      <p>Rating: {entry.rating}</p>
      <p>Lists: {entry.lists.filter(list => list !== "").join(", ")}</p>
    </div>
  </div>
);

const ListWindow = ({ list_id, entries, onClose, onEntryEdit, selectedEntry, onEntrySelect }) => {
  const [showPopup, setShowPopup] = useState(false); // Expand dropdown popup to add entries 
  const [entryList, setEntryList] = useState([]); // List of entries 

  useEffect(() => {
    // This function collects the data from the entries in the database and creates a list of those entries 
    const fetchEntryDetails = async () => {
      const entryDetails = []; // Create a temporary entry list 
      for (const entryId of entries) { // Loop through the entries and retrieve them from the DB
        try {
          const response = await axios.get(
            `http://localhost:5001/entries/${entryId}`,
          );
          entryDetails.push(response.data); // Add the entry to the temporary list 
        } catch (error) {
          console.error(
            `Error fetching entry details for entry ID ${entryId}:`,
            error,
          );
        }
      }
      setEntryList(entryDetails); // Set the entry list as the temporary storage 
    };

    fetchEntryDetails();
  }, [entries]);

  const togglePopup = () => {
    // This function toggles the dropdown popup for adding entries to a list 
    setShowPopup(!showPopup); // Change the value of the showPopup 
  };

  const handleEntryClick = (entry) => {
    // This function handles the scenario where an entry is clicked 
    onEntrySelect(entry); // Set the given entry as the selectedEntry 
  };

  const closeEntryDetails = () => {
    // This function resets the selected entry 
    onEntrySelect(null); // Reset selectedEntry to null 
  };

  const handleSelectEntry = (entry) => {
    // This function handles the condition where an entry is added to a list through the list-view. 
    if (entry.lists === "") { // If the entry has no lists set the lists array as the list_id 
      entry.lists = [list_id];
    } else {
      entry.lists.push(list_id); // If the entry has lists then add the list to the array 
    }

    // Update the entry in the database
    axios
      .put(`http://localhost:5001/entries/update/${entry._id}`, entry)
      .then(() => {
        // Refresh the entry list in the component
        setEntryList([...entryList, entry]); //Add the entry to the entryList
        onEntryEdit(); // Handle edit of entry 
        setShowPopup(false); // Close the popup 
      })
      .catch((error) => {
        console.error("Error updating entry with new list:", error);
      });
  };

  const handleDeleteEntry = (id) => {
    // This function handles the deletion of entries through the list-view 
    axios
      .put(`http://localhost:5001/entries/delete-list/${id}`, { 
        listName: list_id,
      })
      .then(() => {
        setEntryList(entryList.filter((entry) => entry._id !== id)); // Remove desired entry_id from the entryList 
        if (selectedEntry && selectedEntry._id === id) { // If the selected entry is being deleted 
          onEntrySelect(null); // Reset the selectedEntry 
        }
        onEntryEdit(); // Handle edit of entry 
      })
      .catch((error) => {
        console.error("Error deleting entry from list:", error);
      });
  };

  const handleDeleteList = () => {
    // This function handles list deletion from the list-view 
    entries.forEach((entryToDelete) => { // Loop through the entries 
      handleDeleteEntry(entryToDelete); // Handle list deletion for each entry 
    });
  };

  return (
    <div className="stylized-box">
      <div className="box-header">
        <h3>{list_id}</h3>
        <button
          className="close-btn"
          onClick={() => {
            handleDeleteList();
            onClose();
          }}
        >
          Delete List
        </button>
      </div>
      <div className="box-content">
        <ul className="entry-list">
          {entryList.map((entry) => (
            <li 
              key={entry._id}
              className="entry-item"
              onClick={() => handleEntryClick(entry)}
            >
              <div className="entry-box">
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteEntry(entry._id);
                  }}
                >
                  x
                </button>
                {entry.entryName}
              </div>
            </li>
          ))}
        </ul>
        <button className="edit-list" onClick={togglePopup}>
          Add Entries
        </button>
      </div>
      {showPopup && (
        <Popup
          onClose={togglePopup}
          onSelect={handleSelectEntry}
          selectedEntries={entryList}
        />
      )}
      {selectedEntry && (
        <DisplayEntry entry={selectedEntry} onClose={closeEntryDetails} />
      )}
    </div>
  );
};
// Export the ListWindow to be used in ListView.js 
export default ListWindow;
