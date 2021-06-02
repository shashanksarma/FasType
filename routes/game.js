const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const User = require('../models/users')
const Game1 = require('../models/game1') //Shooting
const Game2 = require('../models/game2') //Car
const game1 = require('../models/game1')

router.use(bodyParser.urlencoded({limit : '10mb' ,extended : false}))

function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

router.get('/', (req,res) => {
    res.render('game/gameHome')
})

router.get('/game1' , (req,res) => {
    res.render('game/game1')
})

router.get('/game2' , (req,res) => {
    res.render('game/game2')
})

router.get('/game3' , (req,res) => {
    res.render('game/game3')
})

router.get('/game4' , (req,res) => {
    res.render('game/game4')
})

router.get('/game5' , (req,res) => {
    res.render('game/game5')
})

router.get('/game6' , (req,res) => {
    res.render('game/game6')
})

router.get('/shootGame' , checkAuthenticated, async (req,res) => {
    const highscore = await Game1.find({email: req.user.email})
    res.render('game/gameShoot', {highscore: highscore[0].highscore})
})

router.post('/shootGame', checkAuthenticated, async (req,res)=> {
    try{
        console.log(req.body.score);
        const game1 = await Game1.updateOne({email: req.user.email}, {
            $push: {
                scores: {
                    "score": req.body.score,
                }
            }
        });
        console.log(game1);
        const userData = await Game1.find({email: req.user.email});
        if(req.body.score>userData[0].highscore)
        {
            const game1hs = await Game1.updateOne({email: req.user.email}, {highscore: req.body.score});
            console.log(game1hs);
        }
        console.log(userData[0]);
    } catch{
        res.redirect('/')
    }
})

router.get('/shootGame/leaderboard' , checkAuthenticated, async (req,res) => {
    const sortedData = await Game1.find().sort({highscore: 'desc'}).limit(10); //sorting according to highscore
    res.render('game/gameShootLead', {sortedData: sortedData})
})

module.exports = router 