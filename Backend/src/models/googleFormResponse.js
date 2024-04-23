// Create a new file named googleFormResponse.js in your models directory

const mongoose = require('mongoose');

// Define the schema for Google Form responses
const googleFormResponseSchema = new mongoose.Schema({
    names: {
        type: String,
        required: true
    },
    registrationNumber: {
        type: Number,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    // Add more fields as needed for your Google Form responses
}, { timestamps: true });

// Create a model for Google Form responses
const GoogleFormResponse = mongoose.model('GoogleFormResponse', googleFormResponseSchema);

module.exports = GoogleFormResponse;
