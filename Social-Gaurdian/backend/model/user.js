const mongoose = require('mongoose');

const toursschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']  // Optional: restrict to specific values
    },
    phone: {
        type: String,
        required: true
    },
    // age:{
    //     type: Number,
    //     required:true
    // },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Tour = mongoose.model('tours', toursschema);
module.exports = Tour;
