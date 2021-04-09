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
const User = require('./models/users')
const Practice = require('./models/practice') // 
const initializePassport = require('./passport-config')
initializePassport(
    passport,
    async (email) => {
        const temp = await User.find({email: email});
        return temp;
    },
    async (id) => {
        const temp1 = await User.find({id: id});
        return temp1;
    }
    )
const indexRouter = require('./routes/index')
const timedRouter = require('./routes/timed')
const lessonRouter = require('./routes/lessons')
const gameRouter = require('./routes/game')
// const loginRouter = require('./routes/login')
// const registerRouter = require('./routes/register')

const users = []  //temp

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.set('views', __dirname + '/views')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit : '10mb' ,extended : false}))

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
app.use('/game', gameRouter)
// app.use('/login' , loginRouter)
// app.use('/register' , registerRouter)

app.get('/login' , checkNotAuthenticated, (req,res) => {
    res.render('login/login')
})

app.get('/register' , checkNotAuthenticated, (req,res) => {
    res.render('login/register' , { user : new User() })
})

app.post('/register', checkNotAuthenticated, async (req,res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const practice = new Practice({
            email: req.body.email
        })
        const user = new User({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        const newUser = await user.save();
        const newPractice = await practice.save();
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

app.get("/dbCheck", async (req,res) => {
    try {
        const practice = await Practice.find({})
        console.log(practice)
        res.render('dbCheck' , {practice : practice})
    } catch {
        res.redirect('/')
    }
})

app.get("/analysis" , checkAuthenticated, async (req,res) => {
    try{
        const userData = await Practice.find({email: req.user.email});
        console.log(userData[0]);
        res.render("timed/analysis", {userData: userData[0]})
    } catch {

    }
})

function checkNotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    next()
}

function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}


app.listen(process.env.PORT || 3000)
