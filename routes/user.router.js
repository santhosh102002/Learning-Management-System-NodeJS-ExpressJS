
const express = require('express');
const router = express.Router();


router.post('/register',register)
router.post('/login',login);
router.get('/logout',logout);
router.get('/me',profile)
module.exports = router;

