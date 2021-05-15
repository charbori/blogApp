const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'172.16.0.10',
    user:'user',
    password:'mysql-db',
    database:'chatApp'
});

module.exports = connection;
