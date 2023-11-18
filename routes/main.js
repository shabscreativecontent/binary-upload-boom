const express = require('express')
const router = express.Router()
const homeController = require('../controllers/main')

router.get('/', homeController.getIndex)
router.post('/login', homeController.postLogin)
router.get('/signup',  homeController.getSignup)

module.exports = router