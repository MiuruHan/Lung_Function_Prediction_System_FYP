const mongoose = require('mongoose')
const predictionSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    weekNumber:{
        type:Intl,
        required:true
    },
    age:{
        type:Intl,
        required:true
    },
    lungFunctionCapacity:{
        type:Intl,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    smokingStatus:{
        type:String,
        required:true
    },
    recordedDate: {
        type: Date,
        default : Date.now()
    },

    prediction:{
        type:String,
        required:true
    }
})


module.exports =  mongoose.model('Predictions',predictionSchema)