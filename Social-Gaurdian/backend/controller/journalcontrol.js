const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Journal = require("../model/journaling");
// const natural = require('natural');

exports.fetchall=async(req,res)=>{
    try {
        const journals = await Journal.find({ user: req.user });
        res.json(journals);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Internal server error");
    }
}

exports.addjournal=async(req,res)=>{
    try {
        const { text } = req.body;
        console.log(text);

        // Perform sentiment analysis to analyze emotions
        const emotion = await analyzeEmotions(text);

        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Create a new journal entry
        const jour = new Journal({
            text,
            emotion: emotion,
            user: req.user
        });

        // Save the journal entry
        const savedjour = await jour.save();
        res.json(savedjour);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Internal server error");
    }
}

async function analyzeEmotions(text) {
    try {
        const { pipeline } = await import("@xenova/transformers");
        const pipe = await pipeline('sentiment-analysis');
        const result = await pipe(text);
        const label = result[0].score;
        return label;
    } catch (error) {
        console.error('Error analyzing sentiment:', error);
        return null;
    }
}