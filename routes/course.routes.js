
const express = require('express')
const router = express.Router()
const {getAllCourses,getLecturesByCourseId} = require('../controllers/course.controller');
const isLoggedIn = require('../middlewares/auth.middleware');



router.route('/')
.get(getAllCourses)

router
.route('/:courseId')
.get(isLoggedIn,getLecturesByCourseId);

module.exports = router

