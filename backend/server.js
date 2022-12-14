const express = require("express");
const app = express();
const connectDB = require('./db/connection')
const cors = require('cors')

const userRouter = require('./api/routes/user_routes')
const predictionRouter = require('./api/routes/prediction_routes')
// ROUTES
app.get('/',(req,res)=>{
    res.send("This is Lung Function Prediction App's API")
})

connectDB();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/uploads',express.static('flaskAPI/uploads'));
app.use('/api/users',userRouter )
app.use('/api/predictions',predictionRouter )
app.listen(3003);