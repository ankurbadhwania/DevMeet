const mongoose = require("mongoose");
const validator = require('validator');   // library to check email structure/strong password/url etc
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    firstName : {
        type  : String,
        required : true,
        minlength : 3,
        maxlength : 50
    },
    lastName : {
        type  : String
    },
    email : {
        type  : String,
        required : true,
        lowercase : true,
        trim : true,
        unique : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email address");
            }
        }
    },
    password : {
        type  : String,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("password is weak, enter strong password");
            }
        }
    },
    age : {
        type  : Number,
        min : 18,
    },
    gender : {
        type  : String,
        lowercase : true,
        enum: ['male', 'female', 'others'],
        // validate (value){
        //     if(!['Male', 'Female', 'Others']){
        //         throw new Error("gender is not valid");
        //     }
        // }
    },
    photoUrl : {
        type  : String,
        default : "https://geographyandyou.com/images/user-profile.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("invalid photo url");
            }
        }
    },
    skills : {
        type : [String],
    },
    about : {
        type : String,
        default : "default description of the user",
    }
}, {
    timestamps : true,
})

userSchema.methods.getJWT = async function(){
    const user = this  // this keyword works differently in arrow function
    const token = await jwt.sign({ _id : user._id}, "DevCommunity$123", {expiresIn : "1d"});
    return token;
}
userSchema.methods.ValidatePassword = async function(passwordInputyByUser){
    const user = this
    const passwordHash = user.password
    const isPasswordValid = await bcrypt.compare(passwordInputyByUser, passwordHash)
    return isPasswordValid;
}
const User = mongoose.model("User", userSchema);
module.exports = User;