// console.log("starting a new project");

const express = require("express");
const connectDB = require("./config/database"); // Connect to the database
const app = express(); 
const User = require("./models/user"); // Import the User model

app.use(express.json()); // Middleware to parse JSON request bodies
app.post("/signup",async(req,res)=>{
    console.log(req);
    
    // const userObj = {
    //     firstName: "virat",
    //     lastName: "kohli",
    //     email: "virat12@gmail.com",
    //     password: "virty@1230",
    // };
    const User = new User(req.body); // Create a new User instance with the request body
    await User.save();
    res.send("Data succesfully saved  to the database");
});

app.get("/user",async(req,res)=>{
    const userEmail = req.body.email; // Assuming the email is sent in the request body
     console.log(userEmail);
     
   try {
  const user =  await User.find({ email: userEmail });
//   const user =  await User.findOne({ email: userEmail });
  if(user.length === 0){
    return res.status(404).send("User not found");
  }
  else
  {
    console.log("User found:", user);
    res.send(user);
  }
  
   } catch (error) {
    res.status(500).send("Error fetching data from the database");
   }
    // console.log("fetching data from database");
    // res.send("Data succesfully fetched from the database");
});

app.get("/feed",async( req,res)=>{
   try {
    const users =  await User.find({});
    res.send(users);
   } catch (error) {
    res.status(400).send("Error fetching data from the database");
   }
});
app.delete("/user",async(req,res)=>{
    const userId = req.body.UserId; // Assuming the user ID is sent in the request body
    console.log(userId);
    try {
        await User.findByIdAndDelete(userId);
        res.send("Data successfully deleted from the database");
    } catch (error) {
        res.status(500).send("Error deleting data from the database");
    }
    console.log("delete data from database");
    res.send("Data succesfully deleted from the database");
});

app.patch("/user",async(req,res)=>{
    const UserId = req.body.UserId; // Assuming the user ID is sent in the request body
    const updateData = req.body; // Assuming the updated data is sent in the request body
    console.log(UserId);
    console.log(updateData);
    try {
        await User.findByIdAndUpdate( { _id: UserId },updateData);
        res.send("Data successfully updated in the database");
    } catch (error) {
        res.status(500).send("Error updating data in the database");
    }       
    console.log("update data in database");
    res.send("Data succesfully updated in the database");
});

connectDB().then(() => {
    console.log("Connected to the database successfully");
    app.listen(7777, () => {
    console.log("server is sucessfully listening on port 3000");
});
}).catch((error) => {
    console.error("Error connecting to the database:", error);
});