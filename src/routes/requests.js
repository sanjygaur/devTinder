const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleWare/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
requestRouter.post("/request/send/:status/:toUserId",userAuth,  
  async (req, res) => {
try {
     const fromUser = req.user;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatuses = ["ignored", "interested"];
    if (!allowedStatuses.includes(status)) {
        return res.status(400).send(`Invalid status. Allowed values are: ${allowedStatuses.join(", ")}`);
    }
 const connectionRequest = new ConnectionRequest({
      fromUserId: fromUser._id,
      toUserId,
      status
    });

    const data = await connectionRequest.save();

    res.json({
      message: fromUser.firstName + " sent a connection request",
      data,
    });


const toUser = await User.findById(toUserId);
if (!toUser) {
    return res.status(404).json({ message: req.user.firstName+"is"+status+"with"+toUser.firstName,data});
}
const existingRequest = await ConnectionRequest.findOne({ 
   $or: [
    { fromUserId, toUserId },
    { fromUserId: toUserId, toUserId: fromUserId }
   ]
});     
if (existingRequest) {
    return res.status(400).send("A connection request already exists between these users.");
}

await connectionRequest.save();
    res.json({
        message: "Connection request sent successfully",
        data: connectionRequest
    });
} catch (error) {
    console.error("Error in /request/send/interested route:", error);
    res.status(401).send("Unauthorized: Invalid token");
  }
   
});

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
  try {

    const loggedInUser = req.user;
    const status = req.params.status.toLowerCase();
    const { requestId } = req.params;

    const allowedStatuses = ["accepted", "rejected"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).send("Invalid status");
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested"
    });

    if (!connectionRequest) {
      return res.status(404).send("Connection request not found");
    }

    connectionRequest.status = status;

    const data = await connectionRequest.save();

    res.json({
      message: `Connection request ${status} successfully`,
      data
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});
module.exports = requestRouter;