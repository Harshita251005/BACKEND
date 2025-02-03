const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true })); //when u send data from form, it is urlencoded using post method
app.use(express.json()); //when u send data using json format

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/user", (req, res) => {
    console.log(req.query);
    let a = req.query.name;
    let b = req.query.age;
    console.log("User route and get method");
    // res.send("User route and get method");
    // res.render("getpost.ejs");
    res.send("Response we got:  \n name: "+a+" age: "+b)
});

app.post("/user", (req, res) => {
    console.log(req.body);
    console.log("User route and post method");
    // res.send("User route and post method");
    // res.render("getpost.ejs");
    let a = req.body.name;
    let b = req.body.age;
    res.send("Response we got:  \n name: "+a+" age: "+b)
});

app.listen(3000, () => {
    console.log("Server is listening to port 3000");
});