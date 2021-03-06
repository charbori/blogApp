const { logger } = require('../config/winston.js');
const db = require('../nodeApi/mysqlConnect.js');
const test_table = 'post';
const { encode, decode } = require('html-entities');

exports.addPost = function(req, res) {
    var result = {
        success: false,
        msg:"" 
    };
    
    if (typeof req === 'undefined') {
        result.msg = 'req is undefined'
        res.send(result);
        return false;
    }

    if (req.method != 'GET' && req.method != 'PUT') {
        result.msg = 'method is undefined'
        res.send(result);
        return false;
    }

    var title = '';
    var user_id = '';
    var contents = '';

    if (req.method == 'GET') {
        title = req.query.title;
        user_id = req.query.user_id;
        contents = encode(req.query.contents);
    } else if (req.method == 'PUT') {
        title = req.body.title;
        user_id = req.body.user_id;
        contents = encode(req.body.contents);
    }

    if (!user_id) { // javascript "", null, undefined, 0, NaN => false 리턴함
        result.msg = 'value is undefined'
        res.send(result);
        logger.info('##게시글 등록오류 #user_id 없음 error:' + user_id);
        return false;
    }

    var insert_values = ` VALUES ('${title}', '${contents}', '${user_id}')`;
    var sql = "INSERT INTO " + test_table + "(`title`, `contents`, `user_id`)" + insert_values;

    return new Promise((resolve, reject) => {
        db.query(sql, function (error, results, fields) {
            if (error) {
                console.log(error);
                reject(result);
            } else {
                result.success = true;
                res.send(JSON.stringify(result));
                resolve(result);
            }
        });
    });
}

exports.delPost = function(req, res) {
    var result = {
        success: false,
        msg:""
    };
    
    if (typeof req === 'undefined') {
        result.msg = 'req is undefined'
        res.send(result);
        return false;
    }

    if (req.method != 'POST') {
        result.msg = 'method is not match'
        res.send(result);
        return false;
    }

    const post_id = req.body.post_idx;
    const user_id = req.body.user_id;
    
    if (!user_id || !post_id) { // javascript "", null, undefined, 0, NaN => false 리턴함
        result.msg = 'value is undefined'
        res.send(result);
        logger.info('##게시글 등록오류 #user_id 없음 error:' + user_id);
        return false;
    }

    const sql =   "delete from post where idx = '" + post_id + "'";

    return new Promise((resolve, reject) => {
        db.query(sql, function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send(JSON.stringify(result));
            } else {
                result.success = true;
                res.send(JSON.stringify(result));
            }
        });
    });
}

exports.updPost = function(req, res) {
    var result = {
        success: false,
        msg:""
    };
    
    if (typeof req === 'undefined') {
        result.msg = 'req is undefined'
        res.send(result);
        return false;
    }

    if (req.method != 'POST') {
        result.msg = 'method is not match'
        res.send(result);
        return false;
    }

    const post_id = req.body.post_idx;
    const contents = encode(req.body.post_contents);
    
    if (!user_id) { // javascript "", null, undefined, 0, NaN => false 리턴함
        result.msg = 'value is undefined'
        res.send(result);
        logger.info('##게시글 등록오류 #user_id 없음 error:' + user_id);
        return false;
    }
    
    const sql = "update post set contents = '" + contents + "' where idx = '" + post_id + "'";
    
    return new Promise((resolve, reject) => {
        db.query(sql, function (error, results, fields) {
            if (error || results.user_id.length == 0) {
                console.log(error);
                reject(result);
            } else {
                result.success = true;
                res.send(JSON.stringify(result));
                resolve(result);
            }
        });
    });
}