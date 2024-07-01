/*
File: ListView.js
Authors: John HT, Ethan H, John O, Eric E
Creation Date: 5-29-24
Purpose: This file defines the implementation of the List View component. The List View component is responsible for handling
the functionality of creating new entries and displaying created entries. It also renders the List Window component
for when a user selects a list to view.
Structure: This List View Component it utilized in the App.js File.
*/
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ListView.css";
import ListWindow from "./ListMenu";
import { TextField, Button, Box } from "@mui/material";

// This file implements the 'list-view' route, displaying lists with subentries
const ListView = () => {
  const [name, setName] = useState(""); // Name for new list created 
  const [lists, setLists] = useState({}); // Hash map of lists {list_id: entries}
  const [selectedList, setSelectedList] = useState(null); // Currently displayed list 
  const [selectedEntry, setSelectedEntry] = useState(null); //Currently displayed entry 

  const fetchEntries = () => { 
    // This function fetches all the entry data from the database and populates the lists hashmap. 
    axios
      .get("http://localhost:5001/entries") // Get the entries from the database 
      .then((response) => {
        const expandedEntries = {}; // Create temporary hashmap 

        response.data.forEach((entry) => { // Loop through the entries 
          entry.lists.forEach((listName) => { // Loop through the lists 
            if (listName !== "" && expandedEntries[listName]) { // Check if list already exists and has entries 
              expandedEntries[listName].push(entry._id); // Add the entry_id to the entries array 
            } else if (listName !== "") { // If the list exists but has no entries yet 
              expandedEntries[listName] = [entry._id]; // Set the entries array to contain that entry_id 
            }
          });
        });

        setLists(expandedEntries); // Replace empty lists hashmap with temporary storage 
        console.log(lists);
      })
      .catch((error) => {
        console.error("There was an error fetching the entries!", error);
      });
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleListSave = () => {
    // This function saves a newly created list to the lists hashmap 
    setLists({ ...lists, [name]: [] }); // Set the lists hashmap to contain previous lists and also a new list with empty entries 
    setName(""); //Reset the name for the next created list 
  };

  const handleListClick = (list_id) => {
    // This function sets the selectedList when the user clicks on a list 
    setSelectedList({ list_id, entries: lists[list_id] }); // Set the selected list using the list_id as the key and entries as the value 
    setSelectedEntry(null); // Reset the selected entry so it does not display 
  };

  const handleCloseStylizedBox = () => {
    // This function closes the selected list and entry so they are no longer rendered 
    setSelectedList(null); // Reset the selected list 
    setSelectedEntry(null); // Reset the selected entry 
  };

  return (
    <div style={{overflowY: "scroll"}} className="container">
      <Box color="primary" className="ListView">
        <h2>Create List</h2>
        <TextField
          id="filled-basic"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          fullWidth
          multiline
        />
        <p> </p>
        <Button onClick={handleListSave} variant="contained" hex="FFFFFF">
          Save
        </Button>
      </Box>
      <div className="entries-box">
        <h2>Lists:</h2>
        {Object.keys(lists).length === 0 && <p>No lists yet</p>}
        <div className="entries-list">
          {Object.keys(lists).map((list_id) => (
            <div
              key={list_id}
              className="list-item"
              onClick={() => handleListClick(list_id)}
            >
              <h4>{list_id}</h4>
            </div>
          ))}
        </div>
      </div>
      {selectedList && (
        <ListWindow
          list_id={selectedList.list_id}
          entries={selectedList.entries}
          onClose={handleCloseStylizedBox}
          onEntryEdit={fetchEntries}
          selectedEntry={selectedEntry}
          onEntrySelect={setSelectedEntry}
        />
      )}
    </div>
  );
};
//Export the ListView to be used elsewhere 
export default ListView;
