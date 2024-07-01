/*
File: Entry.jsx
Authors: John HT, Ethan H, John O, Eric E
Creation Date: 5-23-24
Purpose: Defines the implementation of the track entry component. Handles the functionality of creating new track entries and
letting the user populate the entry fields with their desired responses. 
Structure: This react component is utilized in the Home.js File.
*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Entry.css';
import './ListView.js';

const Entry = ({ onEntryCreated, entryId, setEntryID }) => { // Arguments passed into the Entry component
    const [entryName, setEntryName] = useState(''); // Global string for entry name text box.
    const [review, setReview] = useState(''); // Global string for the review text box.
    const [thought, setThought] = useState(''); // Global string for the thought text box.
    const [rating, setRating] = useState(0); // Global integer for the entry rating.
    const [lists, setLists] = useState(''); // Global string for the lists an entry is apart of.
    const [related, setRelated] = useState([]); // Global array for the related entries.
    const [relatedEntries, setRelatedEntries] = useState([]); // Global array for rendering the entries the an entry is related to.
    const [showPopup, setShowPopup] = useState(false); // Global boolean variable for if the popup should be displayed.
    const [allEntries, setAllEntries] = useState([]); // Global array for storing all the entries in the database.

    // GET request for given entry ID
    useEffect(() => { // This function is ran when the Entry component mounts.
        if (entryId) { // If the entryID variable is not None, get that entry ID from the database.
            axios.get(`http://localhost:5001/entries/${entryId}`) // Get call to database for given entry ID.
                .then(response => { // Update global variables with data from Get API call.
                    const entry = response.data;
                    setEntryName(entry.entryName);
                    setReview(entry.review);
                    setThought(entry.thought);
                    setRating(entry.rating);
                    setLists(entry.lists.join(', '));
                    fetchRelatedEntries(entry.related);
                })
                .catch(error => { // Log if there was an error.
                    console.error('There was an error fetching the entry!', error);
                });
        }
    }, [entryId]);

    const fetchRelatedEntries = (relatedIds) => { // Given the relatedIDs input, renders that entry ID
        axios.get('http://localhost:5001/entries') // Get API call for given entry ID
            .then(response => { // Set fill the appropriate variables with data from get API call.
                setRelated(relatedIds)
                const allEntries = response.data;
                const relatedEntries = allEntries.filter(entry => relatedIds.includes(entry._id));
                setRelatedEntries(relatedEntries);
            })
            .catch(error => { // Log if there was an error.
                console.error('There was an error fetching the entries!', error);
            });
    };

    // The below functions handle updating the entry values when the user inputs entry data.
    const handleEntryNameChange = (e) => setEntryName(e.target.value);
    const handleReviewChange = (e) => setReview(e.target.value);
    const handleThoughtChange = (e) => setThought(e.target.value);
    const handleStarClick = (index) => setRating(index + 1);
    const handleListsChange = (e) => setLists(e.target.value);

    useEffect(() => {
        // Fetch all entry names when the component mounts
        axios.get('http://localhost:5001/entries')
            .then(response => {
                setAllEntries(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the entries!', error);
            });
    }, []);

    const handleCreateEntry = () => {
        // Construct new entry object
        const newEntry = {
            entryName,
            review,
            thought,
            rating,
            lists: lists.split(',').map(item => item.trim()),
            related: related

        };

        // Update if entryID variable is not None
        if (entryId) {
            axios.put(`http://localhost:5001/entries/update/${entryId}`, newEntry) // Put API call to put entry data in database.
                .then(response => { // If database successfully filled then clear global variables.
                    console.log('Entry updated', response.data);
                    // After added, clears the input fields
                    setEntryName('');
                    setReview('');
                    setThought('');
                    setRating(0);
                    setRelated([]);
                    setRelatedEntries([]);
                    setEntryID(null);
                    if (onEntryCreated) {
                        onEntryCreated();  // Refreshes the entries so that new entry can be rendered
                    }

                })
                .catch(error => { // Log error if put API call failed.
                    console.error('Error updating the entry!', error);
                });

        }
        // Otherwise, add entry
        else {
            // New entry object sent to the server via a POST request on the /add path
            axios.post('http://localhost:5001/entries/add', newEntry)
                .then(response => {
                    console.log('Entry created:', response.data);
                    // After added, clears the input fields
                    setEntryName('');
                    setReview('');
                    setThought('');
                    setRating(0);
                    setRelated([]);
                    setRelatedEntries([]);
                    if (onEntryCreated) {
                        onEntryCreated();  // Refreshes the entries
                    }
                })
                .catch(error => {  // Error checking
                    console.error('There was an error creating the entry!', error);
                });
        }
    };

    // Function that handles rendering rating stars.
    const renderStars = () => {
        // Creates array of 5 elements then maps each one to a star element
        return Array(5).fill(0).map((_, index) => (
            <span
                key={index}
                className={`star ${index < rating ? 'selected' : ''}`}
                onClick={() => handleStarClick(index)} // Updates rating on click
            >
                ★
            </span>
        ));
    };

    const togglePopup = () => {
        // function to toggle popup for related entries
        if (!showPopup) {
            // get all entries from the DB
            axios.get('http://localhost:5001/entries')
                // Populate popup with entries
                .then(response => {
                    setAllEntries(response.data);
                })
                // Error displayed if entries couldn't be fetched
                .catch(error => {
                    console.error('There was an error fetching the entries!', error);
                });
        }
        // Render the popup
        setShowPopup(!showPopup);
    };

    const handleEntrySelection = (entry) => {
        // function to handle when an entry in the popup gets selected
        if (!related.includes(entry._id)) { // only adds the entry if it is not in the popup
            setRelated([...related, entry._id]); // Add the entry ID to related
            setRelatedEntries([...relatedEntries, entry]); // Add the complete entry object to relatedEntries
        }
        // Popup de-rendered when user selects and entry
        togglePopup();
    };

    const handleRemoveRelatedEntry = (entryId) => { // function takes in entry._id
        // handles removing related entry from related field in entry object user is editing
        setRelated(related.filter(id => id !== entryId)); // finds entry that user is trying to delete and removes
        setRelatedEntries(relatedEntries.filter(entry => entry._id !== entryId)); // finds entry that is rendered in window and de-render is
    };

    const renderEntryPopup = () => {
        // this function is front end html for displaying the related entries popup.
        return (
            <div className="related-popup" onMouseDown={(e) => e.stopPropagation()}>
                {allEntries
                    .filter(entry => entry._id !== entryId)
                    .map(entry => (
                        <div
                            key={entry._id}
                            className="related-item"
                            onClick={() => handleEntrySelection(entry)}
                        >
                            {entry.entryName}
                        </div>
                    ))}
            </div>
        );
    };

    const renderSelectedEntries = () => (
        // this function is front end html for rendering the related entries that the user has selected to be related 
        <div className="selected-entries">
            <h4>Related Entries:</h4>
            {relatedEntries.map(entry => (
                <div key={entry._id} className="related-box">
                    <div className='related-text'>
                        <span>{entry.entryName}</span>
                    </div>
                    <button
                        className="remove-related"
                        onClick={() => handleRemoveRelatedEntry(entry._id)}
                    >
                        &times;
                    </button>
                </div>
            ))}
        </div>
    );

    return (
        // this is front end html code for rendering all the text entry box' s, their style sheet is found in Entry.css 
        <div className="entry-container">
            <div className="entry-field">
                <label>Entry Name</label>
                <input
                    type="text"
                    value={entryName}
                    onChange={handleEntryNameChange}
                />
            </div>
            <div className="entry-field">
                <label>Review</label>
                <textarea
                    value={review}
                    onChange={handleReviewChange}
                />
            </div>
            <div className="entry-field">
                <label>Thought</label>
                <textarea
                    value={thought}
                    onChange={handleThoughtChange}
                />
            </div>
            <div className="entry-field">
                <label>Rating</label>
                <div className="star-rating">
                    {renderStars()}
                </div>
            </div>
            
            <div className="entry-field">
                <label>Related Entries</label>
                <input
                    type="button"
                    value="Select Related Entries"
                    onClick={togglePopup}
                />
                {relatedEntries.length > 0 && renderSelectedEntries()}
                {showPopup && renderEntryPopup()}
            </div>
            <button className="create-entry-button" onClick={handleCreateEntry}>
                {entryId ? 'Update Entry' : 'Create Entry'}
            </button>
        </div>
    );
};
// Export the React Entry component so that other components can render it.
export default Entry;
