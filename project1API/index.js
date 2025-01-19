const express = require("express");
const fs = require('fs');
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

//middleware
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    fs.appendFile("log.txt", `${Date.now()}: $ {req.method}: ${req.path}`, (err, data) => {
        next();
    });
    // console.log("Hello from middleware 1");
    // req.myUserName="harshita";
    // return res.json({msg: "Hello from middleware 1"});

});
app.use((req, res, next) => {
    console.log("Hello from middleware 2", req.myUserName);
    // return res.end("Hey");
    next();
});
//Routes

app.get('/users', (req, res) => {
    const html = `<ul>${users.map(user => `<li>${user.first_name}</li>`).join("")}</ul>`;
    res.send(html);
});




// //REST API

app.get("/api/users", (req, res) => {
    console.log("I am in get route", req.myUserName);

    return res.json(users);
});

app.route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        return res.json(user);
    })
    .patch((req, res) => {
        return res.json({ status: "pending" });
    })
    .delete((req, res) => {
        return res.json({ status: "pending" });
    })

//post
app.post("/api/users", (req, res) => {
    const body = req.body;
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({ status: "success", id: users.length });
    });
});


// app.get("/api/users/:id", (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
// });

// //patch
// app.patch("/api/users/:id", (req, res) => {
//     return res.json({status: "pending"});
// });

// //delete
// app.delete("/api/users", (req, res) => {
//     return res.json({status: "pending"});
// });

app.listen(PORT, () => console.log(`Server Started at PORT : ${PORT}`));


