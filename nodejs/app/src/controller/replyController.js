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
    var user_id = (false === Object.keys(req.body).includes('user_id') || req.body.user_id == '') ? '' : req.body.user_id;
    var reply_type = req.body.reply_type;

    sql =   "INSERT INTO reply(user_id, post_id, type, reply_contents, reply_date, state) \
            VALUES ('" + user_id + "',      \
                    '" + post_idx + "',     \
                    '" + reply_type + "',   \
                    '" + contents + "',     \
                    now(),                  \
                    '0')";

    db.query(sql, function (error, results, fields) {
        if (error) {
            console.log(error);
        } else {
            result.success = true;
            res.send(JSON.stringify(result));
        }
    });
}

exports.delReply = function(req, res) {

}

exports.modReply = function(req, res) {
    
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