const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter your name!'],
        maxLength:[30,'Name cannot be more than 15 characters'],
        minLenghth:[2,'Name should be more than 2 characters'],
    },
    email:{
        type:String,
        unique:true,
        validate:[validator.isEmail,'Please enter a valid email!'],
    },
    password:{
        type:String,
        required:[true,'Please enter your password!'],
        maxLength:[15,'Password cannot be more than 15 characters'],
        minLenghth:[8,'Name should be more than 8 characters'],
        // when pass is absolutely necessury
        select:false
    },
    avatar:
    {
        // cloudnary will be used for image hosting purpose
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        },
    },
    role:{
        type:String,
        default:"user"
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date,
});

userSchema.pre("save",async function(next){
    // can't use this inside of arrow fuction

    // before upadation
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,10);
})

// JWT token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
};

// Compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

// Generate password reset token

userSchema.methods.getResetPasswordToken = async function () {
    // Generating token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hashing and adding to user schema
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    // Return the hashed token
    return this.resetPasswordToken;
};

module.exports = mongoose.model('user',userSchema)