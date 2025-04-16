const mongoose=require('mongoose');
const dotenv=require('dotenv');

dotenv.config({path : './config.env'});
const app=require('./app');


const mongooseURI = "mongodb://127.0.0.1:27017"; // You should specify the name of the database you want to connect to

// const DB=process.env.DATABASE.replace(
//     '<PASSWORD>',
//     process.env.DATABASE_PASSWORD
// );
const connectToMongo = () => {
    mongoose.connect(mongooseURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
    });
}

connectToMongo();


const port=5000;
app.listen(port,()=>{
    console.log(`app is running on ${port}...`);
});