// Created by Ethan Hyde on 5/22/2024
// Purpose: This file defines the end points for the API calls. These API calls allow for Create, Retrieve, Update
// and Delete (CRUD) functionality in the database.
// Node.js setup to run java on server side

// Imports the modules needed
const express = require('express');   // Express framework
const cors = require('cors');         // CORS middleware
const mongoose = require('mongoose'); // Mongoose for MongoDB
require('dotenv').config();           // Environment vars from the .env file

// Creates instance of express app
const app = express();
const port = process.env.PORT || 5001; // Defines the port. I did 5001 because 5000 is occupied

// Sets up middleware
app.use(cors());
app.use(express.json()); // Parses incoming json requests

// Imports the routes
const entryRouter = require('./routes/entries'); // Entries router
app.use('/entries', entryRouter);                // Mounts router on /entries path

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    // Success and failure messages
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log('MongoDB connection error:', err));

// Starts the server and listens on the port specified above
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
