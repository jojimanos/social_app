const express = require('express');
const router = express.Router();

// import middlewares
const {requireSignIn, authMiddleware, adminMiddleware} = require('../controllers/auth')


// import controllers

const {read} = require('../controllers/user')

//routes
router.get('/user', requireSignIn, authMiddleware, read)

module.exports = router