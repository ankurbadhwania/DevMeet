const express = require('express')
const userAuth = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user")
const requestRouter = express.Router();


//connection request
requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["interested", "ignored"];
        if(!allowedStatus.includes(req.params.status)){
            throw new Error("status is invalid")
        }
        const toUser = await User.findById(toUserId);
        if(!toUser){
            throw new Error("receiver does not exist");
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or : [
                {fromUserId, toUserId},
                {fromUserId : toUserId, toUserId : fromUserId}
            ],
        });

        if(existingConnectionRequest) return res.status(400).send("request already exist");

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        const data = await connectionRequest.save()
        res.status(200).json({
            message : `${req.user.firstName} is ${status === 'interested' ? status : "not interested" } in ${toUser.firstName}`,
            data
        });
    }
    catch(err){
        res.status(400).send(err.message);
    }
})
requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try{
        const {status, requestId} = req.params;
        const allowedStatus = ["accepted", "rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).send("status not allowed");
        }
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.findOne({
            _id : requestId,
            toUserId : loggedInUser._id,
            status : "interested"
        })
        if(!connectionRequest){
            return res.status(404).send("request not found");
        }
        connectionRequest.status = status;
        const data = await connectionRequest.save();
        res.json({message : "connection request " + status, data});
    }
    catch(err){
        res.status(400).send(err.message);
    }
})
module.exports = requestRouter;
