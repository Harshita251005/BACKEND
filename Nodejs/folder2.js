const { log } = require('console');
const fs = require('fs');
const os = require('os');

// //Sync...
// fs.writeFileSync("./test.txt", "Hey There!");

// //Async
// fs.writeFile("./test.txt", "Hello World", (err) => {});



// const result = fs.readFileSync("./contact.txt", "utf-8");
// console.log(result);



// fs.readFile("./contact.txt", "utf-8", (err, result) => {
//     if (err) {
//         console.log("Error", err);
//     }
//     else {
//         console.log(result);
//     }
// });

// fs.appendFileSync("./test.txt",new Date().getDate().toLocaleString());
// fs.appendFileSync("./test.txt", `Hey There\n`);

// fs.appendFileSync("./test.txt",`${Date.now()} Hey There\n`);
// fs.cpSync("./test.txt", "./copy.txt");


// fs.unlinkSync("./copy.txt");
// console.log(fs.statSync("./test.txt"));
// console.log(fs.statSync("./test.txt").isFile());
// fs.mkdirSync("my-docs");
// fs.mkdirSync("my-docs/a/b",{recursive: true});



//Blocking...

// console.log("1");
// const result = fs.readFileSync("contact.txt", "utf-8");
// console.log(result);
// console.log("2");



//Non-Blocking

console.log(os.cpus().length);

console.log("1");
fs.readFile("contact.txt", "utf-8", (err, result) => {
    console.log(result);
});
console.log("2");


//Default Thread Pool Size = 4
//max? -8core