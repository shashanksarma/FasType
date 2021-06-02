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

router.get("/" ,checkAuthenticated, (req,res) => {
    res.render("lessons/LessonHome" , {user: req.user.name})
})

router.get("/L1" , (req,res) => {
    res.render("lessons/Lesson1")
})

router.get("/L2" , (req,res) => {
    res.render("lessons/Lesson2")
})

router.get("/L3" , (req,res) => {
    res.render("lessons/Lesson3")
})

router.get("/L4" , (req,res) => {
    res.render("lessons/Lesson4")
})

router.get("/L5" , (req,res) => {
    res.render("lessons/Lesson5")
})

router.get("/L6" , (req,res) => {
    res.render("lessons/Lesson6")
})

router.get("/L7" , (req,res) => {
    res.render("lessons/Lesson7")
})

router.get("/L8" , (req,res) => {
    res.render("lessons/Lesson8")
})

router.get("/L9" , (req,res) => {
    res.render("lessons/Lesson9")
})

router.get("/L10" , (req,res) => {
    res.render("lessons/Lesson10")
})

router.get("/L11" , (req,res) => {
    res.render("lessons/Lesson11")
})

router.get("/L12" , (req,res) => {
    res.render("lessons/Lesson12")
})

router.get("/L13" , (req,res) => {
    res.render("lessons/Lesson13")
})

router.get("/L14" , (req,res) => {
    res.render("lessons/Lesson14")
})

router.get("/L15" , (req,res) => {
    res.render("lessons/Lesson15")
})

router.get("/L16" , (req,res) => {
    res.render("lessons/Lesson16")
})


module.exports = router