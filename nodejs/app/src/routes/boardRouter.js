var express = require('express');
var router = express.Router();
const db = require('../nodeApi/mysqlConnect.js');
const boardController = require('../controller/boardController.js');
const replyController = require('../controller/replyController.js');
const { post } = require('superagent');
const { logger } = require('../config/winston.js');
const { encode, decode } = require('html-entities');
const test_table = 'post';

var result_send = {
    user_data: {
        name: '',
        id: ''
    },
    post_data: {
        idx:'',
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

router.get('/findUser', function(req, res) {
    db.query('select * from user', function (error, results, fields) {
        if (error) {
            console.log(error);
            var result_data = JSON.stringify({ success: false, data:"" });
            res.send(result_data);
        } else {
            var result_data = JSON.stringify({ success: true, data:results });
            res.send(result_data);
        }
    });
});

router.get('/post/add', boardController.addPost);

router.put('/post', boardController.addPost);

router.post('/post/del', boardController.delPost);

router.post('/post', boardController.updPost); 

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

    db.query(sql, function (error, results, fields) {
        if (error) {
            console.log(error);
            var result_data = JSON.stringify({ success: false, data:"" });
            res.send(result_data);
        } else {
            var result_data = JSON.stringify({ success: true, data:results });
            res.send(result_data);
            let today_end = new Date();
            var end_time = today_end.getHours() + "/" + today_end.getMinutes() + "/" + today_end.getSeconds() + "/" + today_end.getMilliseconds();
        }
    });
});

router.get('/post', function(req, res) {
    var add_where = "ORDER BY post.reg_date desc \
                    LIMIT 10";
    if (req.query != 'undefined' && req.query.post_idx > 0) {
        add_where = " AND post.idx = " + req.query.post_idx;
    }

    var sql =   "SELECT post.idx, \
                        post.post_like, \
                        post.post_dislike, \
                        post.hide, \
                        post.ban,  \
                        post.reg_date,  \
                        post.contents,  \
                        post.post_type,  \
                        post.comment_count,  \
                        user.name, \
                        user.id \
                   FROM post \
              LEFT JOIN user \
                     ON post.user_id = user.id \
                  WHERE post.hide='0' \
                    AND post.ban='0' \
                    AND post.contents != ''" + add_where;

    function result_post() {
        return new Promise((resolve, reject) => {
            db.query(sql, function (error, results, fields) {
                if (error) {
                    logger.error('###POST GET # result_post ????????? ?????? ??????');
                    res.send(JSON.stringify({ success: false, data: ''}));
                    resolve(false);
                } else if (results.length > 0 ) {
                    results.forEach(element => {
                        element.contents = decode(element.contents);
                    });
                    console.log(results);
                    res.send(JSON.stringify({ success: true, data:results }));
                    resolve(true);
                }
            });
        });
    }
    result_post().then(row => {
        if (row == false) {
            return;
        }
    });
});

router.post('/like', function(req, res) {
    if (req != undefined && Object.keys(req.body).includes('post_idx')) {
        var sql = '';
        if (req.body.type == 'add') {
            sql = "UPDATE post SET post_like = post_like + 1 WHERE idx=" + req.body.post_idx;
        } else if (req.body.type == 'sub') {
            sql = "UPDATE post SET post_like = post_like-1 WHERE idx=" + req.body.post_idx;
        }
        console.log (sql);
        db.query(sql, function (error, results, fields) {
            if (error) {
                logger.error('###like GET # like, dislike ????????? ?????? ??????');
                res.send(JSON.stringify({ success: false, data: ''}));
            } else {
                console.log(results);
                res.send(JSON.stringify({ success: true, data: ''}));
            }
        });
    } else {
        res.send(JSON.stringify({ success: false, data: ''}));
    }
});

// ??????
router.post('/reply/add', replyController.addReply);

router.post('/reply/mod', replyController.modReply);

router.get('/reply', replyController.getReply);

router.post('/reply/del', replyController.delReply);

module.exports = router;
