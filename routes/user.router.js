
const express = require('express');
const router = express.Router();
const {register,login,logout,getProfile,forgotPassword,resetPassword} = require('../controllers/user.controllers')

const isLoggedIn = require('../middlewares/auth.middleware');
const upload = require('../middlewares/multer.middleware');
router.post('/register',upload.single('avatar'),register)
router.post('/login',login);
router.get('/logout',logout);
router.get('/me',isLoggedIn,getProfile)
router.post('/reset',forgotPassword)
router.post('/reset/:resetToken',resetPassword)
router.post('/change-password', isLoggedIn, changePassword)

module.exports = router;

