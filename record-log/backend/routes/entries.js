// Created by Ethan Hyde on 5/22/2024
// Express framework to handle API calls for MongoDB CRUD operations

const router = require('express').Router();     // Express router
let Entry = require('../models/record.model');  // Entry model

// GET route to fetch all entries
router.route('/').get((req, res) => {
    Entry.find()
        .then(entries => res.json(entries)) // Returns all entries in JSON
        .catch(err => res.status(400).json('Error: ' + err)); // Error otherwise
});

// Create operation
router.route('/add').post((req, res) => {
    // Extracts the data from request body
    const entryName = req.body.entryName;
    const review = req.body.review;
    const thought = req.body.thought;
    const rating = Number(req.body.rating);
    const lists = req.body.lists || [];
    const related = req.body.related || [];

    // Creates a new entry instance
    const newEntry = new Entry({
        entryName,
        review,
        thought,
        rating,
        lists,
        related
    });

    // New entry saved to DB
    newEntry.save()
        // Success and fail messages
        .then(() => res.json('Entry added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Finds by ID, returns a JSON or error otherwise
router.route('/:id').get((req, res) => {
    Entry.findById(req.params.id)
        .then(entry => res.json(entry)) // Returns entry in JSON
        .catch(err => res.status(400).json('Error: ' + err)); // Error
});

// Delete operation
router.route('/:id').delete((req,res) => {
    Entry.findByIdAndDelete(req.params.id)
        // Success and fail messages
        .then(() => res.json('Entry deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update operation
router.route('/update/:id').put((req, res) => {
    Entry.findById(req.params.id)
        .then(entry => {
            if (!entry) {
                return res.status(404).json('Entry not found'); // Error if entry not found
            }
            
            // Assign directly to entry from request body
            entry.entryName = req.body.entryName;
            entry.review = req.body.review;
            entry.thought = req.body.thought;
            entry.rating = Number(req.body.rating);
            entry.lists = req.body.lists || [];
            entry.related = req.body.related || [];
            
            // Saves updated entry to DB
            entry.save()
                // Success and fail messages
                .then(() => res.json('Entry updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err)); // Returns error if any
});

// Delete list name from entry
router.route('/delete-list/:entryId').put((req, res) => {
    const { listName } = req.body;
  
    Entry.findById(req.params.entryId)
      .then(entry => {
        if (!entry) {
          return res.status(404).json('Entry not found');
        }
  
        // Remove the list name from the entry's lists field
        const updatedLists = entry.lists.filter(list => list !== listName);
        entry.lists = updatedLists;
  
        // Save the updated entry to the database
        entry.save()
          .then(() => res.json('List removed from entry'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router; // Exports the router