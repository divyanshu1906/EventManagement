const mongoose = require('mongoose');



//event database
const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    eventOrganizer: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    eventPlace: {
        type: String,
        required: true
    },
    dutyLeaves: {
        type: String,
        required: true
    },
    googleFormLink: {
        type: String,
        required: true
    }
});

// Create model for events
const Event = mongoose.model('Event', eventSchema);

module.exports = Event ; 