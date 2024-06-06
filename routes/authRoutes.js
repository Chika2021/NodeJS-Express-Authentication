const express = require('express');
const { signupGet, signupPost, loginGet, loginPost } = require('../controller/authController');

const router =  express.Router();


router.get('/' , signupGet)
router.post('/signup' , signupPost)
router.get('/login' , loginGet)
router.post('/login' , loginPost)


module.exports = router;