const express = require('express')
const profileRouter = express.Router();
const userAuth = require("../middlewares/auth")
const {validateEditProfileData, isStrongPassword} = require("../utils/validation");
const User = require('../models/user');
const bcrypt = require("bcrypt");


// login profile
profileRouter.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    }  
    catch(err){
        res.send("invalid request: " + err.message);
    }
})

//edit
profileRouter.patch("/profile/edit", userAuth, async (req, res) =>{
    const loggedInUser = req.user;
    try {
        if(!validateEditProfileData(req)){
            throw new Error("enter valid update");
        }
        Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key]);
        await loggedInUser.save();
        res.json({
            message : `${loggedInUser.firstName}, your profile updated successfully`,
            data : loggedInUser
        })
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

//forgot password
profileRouter.patch("/profile/forgotpassword", async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).send("user not found");
        }
        else{
            if(isStrongPassword(password)) user.password = await bcrypt.hash(password, 10);
            else{
                return res.status(400).send("enter strong password");
            }
        }
        await user.save();
        res.send("password updated successfully");
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

module.exports = profileRouter;