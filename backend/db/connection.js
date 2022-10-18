const mongoose = require('mongoose');

const URI = "mongodb+srv://admin:admin@lungfunctionpredictions.xcr24ip.mongodb.net/?retryWrites=true&w=majority"

const connectDB = async () =>{
    await mongoose.connect(URI,{
        useUnifiedTopology:true,
        useNewUrlParser:true,
    });
    console.log("Lung Function Prediction APP DATABASE CONNECTION HAS BEEN SET UP!")
}

module.exports = connectDB;