const db = require('../nodeApi/mysqlConnect.js');
const test_table = 'post';

exports.addPost = function(req, res) {
    if (typeof req === 'undefined') {
        var error_msg = 'end value is undefined';
        res.send(error_msg);
        return false;
    }

    var result = { success: false, data:"" };
    var title = req.query.title;
    var user_id = req.query.user_id;
    var contents = req.query.contents;

    var insert_values = ` VALUES ('${title}', '${contents}', ${user_id})`;
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