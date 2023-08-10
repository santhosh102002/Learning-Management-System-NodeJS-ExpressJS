
const express = require('express');
const router = express.Router();
const {register,login,logout,getProfile} = require('../controllers/user.controllers')


router.post('/register',register)
router.post('/login',login);
router.get('/logout',logout);
router.get('/me',getProfile)
module.exports = router;

