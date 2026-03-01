const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleWare/auth");
requestRouter.post("/sendConnectionRequest",userAuth,  async (req, res) => {
//    console.log("Full req object keys =>", req.User);
      console.log(req.user.firstName);  // ✅ Now works

    res.send(req.user.firstName+"==done");
});

module.exports = requestRouter;