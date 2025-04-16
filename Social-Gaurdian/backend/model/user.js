const mongoose=require('mongoose');
const toursschema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },   
})

const Tour=mongoose.model('tours',toursschema);
module.exports=Tour;