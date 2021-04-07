const express = require('express')
const router = express.Router()

router.get('/game1' , (req,res) => {
    res.render('game/game')
})

module.exports = router 