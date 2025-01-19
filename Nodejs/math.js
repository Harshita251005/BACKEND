function add(a, b) {
    return a + b;
}
function sub(a, b) {
    return a - b;
}


// module.exports=add;
//here we are exporting math function
module.exports = {
    addFn: add,
    subFn: sub,
};