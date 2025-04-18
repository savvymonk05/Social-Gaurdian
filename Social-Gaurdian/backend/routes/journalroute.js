const express=require('express');
const journalcontrol=require('./../controller/journalcontrol');
const fetchuser=require('../middleware/fetchuser');
const { body, validationResult } = require("express-validator");
const router=express.Router();

router
    .route('/fetchalljournals',fetchuser)
    .get(journalcontrol.fetchall);

router
    .route('/addjournal',fetchuser)
    .post(journalcontrol.addjournal);

module.exports=router;



