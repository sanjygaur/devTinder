// console.log("starting a new project");

const express = require("express");
const connectDB = require("./config/database"); // Connect to the database
const cookieParser = require("cookie-parser");

const app = express(); 
const { userAuth } = require("./middleWare/auth");

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cookieParser()); // Middleware to parse cookies



const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);



// app.get("/user",async(req,res)=>{
//     const userEmail = req.body.email; // Assuming the email is sent in the request body
//      console.log(userEmail);
     
//    try {
//   const user =  await User.find({ email: userEmail });
// //   const user =  await User.findOne({ email: userEmail });
//   if(user.length === 0){
//     return res.status(404).send("User not found");
//   }
//   else
//   {
//     console.log("User found:", user);
//     res.send(user);
//   }
  
//    } catch (error) {
//     res.status(500).send("Error fetching data from the database");
//    }
//     // console.log("fetching data from database");
//     // res.send("Data succesfully fetched from the database");
// });

// app.get("/feed",async( req,res)=>{
//    try {
//     const users =  await User.find({});
//     res.send(users);
//    } catch (error) {
//     res.status(400).send("Error fetching data from the database");
//    }
// });
// app.delete("/user",async(req,res)=>{
//     const userId = req.body.UserId; // Assuming the user ID is sent in the request body
//     console.log(userId);
//     try {
//         await User.findByIdAndDelete(userId);
//         res.send("Data successfully deleted from the database");
//     } catch (error) {
//         res.status(500).send("Error deleting data from the database");
//     }
//     console.log("delete data from database");
//     res.send("Data succesfully deleted from the database");
// });

// app.patch("/user/:UserId",async(req,res)=>{
//     const UserId = req.params?.UserId; // Assuming the user ID is sent in the request body
//     const updateData = req.body; // Assuming the updated data is sent in the request body
   
//     console.log(UserId);
//     console.log(updateData);
//     try {

//          const allowedUpdates = ['firstName', 'lastName', 'email', 'password', 'age', 'gender',"skills"]; // Define allowed fields for update
//     const isValidOperation = Object.keys(updateData).every((key) => allowedUpdates.includes(key));  
//     if (!isValidOperation) {
//         return res.status(400).send("Invalid updates! Allowed fields: " + allowedUpdates.join(", "));
//     }
// if(updateData.skills.length>10){
//     return res.status(400).send("Skills must be an array of strings");
// }

//         await User.findByIdAndUpdate( { _id: UserId },updateData,{
//             returnDocument: "after",
//             runValidators: true,
//         });
//         res.send("Data successfully updated in the database");
//     } catch (error) {
//         res.status(400).send("Update failed: " + error.message);
//     }       
//     console.log("update data in database");
//     res.send("Data succesfully updated in the database");
// });

connectDB().then(() => {
    console.log("Connected to the database successfully");
    app.listen(7777, () => {
    console.log("server is sucessfully listening on port 3000");
});
}).catch((error) => {
    console.error("Error connecting to the database:", error);
});