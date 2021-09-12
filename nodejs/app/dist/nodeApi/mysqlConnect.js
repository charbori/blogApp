"use strict";

var mysql = require('mysql2');

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

function handleDisconnect() {
  connection.connect(function (err) {
    if (err) {
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000);
    }
  });
  connection.on('error', function (err) {
    console.log('db.error', err);

    if (err.code === 'PROTOCOL_CONNECTION_LIST') {
      return handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();
module.exports = connection;