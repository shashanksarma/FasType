const express = require('express')
const router = express.Router()

function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

router.get('/timed1' , checkAuthenticated, (req,res) => {
    res.render('timed/timedMode1')
})

router.get('/timed2' , checkAuthenticated, (req,res) => {
    res.render('timed/timedMode2')
})

router.get('/timed5' , checkAuthenticated, (req,res) => {
    res.render('timed/timedMode5')
})

router.get('/endless' , checkAuthenticated, (req,res) => {
    res.render('timed/endless')
})

router.get('/instaDeath' , checkAuthenticated, (req,res) => {
    res.render('timed/instaDeath')
})

module.exports = router 