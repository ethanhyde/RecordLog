// Created by Ethan Hyde on 5/22/2024

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Entry fields for database
const entrySchema = new Schema({
    entryName: { type: String, required: true },
    review: { type: String, required: true },
    thought: { type: String, required: false },
    rating: { type: Number, required: false },
    lists: { type: [String], required: false },
    related: { type: [String], required: false }
});

module.exports = mongoose.model('Entry', entrySchema);
