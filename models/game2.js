const mongoose = require('mongoose')

const game2Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    scores: {
        type: Array,
        "default": []
    }
})

module.exports = mongoose.model('Game2' , game2Schema)