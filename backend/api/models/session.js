const mongoose = require('mongoose')
const sessionSchema = new mongoose.Schema({
    sessionName: {
        type: String,
        required: true
    },
    questions: {
        type: [{type:String}],
        required: true
    }
})


module.exports = mongoose.model('Sessions', sessionSchema)