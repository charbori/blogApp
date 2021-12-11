const mysql = require('mysql2');

import envList from '../.env';

if (process.env.NODE_ENV == 'dev') {
    process.env.DB_HOST = envList.DB_HOST;
    process.env.DB_PASS = envList.DB_PASS;
    process.env.DB_NAME = envList.DB_NAME;
    process.env.DB_USER = envList.DB_USER;
}

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database:process.env.DB_NAME
});

function handleDisconnect() {
    connection.connect(function(err) {
        if (err) {
            console.log("error when connecting to db:", err);
            setTimeout(handleDisconnect, 2000);
        }
    })

    connection.on('error', function(err) {
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
