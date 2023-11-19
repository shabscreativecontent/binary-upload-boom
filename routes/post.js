const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const postController = require("../controllers/main")
const {ensureAuth, ensureGuest} = require("../middleware/auth")


// Post Routes - simplified for now