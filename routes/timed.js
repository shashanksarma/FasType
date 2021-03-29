const express = require('express')
const router = express.Router()

router.get('/timed1' , (req,res) => {
    res.render('timed/timedMode1')
})

router.get('/timed2' , (req,res) => {
    res.render('timed/timedMode2')
})

router.get('/timed5' , (req,res) => {
    res.render('timed/timedMode5')
})

module.exports = router 