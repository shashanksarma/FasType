const mongoose = require('mongoose')

const practiceSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    scores: {
        type: Array,
        "default": []
    }
})

module.exports = mongoose.model('Practice' , practiceSchema)