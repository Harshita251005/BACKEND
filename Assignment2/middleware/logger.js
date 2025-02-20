const fs = require("fs");

const logger = (req, res, next) => {
    const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
    fs.appendFile("log.txt", log, (err) => {
        if (err) throw err;
    });
    next();
};

module.exports = logger;
