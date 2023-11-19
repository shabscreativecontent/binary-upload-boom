const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const postController = require("../controllers/main")
const {ensureAuth, ensureGuest} = require("../middleware/auth")


// Main routes - simplified for now
router.get('/', homeController.getIndex)
router.get('/profile', ensureAuth, postController.getProfile)
router.post('/login', homeController.postLogin)
router.get('/signup',  homeController.getSignup)
router.post('/signup', homeController.postSignup)
router.get("/logout", homeController.getLogout)

module.exports = router