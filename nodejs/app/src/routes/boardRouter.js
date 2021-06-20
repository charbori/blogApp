var express = require('express');
var router = express.Router();
const db = require('../nodeApi/mysqlConnect.js');

router.get('/findUser', function(req, res) {
    db.query('select * from user', function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        console.log(results);
    });
});

router.get('/post', function(req, res) {
    var sql =   "SELECT * \
                   FROM post \
                  WHERE hide='0' \
                    AND ban='0' \
               ORDER BY reg_date asc \
                  LIMIT 30";
    db.query(sql, function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        var result_data = JSON.stringify({ success: true, data: results });
        res.send(result_data);
    });
});

module.exports = router;
