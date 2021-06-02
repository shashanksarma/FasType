const mongoose = require('mongoose')

const game1Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    scores: {
        type: Array,
        "default": []
    },
    highscore: {
        type: Number
    }
})

module.exports = mongoose.model('Game1' , game1Schema)