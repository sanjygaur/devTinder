const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleWare/auth");
const { validateEditProfileData } = require("../Utils/Validation");
profileRouter.get("/profile/view",userAuth, async (req, res) => {
  try {
    const user = req.User; // Access the authenticated user from the request object (set by the userAuth middleware)

    res.send(user);

  } catch (error) {
    console.error("Error in /profile route:", error);
    res.status(401).send("Unauthorized: Invalid token");
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
   if(!validateEditProfileData(req)){
    return res.status(400).send("Invalid fields in the request body");
   }
   const loggedInUser = req.User; // Access the authenticated user from the request object (set by the userAuth middleware)
 
   Object.keys(req.body).forEach((key) => {
    loggedInUser[key] = req.body[key];
   });
   await loggedInUser.save(); // Save the updated user profile to the database
  //  res.send(` Profile updated successfully for user: ${loggedInUser.firstName} ${loggedInUser.lastName} `);
  res.json({
    message: "Profile updated successfully"+loggedInUser.firstName + " ",
     data: loggedInUser
  });
  } catch (error) {
    console.error("Error in /profile/edit route:", error);
    res.status(401).send("Unauthorized: Invalid token");
  } 
});

module.exports = profileRouter;