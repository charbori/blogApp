var express = require('express');
var router = express.Router();
const db = require('../nodeApi/mysqlConnect.js');

const test_table = 'post';
router.get('/findUser', function(req, res) {
    db.query('select * from user', function (error, results, fields) {
        if (error) {
            console.log(error);
            var result_data = JSON.stringify({ success: false, data:"" });
            res.send(result_data);
        } else {
            console.log(results);
            var result_data = JSON.stringify({ success: true, data:results });
            res.send(result_data);
        }
    });
});

router.get('/post/add', function(req, res) {
    var datas = new Array();
    var res_add = '';
    var insert_values = '';
    if (typeof req.query.end === 'undefined') {
        var error_msg = 'end value is undefined';
        console.log(error_msg);
        res.send(error_msg);
    }
    for (var i = 1; i < req.query.end; i++) {
        insert_values = insert_values + ` ,('title ${i}', 'data ${i}', 'id ${i}')`;
    }

    var sql = "INSERT INTO " + test_table + "(`title`, `contents`, `user_id`)  \
               VALUES ('title0', 'data0', 'id0')";
    sql = sql + insert_values;

    let today = new Date();
    var start_time = today.getHours() + "/" + today.getMinutes() + "/" + today.getSeconds() + "/" + today.getMilliseconds();
    console.log(start_time);
    db.query(sql, function (error, results, fields) {
        if (error) {
            console.log("insert error");
            var result_data = JSON.stringify({ success: false, data:"" });
        } else {
            var result_data = JSON.stringify({ success: true, data:results });
            res_add = result_data;
            let today_end = new Date();
            var end_time = today_end.getHours() + "/" + today_end.getMinutes() + "/" + today_end.getSeconds() + "/" + today_end.getMilliseconds();
            console.log(end_time);
        }
    });
    res.send(res_add);
});

router.get('/post/delete', function(req, res) {
    // check req
    var params = new Array();
    if (typeof req.query.start === 'undefined') {
        let error_msg = 'set start value';
        console.log(error_msg);
        res.send(error_msg);
    }
    var sql    = "DELETE FROM " + test_table + " \
                  WHERE idx > " + req.query.start;
    let today = new Date();
    var start_time = today.getHours() + "/" + today.getMinutes() + "/" + today.getSeconds() + "/" + today.getMilliseconds();
    console.log(start_time);

    db.query(sql, function (error, results, fields) {
        if (error) {
            console.log("delete error");
            var result_data = JSON.stringify({ success: false, data:"" });
            res.send(result_data);
        } else {
            var result_data = JSON.stringify({ success: true, data:results });
            res.send(result_data);
            let today_end = new Date();
            var end_time = today_end.getHours() + "/" + today_end.getMinutes() + "/" + today_end.getSeconds() + "/" + today_end.getMilliseconds();
            console.log(end_time);
        }
    });
});

router.get('/post/view', function(req, res) {
    // check req
    var params = new Array();
    var sql    = "SELECT `idx`, `title`, `contents`, `user_id`  \
                  FROM " + test_table + "                       \
                  WHERE idx > " + req.query.start;

    db.query(sql, function (error, results, fields) {
        if (error) {
            console.log("select fail");
            var result_data = JSON.stringify({ success: false, data:"" });
            res.send(result_data);
        } else {
            var result_data = JSON.stringify({ success: true, data:results });
            res.send(result_data);
        }
    });
});

router.get('/post', function(req, res) {
    var sql =   "SELECT * \
                   FROM post \
                  WHERE hide='0' \
                    AND ban='0' \
               ORDER BY reg_date asc \
                  LIMIT 1";
    var sql_user = "SELECT * \
                      FROM user \
                     WHERE id ='";
    var result_send = {
        user_data: {
            name: '',
            id: ''
        },
        post_data: {
            time: '',
            rate: '',
            action: '',
            like: 0
        },
        content_data: {
            detail: '',
            comment_data: ''
        }
    };
    function result_post() {
        return new Promise((resolve, reject) => {
            db.query(sql, function (error, results, fields) {
                if (error) {
                    console.log(error);
                    resolve(false);
                } else if (results.length > 0 ) {
                    console.log("1-1" + results[0].user_id + " " + results[0].reg_date);
                    result_send.user_data.id = results[0].user_id;
                    result_send.post_data.time = results[0].reg_date;
                    result_send.post_data.rate = results[0].post_count;
                    result_send.post_data.like = results[0].post_like;
                    result_send.content_data.detail = results[0].contents;
                    result_send.content_data.comment_data = results[0].comment_count;
                    resolve(true);
                }
            });
        });
    }
    result_post().then(row => {
        if (row == false) {
            var result_data = JSON.stringify({ success: false });
            res.send(result_data);
        }
        sql_user = sql_user + result_send.user_data.id + "'";
        console.log(result_send.user_data.id);
        console.log(result_send.post_data.time);

        db.query(sql_user, function (error, results, fields) {
            if (error) {
                console.log(error);
            } else if (results.length > 0 ) {
                console.log("1-2" + results[0].name);
                result_send.user_data.name = results[0].name;

                var result_data = JSON.stringify({ success: true, data:result_send });
                res.send(result_data);
            }
        });
    });
});

module.exports = router;
