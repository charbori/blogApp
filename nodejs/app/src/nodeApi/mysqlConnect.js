const mysql = require('mysql');
console.log("mysql connect db:" + process.env.DB_HOST
    + " " + process.env.DB_USER
    + " " + process.env.DB_PASS
    + " " + process.env.DB_NAME);
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database:process.env.DB_NAME
});

module.exports = connection;
