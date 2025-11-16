const validator = require("validator");
const validateSignUp = (req) => {
    const {firstName, lastName, email, password} = req.body;
    if(!firstName || firstName.length < 3 ) throw new Error("enter valid firstName");

    else if(!validator.isEmail(email)){
        throw new Error("enter a valid email");
    }

    else if(!validator.isStrongPassword(password)){
        throw new Error("enter a strong password");
    }
}

const validateEditProfileData = (req, res) =>{
    const allowedEditFields = ["firstName", "lastName", "email", "age", "gender", "skills", "about", "photoUrl"];
    const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));
    return isEditAllowed;
}

const isStrongPassword = (req) => {
    if(!validator.isStrongPassword(req)){
        throw new Error("enter strong password")
    }
    return true;
}
module.exports = {validateSignUp, validateEditProfileData, isStrongPassword}