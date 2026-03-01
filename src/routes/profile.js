const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleWare/auth");
profileRouter.get("/profile",userAuth, async (req, res) => {
  try {
    const user = req.User; // Access the authenticated user from the request object (set by the userAuth middleware)

    res.send(user);

  } catch (error) {
    console.error("Error in /profile route:", error);
    res.status(401).send("Unauthorized: Invalid token");
  }
});

module.exports = profileRouter;