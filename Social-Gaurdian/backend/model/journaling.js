const mongoose = require('mongoose');
const { Schema } = mongoose;

const JournalSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    text: {
        type: String,
        required: true,
    },
    emotion:{
        type: Number,
    },
    date: {
        type: Date, // Changed to array of Date
        default: Date.now, // Set default as an array containing current date
    },
});

module.exports = mongoose.model('journal', JournalSchema);