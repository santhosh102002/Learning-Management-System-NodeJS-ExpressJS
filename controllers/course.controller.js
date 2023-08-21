const Course = require("../models/course.models");
const AppError = require("../utils/appError");



exports. getAllCourses = async (req,res,next)=>{

    try{
        const courses = await Course.find({}).select('-lectures');
        res.status(200).json({
            success: true,
            message: 'All courses',
            courses
        })

    }
    catch(err){
        return next(new AppError(err.message,500))
    }
}

exports. getLecturesByCourseId = async (req,res,next)=>{
   try{
    const {courseId} = req.params;
    const course = await Course.findById(courseId)
    if(!course){
        return next(new AppError('Invalid Course Id',400))
    }
    res.status(200).json({
        success: true,
        message: 'Course lectures fetched successfully',
        lectures : course.lectures
    })
   }
   catch(err){
   return next(new AppError(err.message,400))
   }

}

