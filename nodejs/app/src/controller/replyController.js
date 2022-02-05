const { logger } = require('../config/winston.js');
const db = require('../nodeApi/mysqlConnect.js');
const test_table = 'post';
const { encode, decode } = require('html-entities');
const { now } = require('underscore');

var result = {
    success: false,
    msg:"" 
};

exports.addReply = function(req, res) {
    if (req.body == undefined || false === Object.keys(req.body).includes('post_id') || false === Object.keys(req.body).includes('contents') || req.body.contents.length == 0) {
        result.msg = 'data is null';
        res.send(result);
        return false;
    }
    
    var sql = "";
    var post_idx = req.body.post_id;
    var contents = req.body.contents;
    var user_id = (false === Object.keys(req.body).includes('user_id') || req.body.user_id == '') ? '##GUEST' : req.body.user_id;
    var reply_type = req.body.reply_type;
    var ip_addr = (false === Object.keys(req.body).includes('ip_addr') || req.body.ip_addr == '') ? '0.0.0.0' : req.body.ip_addr;

    sql =   "INSERT INTO reply(user_id, post_id, type, reply_contents, reply_date, state, ip_addr) \
            VALUES ('" + user_id + "',      \
                    '" + post_idx + "',     \
                    '" + reply_type + "',   \
                    '" + contents + "',     \
                    now(),                  \
                    '0',                    \
                    '" + ip_addr + "')";

    db.query(sql, function (error, results, fields) {
        if (error) {
            console.log(error);
            result.msg = 'query error';
            result.success = false;
            res.send(JSON.stringify(result));
        } else {
            result.success = true;
            res.send(JSON.stringify(result));
        }
    });
}

exports.delReply = function(req, res) {
    console.log(sql);
    if (req.body == undefined || false === Object.keys(req.body).includes('reply_id')) {
        result.msg = 'reply data is false';
        res.send(result);
        return false;
    }
    if (false === Object.keys(req.body).includes('post_id') || req.body.post_id.length == 0) {
        result.msg = 'reply data is false';
        res.send(result);
        return false;
    }

    var sql = '';
    const post_id = req.body.post_id;
    const reply_id = req.body.reply_id;

    sql =  "DELETE  FROM reply                          \
             WHERE  post_id='" + post_id + "'           \
               AND  reply_id='" + reply_id + "'";
    
    db.query(sql, function (error, results, fields) {
        if (error) {
            console.log(error);
        } else {
            result.success = true;
            res.send(JSON.stringify(results));
        }
    });
}

exports.modReply = function(req, res) {
    console.log (req.body);
    if (req.body == undefined || false === Object.keys(req.body).includes('post_id') || false === Object.keys(req.body).includes('contents') || req.body.contents.length == 0) {
        result.msg = 'data is null';
        res.send(result);
        return false;
    }
    if (req.body == undefined || false === Object.keys(req.body).includes('reply_id')) {
        result.msg = 'reply data is false';
        res.send(result);
        return false;
    }

    var sql = "";
    var post_idx = req.body.post_id;
    var contents = req.body.contents;
    var reply_id = req.body.reply_id;

    sql =   "UPDATE reply \
                SET reply_contents = '" + contents + "' \
              WHERE reply_id='" + reply_id + "'         \
                AND post_id='" + post_idx + "'";

    db.query(sql, function (error, results, fields) {
        if (error) {
            console.log(error);
            result.msg = 'query error';
            result.success = false;
            res.send(JSON.stringify(result));
        } else {
            result.success = true;
            res.send(JSON.stringify(result));
        }
    });
}

exports.getReply = function(req, res) {
    if (req.query == undefined || false === Object.keys(req.query).includes('post_id') || req.query.post_id.length == 0) {
        result.msg = 'post idx is null';
        res.send(result);
        return false;
    }

    var sql = "";
    var post_idx = req.query.post_id;
    var params = '*';

    if (Object.keys(req.query).includes('type') && req.query.type == 'count') {
        params = 'count(*) AS cnt';
    }

    sql = "SELECT " + params + "            \
            FROM reply                      \
           WHERE post_id='" + post_idx + "'";

    db.query(sql, function (error, results, fields) {
        if (error) {
            console.log(error);
        } else {
            result.success = true;
            res.send(JSON.stringify(results));
        }
    });
} 