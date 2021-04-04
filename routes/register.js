const express = require('express')
const router = express.Router()

function checkNotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        res.redirect('/')
    }
    next()
}

router.get('/' , checkNotAuthenticated, (req,res) => {
    res.render('login/register')
})


module.exports = router 