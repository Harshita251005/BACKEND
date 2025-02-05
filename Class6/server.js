const express = require("express");
const app = express();

//middleware to serve static files
// app.use(express.static('public')); //without authentication  we can serve files to client so we put static files in public folder

//if upper code is resolved the code below this will note work that means req  and res cycle is completed/ closed.

app.use('/static',express.static('public'));  //now we have set up a route to setup static files

app.use('/static',express.static('assets')); //if in static public folder there is a file named index.html  then it will be served as default  file

app.get('/',(req,res)=>{
    res.send('Hello world');
});

app.get('/about',(req,res)=>{
    res.send('About page');
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});