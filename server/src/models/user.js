const mongoose = require("mongoose");
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
    },
    password : {
        type  : String,
        required : true,
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
    },
    skills : {
        type : [String],
    },
    about : {
        type : String,
        default : "deafult description of the user",
    }
}, {
    timestamps : true,
})
const User = mongoose.model("User", userSchema);
module.exports = User;