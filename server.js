if(process.env.NODE_ENV !== 'production')
{
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const bcrypt = require("bcrypt")
const flash = require('express-flash')
const session = require('express-session')
const passport = require("passport")
const initializePassport = require('./passport-config')
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
    )
const indexRouter = require('./routes/index')
const timedRouter = require('./routes/timed')
const lessonRouter = require('./routes/lessons')
// const loginRouter = require('./routes/login')
// const registerRouter = require('./routes/register')

const users = []  //temp

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.set('views', __dirname + '/views')
// app.set('layout', 'layouts/layout')
// app.use(expressLayouts)
app.use(express.static('public'))
// app.use(bodyParser.urlencoded({limit : '10mb' ,extended : false}))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter)
app.use('/practice' , timedRouter)
app.use('/lessons', lessonRouter)
// app.use('/login' , loginRouter)
// app.use('/register' , registerRouter)

app.get('/login' , checkNotAuthenticated, (req,res) => {
    res.render('login/login')
})

app.get('/register' , checkNotAuthenticated, (req,res) => {
    res.render('login/register')
})

app.post('/register', checkNotAuthenticated, async (req,res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
    console.log(users)
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

function checkNotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    next()
}


app.listen(process.env.PORT || 3000)
