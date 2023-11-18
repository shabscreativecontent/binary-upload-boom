const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')


require('dotenv').config({ path: './config/.env' })

connectDB()

// middleware config
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// Logging
// app.use(logger("dev"))

// Use forms for put / delete
// app.use(methodOverride("_method"));

// Sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}))


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// use flash messages for errors, info, etc..
// app.use(flash());

// Set Routes For Which the server is listening
app.use('/', mainRoutes)


// server Running
app.listen(process.env.PORT, ()=>{
   console.log(`Server is running on PORT: ${process.env.PORT}`)
})