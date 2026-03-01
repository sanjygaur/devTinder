const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async(req, res, next) => {
   
    try {
         const token = req.cookies.token;
    if (!token) {
        return res.status(401).send("Unauthorized: No token provided");
    }
        const decodedMsg = await jwt.verify(token, "sanjay@Devtinder$34");
const { id } = decodedMsg; // Extract the user ID from the decoded token
       const user = await User.findById(id); // Find the user in the database using the extracted ID
       console.log("user==>",user); // Log the decoded token for debugging
       if (!user) {
            return res.status(404).send("User not found");
        }   
       // ✅ MUST attach before next()
        req.user = user;

        return next();   // ✅ return is important   console.log("Authenticated user:", user); // Log the authenticated user for debugging
    } catch (error) {
        console.error("Error in userAuth middleware:", error);
        return res.status(401).send("Unauthorized: Invalid token");
    }   
}
module.exports = {  userAuth };