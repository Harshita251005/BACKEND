const morgan = require("morgan");
const express = require("express");
const app = express();


// app.use(morgan("tiny"));
app.use(morgan("combined"));

app.get("/",(req,res)=>{
    res.send("hello world");
});

app.get("/about",(req,res)=>{
    res.send("about page");
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});