const express = require('express');

const app = express();
const port = 3000;

// http://localhost:3000/payment?otp=1234
const verifyotp=(req,res,next)=>{
    if(req.query.otp === "1234")
    {
        next();
    }
    else{
        res.send("Invalid OTP");
    }
}

const verifyuser=(req,res,next)=>{
console.log("User verified");

};

//localhost:3000/payment
app.use((req, res, next) => {
    console.log("G24 and middlewre 1");
    next();
}); 

app.use('/payment',verifyotp,verifyuser, (req, res, next) => {
console.log("payment middleware");
next();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/payment', (req, res) => {
    res.send('Payment page');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});