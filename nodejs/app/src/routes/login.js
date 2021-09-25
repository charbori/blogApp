var express = require('express');
var router = express.Router();
const db = require('../nodeApi/mysqlConnect.js');
const jwt = require('../middleware/jwt.js');

router.get('/jwt/:userId/:authType', function(req, res) {
    var result = {
        success : false,
        msg : ''
    }
    if (req.params == undefined || req.params.userId == undefined || req.params.authType == undefined ) {
        console.log('login fail none params');
        result.msg = '로그인 정보를 입력해주세요.';
        return result;
    }
    const user_data = {
        userId : req.params.userId,
        authType : req.params.authType
    }
    const tokenData = jwt.sign(user_data);
});

router.get('/jwt/validation/:token/:claim', function(req, res) {
    console.log(req.params.token);
    const validateResult = jwt.verify(req.params);
    if (validateResult == 'N') {
        console.log('auth fail token 전송에러 다시 시도해주세요');
    } else if (validateResult == 'A') {
        console.log('auth fail token 권한이 없음');
    } else if (validateResult == 'F') {
        console.log('auth fail token이 만료되었습니다');
    }
    console.log(validateResult);
    res.send(validateResult);
});

module.exports = router;