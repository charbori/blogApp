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

router.get('/post/action', function(req, res) {
    // check req
    var params = new Array();
    let today = new Date();
    var insert_values = '';
    var sql_delete    = "DELETE FROM  " + test_table + " \
                         WHERE idx > 10";


    for (var i = 1; i < 50000; i++) {
        insert_values = insert_values + ` ,('title ${i}', 'data ${i}', 'id ${i}')`;
    }

    var sql_insert = "INSERT INTO  " + test_table + "(`title`, `contents`, `user_id`)  \
                      VALUES ('title0', 'data0', 'id0')";
    sql_insert = sql_insert + insert_values;
    var res_delete = '';
    var res_insert = '';

    let start_del = new Date();
    var start_del_time = start_del.getHours() + "/" + start_del.getMinutes() + "/" + start_del.getSeconds() + "/" + start_del.getMilliseconds();
    console.log(start_del_time);
    db.query(sql_delete, function (error, results, fields) {
        if (error) {
            console.log("delete error");
            res_delete = results;
        } else {
            let end_del = new Date();
            var end_del_time = end_del.getHours() + "/" + end_del.getMinutes() + "/" + end_del.getSeconds() + "/" + end_del.getMilliseconds();
            console.log(end_del_time);
            console.log("delete done");
            res_delete = results;
        }
    });

    let start_insert = new Date();
    var start_insert_time = start_insert.getHours() + "/" + start_insert.getMinutes() + "/" + start_insert.getSeconds() + "/" + start_insert.getMilliseconds();
    console.log(start_insert_time);
    db.query(sql_insert, function (error, results, fields) {
        if (error) {
            console.log("insert error");
            res_insert = results;
        } else {
            let end_insert = new Date();
            var end_insert_time = end_insert.getHours() + "/" + end_insert.getMinutes() + "/" + end_insert.getSeconds() + "/" + end_insert.getMilliseconds();
            console.log(end_insert_time);
            console.log("insert done");
            res_insert = results;
        }
    });

    var result_data = JSON.stringify({ success: true, del:res_delete, ins:res_insert });
    res.send(result_data);
});
// test innodb
// delete > insert 문 순차 실행시
// delete 문에서 idx 900 ~ 1000 데이터를 삭제하고
// insert 문에서 idx 900 ~ 1000 데이터를 삽입하면
// idx 1 ~ 100 이 정상적으로 새로운 데이터로 변경되어야함
// select 시 idx 900 ~ 1000 데이터가 정상적으로 출력

// test myisam
// delete > insert 문 순차 실행시
// delete 문에서 idx 900 ~ 1000 데이터를 삭제하고
// insert 문에서 idx 900 ~ 1000 데이터를 삽입하면
// idx 1 ~ 100 이 정상적으로 새로운 데이터로 변경되어야함
// select 시 idx 900 ~ 1000 데이터가 정상적으로 출력


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
            detail: ''
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
