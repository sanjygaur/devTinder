// console.log("starting a new project");

const express = require("express");
const app = express(); 

app.use("/",(req,res)=>{
    res.send("Hello from Server...!");
});


app.use("/hello",(req,res)=>{
    // console.log("Hello hello hello from Server!");
     res.send("hello from jaipur city!");
});

app.use("/test",(req,res)=>{
    res.send("Hello from Server!");
});
app.listen(3000, () => {
    console.log("server is running on port 3000");
});