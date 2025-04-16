
const express=require('express');
const morgan=require('morgan');
const userroute=require('./routes/userroute');

const app=express();

//1- MIDDLEWARE

//3rd party middleware
app.use(morgan('dev'));

app.use(express.json()) //its  middleware used while the post request for req

//custom middleware it runs in the order its is written
app.use((req,res,next)=>{
    console.log("hello i am a first custom middleware");
    next(); // next is necesary to be written so that res cycle should be completed
})
app.use((req,res,next)=>{
    req.requestTime=new Date().toISOString();  // give the date and time for request
    console.log(req.requestTime);
    next(); 
})


app.get('/',(req,res)=>{
    res.status(200).json({
        message:'get request is running',
        req:'get'
    });
    })

    app.post('/s',(req,res)=>{
        res.status(200).send('post request is running');
        })

//2- ROUTE HANDLER
app.use('/api/v1/user',userroute);

// 3- SERVER STATING
module.exports= app;