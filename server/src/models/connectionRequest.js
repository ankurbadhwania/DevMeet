const mongoose = require("mongoose");
const User = require("./user")

const connectionRequestSchema = new mongoose.Schema({
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",    //  reference to the User collection similar like joins in sql
        required : true 
    },
    status : {
        type : String,
        enum :{
            values : ["ignored", "accepted", "interested", "rejected"],
            message : "invalid status type"
        }
    }
}, {timestamps : true})

connectionRequestSchema.index({fromUserId : 1, toUserId : 1}) //compound index ascending order
const ConnectionRequest = mongoose.model("connectionRequest", connectionRequestSchema)
module.exports = ConnectionRequest;