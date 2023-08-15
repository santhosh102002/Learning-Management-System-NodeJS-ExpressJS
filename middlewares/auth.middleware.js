const { default: AppError } = require("../utils/appError");
const jwt = require('jsonwebtoken')

const isLoggedIn = function(req,res,next){
    const{token} = req.cookie;
    if(!token){
        return next(new AppError('Unauthenticated please login',401))
    }
    const tokenDetails = jwt.verify(token,process.env.JWT_SECRET);
    if(!tokenDetails){
        return next(new AppError('Unauthenticated, please login',401));

    }
    req.user = tokenDetails;
    next();
}

module.exports = isLoggedIn;