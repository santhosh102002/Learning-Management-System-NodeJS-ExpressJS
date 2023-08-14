const User = require("../models/user.models");
const { default: AppError } = require("../utils/appError");



const register = async (req,res)=>{
 const {fullname,email,password} = req.body;
 if(!fullname || !email || !password){
    return next(new AppError("All fields are required",400))
 }
 const UserExists = await User.findOne({email})
 if(UserExists){
    return next(new AppError("User Already exists ",400))
}
const userCreate = await User.create({
    fullname,
    email,
    password
}
)

if(!userCreate){
    return next(new AppError("Registering user if failed, Try again",400))
}
await userCreate.save();
res.status(200).json({
    success: true,
    message: "User registered successfully"
})
}

const login = ()=>{

}

const logout = ()=>{

}
const getProfile = ()=>{

}

module.exports = {
    register,login,logout,getProfile
}