const express = require('express')
const router = express.Router()

function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

router.get('/' ,checkAuthenticated, (req,res) => {
    res.render('index')
})

module.exports = router 