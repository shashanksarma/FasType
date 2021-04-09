const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const User = require('../models/users')
const Practice = require('../models/practice')

router.use(bodyParser.urlencoded({limit : '10mb' ,extended : false}))

function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

router.get('/timed1', checkAuthenticated, (req,res) => {
    res.render('timed/timedMode1')
})

router.post('/timed1', checkAuthenticated, async (req,res) => {
    try {
        console.log(req.body.wpm);
        const practice =await Practice.updateOne({email: req.user.email}, {
            $push: {
                scores: {
                    "wpm": req.body.wpm,
                    "accuracy": req.body.accuracy
                }
            }
        });
        console.log(practice);
    } catch {
        res.redirect('/');
    }
})

router.get('/timed2' , checkAuthenticated, (req,res) => {
    res.render('timed/timedMode2')
})

router.post('/timed2', checkAuthenticated, async (req,res) => {
    try {
        console.log(req.body.wpm);
        const practice =await Practice.updateOne({email: req.user.email}, {
            $push: {
                scores: {
                    "wpm": req.body.wpm,
                    "accuracy": req.body.accuracy
                }
            }
        });
        console.log(practice);
    } catch {
        res.redirect('/');
    }
})

router.get('/timed5' , checkAuthenticated, (req,res) => {
    res.render('timed/timedMode5')
})

router.post('/timed5', checkAuthenticated, async (req,res) => {
    try {
        console.log(req.body.wpm);
        const practice =await Practice.updateOne({email: req.user.email}, {
            $push: {
                scores: {
                    "wpm": req.body.wpm,
                    "accuracy": req.body.accuracy
                }
            }
        });
        console.log(practice);
    } catch {
        res.redirect('/');
    }
})

router.get('/endless' , checkAuthenticated, (req,res) => {
    res.render('timed/endless')
})

router.get('/instaDeath' , checkAuthenticated, (req,res) => {
    res.render('timed/instaDeath')
})

module.exports = router 