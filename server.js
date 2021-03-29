const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')
const timedRouter = require('./routes/timed')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
// app.set('layout', 'layouts/layout')
// app.use(expressLayouts)
app.use(express.static('public'))

app.use('/',indexRouter)
app.use('/practice' , timedRouter)

app.listen(process.env.PORT || 3000)
