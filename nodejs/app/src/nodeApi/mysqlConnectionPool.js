const mysql = require('mysql');

let pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database:process.env.DB_NAME,
    "connectionLimit" : 50
});

function getConnection(callback) {
    pool.getConnection(function(err, conn) {
        if (!err) {
            callback(conn);
        }
    });
}

/*
실행부분 형태
db.getConnection((conn) => {
    conn.query()
    conn.release();
});
*/

module.exports = getConnection;
