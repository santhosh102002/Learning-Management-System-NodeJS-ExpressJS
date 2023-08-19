const User = require("../models/user.models");
const  AppError  = require("../utils/appError");
const cloudinary = require('cloudinary').v2;
const fs = require('fs')
const cookieOptions = {
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true
}

const register = async (req, res, next) => {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
        return next(new AppError('All fields are required',  400));
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        return next(new AppError('Email already exists',  400));
    }

    const user = await User.create({
        fullname,
        email,
        password,
        avatar: {
            public_id: email,
            secure_url: 'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg'
        }
    });

    if (!user) {
        return next(new AppError('User registration failed, please try again',  400));
    }

    if(req.file) {
        try {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'lms',
                width: 250,
                height: 250,
                gravity: 'faces',
                crop: 'fill'
            });

            if (result) {
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;

                // remove file from local server
                fs.rm(`uploads/${req.file.filename}`,()=>{
                    console.log('Removed successfully')
                });
            }
        } catch(e) {
            return next(new AppError(e.message || 'File not uploaded, please try again',  500));
        }
    }

    await user.save();

    const token = await user.generateJWTToken();
    res.cookie('token', token, cookieOptions);
    user.password = undefined;

    return res.status(200).json({
        success: true,
        message: 'User registered successfully',
        user
    })
}

const login  = async (req,res)=>{
const {email,password} = req.body;
if(!email || !password){
    return next(new AppError("All fields are required",400))
}
const userexist = await User.findOne({email}).select('+password') 
if(!userexist || !userexist.comparePassword(password)){
    return next(new AppError("Enter valid email and password",400))
}

const token = await userexist.generateJWTToken();
userexist.password = undefined
res.cookie('token',token,CookieOptions) 
res.status(200).json({
    success: true,
    message: "User logged in successfully",
    userexist
})

}

const logout = ()=>{
    res.cookie('token',null,{
        secure:true,
        maxAge: 0,
        httpOnly: true
    })
    res.status(200).json({
        success:true,
        message: "User logged out successfully"
    })

}
const getProfile = (req,res)=>{
const user = User.findById(req.user.id)

res.status(200).json({
    success:true,
    message: "User details"
})
}

module.exports = {
    register,login,logout,getProfile
}