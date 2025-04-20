const express=require('express');
const User=require("../model/user");
const { body,validationResult }= require("express-validator");
const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken");
const fetchuser=require("../middleware/fetchuser");

exports.createnewuser=async (req,res)=>{
    //if there are errors then return the bad errors
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{
    //create a new user
    let user=await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({error:"this email is already in exsistance"});
    }

    const salt= await bcrypt.genSalt(10);
    const secpass=await bcrypt.hash(req.body.password,salt);
    const JWT_SECRET="anandisagoodb$oy";
     user= await User.create({
        name:req.body.name,
        email: req.body.email,
        gender:req.body.gender,
        phone:req.body.phone,
        // age:req.body.age,
        password: secpass,
    });
     const data={
        user:{
            id:user.id
        }
     }
     const authtoken=jwt.sign(data,JWT_SECRET);

    // res.json(user);
    res.json(authtoken)

   }catch(error){
    console.error(error.message);
    res.status(500).json("something is happen");
   }
}

exports.login=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const{email,password}=req.body;

    try{
      const user=await User.findOne({email});
      if(!user){
        return res.status(400).json({error:"please enter a valid credentials"});
      }

      const passwordComapre=await bcrypt.compare(password,user.password);
      if(!passwordComapre){
        return res.status(400).json({error:"please enter a valid credentials"});
      }

      const JWT_SECRET="anandisagoodb$oy";
      const data={
        user:{
            id:user.id
        }
     }
     const authtoken=jwt.sign(data,JWT_SECRET);

    // res.json(user);
    res.json({
        authtoken,
        name:user.name
    });

    // res.status(200).json("successful");
    

    }catch(error){
        console.error(error.message);
        res.status(500).json("something is happen");
     }
}

exports.getuser=async(req,res)=>{
    try{
        console.log("Decoded user:", req.user);
        const userid=req.user;
        const user=await User.findById(userid).select("-password");
        console.log(user);
        res.status(200).json(user)
    }catch(error){
        console.error(error.message);
        res.status(500).json("something is happen");
    }
}