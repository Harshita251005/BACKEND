const express = require('express');
const app = express();

app.set('view engine','ejs');
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/G24', (req, res) => {
    res.render('index');
});
app.listen(3000, () => {
    console.log("cvbn");
});