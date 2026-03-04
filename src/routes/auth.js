const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} = require("../Utils/Validation");
const User = require("../models/user"); // Import the User model
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
const jwt = require("jsonwebtoken");
authRouter.post("/signup", async (req, res) => {
    try {
        validateSignUpData(req);

        const {
            firstName,
            lastName,
            email,
            password,
            age,
            gender,
            skills,
            about,
            photoUrl
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            age,
            gender,
            skills,
            about,
            photoUrl
        });

        await user.save();

        return res.status(201).json({
            message: "User created successfully",
            data: user
        });

    } catch (error) {
        console.error(error);
        return res.status(400).send(error.message);
    }
});
authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send("User not found");
        }       
        // const isPasswordValid = await user.validatePassword(password) // Compare the provided password with the hashed password in the database
       const isPasswordValid = await user.validatePassword(password); // Compare the provided password with the hashed password in the database
       
       
       if (isPasswordValid) {

         const token = await jwt.sign({ id: user._id }, "sanjay@Devtinder$34", {
            expiresIn: "7d",
        }); 
        res.cookie("token", token); // Set the token in an HTTP-only cookie
           
        res.send("Login successful");
          
        }
        else {
            return res.status(401).send("Invalid password");
        }
        
    } catch (error) {
        console.error(error);
        return res.status(500).send("An error occurred during login");
    }   
});

authRouter.post("/logout", (req, res) => {
res.cookie("token",null, { httpOnly: true, expires: new Date(Date.now()) }); // Clear the token cookie by setting it to an empty value and expiring it immediately
    res.send("Logout successful");
});
module.exports = authRouter;