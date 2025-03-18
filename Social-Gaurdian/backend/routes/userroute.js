const express=require('express');

const usercontrol=require('./../controller/usercontrol');
const fetchuser=require("../middleware/fetchuser");

const router=express.Router();


router
    .route('/createuser')
    .post(usercontrol.createnewuser);

router
    .route('/login')
    .post(usercontrol.login);

router
    .route('/getuser',fetchuser)
    .post(usercontrol.getuser);


module.exports= router;