const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'mysqldb-dev.csprrtzyvhjo.ap-northeast-2.rds.amazonaws.com',
    user:'admin',
    password:'lazy!00$girl',
    database:'chatApp'
});

module.exports = connection;
