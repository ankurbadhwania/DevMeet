const express = require("express");
const userAuth = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();

// get all pending requests
userRouter.get("/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "photoUrl",
      "about",
      "skills",
      "gender",
      "age",
    ]); // to get only firstname and lastname of other collection

    res.json({
      message: "data fetched successfully",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).send("something went wrong " + err.message);
  }
});

//get all accepted requests or user connections
userRouter.get("/user/connection", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connections = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate(
        "fromUserId",
        "firstName lastName skills about photoUrl gender age"
      )
      .populate(
        "toUserId",
        "firstName lastName skills about photoUrl gender age"
      );
    const data = connections.map((conn) => {
      if (conn.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return conn.toUserId;
      }
      return conn.fromUserId;
    });
    res.json({ data });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//user's feed
userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit > 50 ? 50 : 10;
    const skip = (page - 1) * limit;

    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("toUserId fromUserId");

    const hideUserFromFeed = new Set();
    connectionRequests.forEach((conn) => {
      hideUserFromFeed.add(conn.fromUserId.toString());
      hideUserFromFeed.add(conn.toUserId.toString());
    });
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select("firstName lastName skills about photoUrl gender age")
      .skip(skip)
      .limit(limit);
    res.json({ data: users });
  } catch (err) {
    res.status(400).send(err.message);
  }
});
module.exports = userRouter;
