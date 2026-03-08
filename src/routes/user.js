const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middleWare/auth");
const ConnectionRequest = require("../models/connectionRequest");
// get all the pending connections request for the LoggedIn User

userRouter.get("/user/requests/received",userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user; // Access the authenticated user from the request object (set by the userAuth middleware)            
    const pendingRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested"
    }).populate("fromUserId", ["firstName", "lastName",age,"gender","skills","about","photoUrl"]); // Populate the fromUserId field with user details
    res.json({
      message: "Pending connection requests fetched successfully",
      data: pendingRequests
    });
  } catch (error) {
    console.error("Error in /user/requests/pending route:", error.message); 
  }
});

module.exports = userRouter;