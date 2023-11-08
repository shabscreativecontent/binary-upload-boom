const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const homeRoutes = require('./routes/home')


require('dotenv').config({ path: './config/.env' })

// middleware config
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



app.use('/', homeRoutes)



app.listen(process.env.PORT, ()=>{
   console.log(`Server is running on PORT: ${process.env.PORT}`)
})