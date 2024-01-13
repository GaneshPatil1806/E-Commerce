const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt =  require('jsonwebtoken');
const User = require('../models/userModel')

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler('Please login to access this resource', 401));
    }

    try {
        const decodeData = jwt.verify(token, process.env.JWT_SECRET);
       // console.log('Decoded Data:', decodeData);

        req.user = await User.findById(decodeData.id);
        next();
    } catch (error) {
        return next(new ErrorHandler('Invalid token', 401));
    }
});

exports.authorizedRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed to access that resource`, 403));
        }
        next();
    };
};