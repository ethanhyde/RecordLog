/*
File: Home.js
Authors: John HT, Ethan H
Creation Date: 5-27-24
Purpose: Defines the implementation of the Home component. This component is displayed on the main home page of the RL software.
It's functionality includes displaying all the user created track entries in the database, as well as rendering the Entry Component.
Structure: This Home component is utilized in the App.js File.
*/
import React, { useEffect, useState } from "react";
import axios from "axios";
import Entry from "./Entry.jsx";
import "./Home.css";
import { Typography } from "@mui/material";
import SplashScreen from "./SplashScreen.js";

const Home = () => {
  const [entries, setEntries] = useState([]); // Global variable for entries data to be stored in
  const [expandedEntries, setExpandedEntries] = useState({}); // Global variable for storing what entries the user has expanded
  const [selectedEntryID, setSelectedEntryID] = useState(null); // Global variable for what entry the user has selected for editing

  const fetchEntries = () => {
    // this function is a API call to fetch all the entry data in the database and put them in global variable "entries"
    // for other functions to access and such as rendering functions.
    axios
      .get("http://localhost:5001/entries")
      .then((response) => {
        setEntries(response.data); // Store the data received from the Get API call to the global variable so that it can be rendered.
      })
      .catch((error) => { // Log error in fetching data if it occurs.
        console.error("There was an error fetching the entries!", error);
      });
  };

  const toggleEntry = (entryId) => { // Function to toggle entry to become an expanded entry
    setExpandedEntries((prevState) => ({ // Fill the expandedEntries global variable with data so that it can be rendered.
      ...prevState,
      [entryId]: !prevState[entryId],
    }));
  };

  // Edit entry func
  const handleEditEntry = (entryID) => { // Function to take in an entryID and put it in the selectedEntryID global variable
    setSelectedEntryID(entryID);
  };

  const handleDeleteEntry = (entryId) => { // Function to handle deleting the a given entryID from the database
    axios
      .delete(`http://localhost:5001/entries/${entryId}`) // Deletes given entryID from database using delete API call
      .then((response) => {
        console.log("Entry deleted", response.data); // log if successful 
        fetchEntries(); // make a call the fetchEntries so that the rendered entries are re-set and no longer contain the deleted entry
      })
      .catch((error) => { // log if there was a problem with the delete API call
        console.error("There was a problem deleting the entry!", error);
      });
  };

  useEffect(() => { // this function as executed whe the Home components "mounts" i.e is first rendered.
    fetchEntries(); // Runs function that makes get API call to database.
  }, []);

  const getRelatedEntryName = (relatedIds) => { // This function handles extracting the related entry info out of a set of given entryIDs
    const relatedNames = relatedIds.reduce((accumulator, id) => {
      const relatedEntry = entries.find((entry) => entry._id === id);
      if (relatedEntry) {
        accumulator.push(relatedEntry.entryName);
      }
      return accumulator;
    }, []);
    return relatedNames.join(", "); // Returns a string of the extracted related entry Names.
  };

  return ( // This code is front-end html that is rendered at displays the text fields and box's of the Home component.
          // This HTML renders an Entry component defined in Entry.jsx
    <div className="homepage">
      <SplashScreen />
      <div className="entry-list">
        <Typography variant="about_h1"> Tracks: </Typography>
        {entries.length > 0 ? (
          <ul>
            {entries.map((entry) => (
              <li
                key={entry._id}
                className={`entry-container ${expandedEntries[entry._id] ? "expanded" : ""}`}
              >
                <div className="entry-header">
                  <h3>{entry.entryName}</h3>
                  <div className="review-preview">
                    <p>{entry.thought}</p>
                  </div>
                  <button
                    className="toggle-button"
                    onClick={() => toggleEntry(entry._id)}
                  >
                    {expandedEntries[entry._id] ? "-" : "+"}
                  </button>
                </div>
                <div className="entry-content">
                  <p>Review: {entry.review}</p>
                  <p>Thought: {entry.thought}</p>
                  <p>Rating: {entry.rating}</p>
                  <p>
                    Lists:{" "}
                    {entry.lists.filter((list) => list !== "").join(", ")}
                  </p>
                  <p>Related: {getRelatedEntryName(entry.related)}</p>
                  <button
                    className="edit-button"
                    onClick={() => handleEditEntry(entry._id)}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDeleteEntry(entry._id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            No entries found! Try logging a new song with{" "}
            <strong>create entry</strong>!
          </p>
        )}
      </div>
      <div className="create-entry">
        <Entry
          entryId={selectedEntryID}
          onEntryCreated={fetchEntries}
          setEntryID={setSelectedEntryID}
        />
      </div>
    </div>
  );
};
// Exports the Home component
export default Home;
