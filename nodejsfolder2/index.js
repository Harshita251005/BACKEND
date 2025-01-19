const http = require("http");
// const fs = require("fs");
// const url = require("url");
const express = require("express");
const app = express();
app.get('/', (req, res) => {
    return res.send("Hello from Home Page");
});
app.get('/about', (req, res) => {
    return res.send("Hello from About Page" + "hey" + req.query.name + "you are" + req.query.age);
});

app.listen(8000,() =>console.log("Server Starter!")
);


// const myServer = http.createServer(app);
// myServer.listen(8000, () => console.log("Server Started")
// );




// const myServer = http.createServer((req, res) => {
//     if (req.url === "/favicon.ico") return res.end();
//     const log = `${Date.now()}: ${req.url}New Req Received\n`;
//     const myUrl= url.parse(req.url);
//     fs.appendFile("log.txt", log, (err, data) => {
//         switch (req.url) {
//             case "/":
//                 res.end("Home page");
//                 break;
//             case "/about":
//                 res.end("I am harshita");
//                 break;
//             default:
//                 res.end("404 Not found");
//         }
//         // res.end("Hello From Server");
//     });
//     // console.log(req.header);
// });

// myServer.listen(8000, () => console.log("Server Started!"));