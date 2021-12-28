var express = require('express');
var router = express.Router();
const db = require('../nodeApi/mysqlConnect.js');
const jwt = require('../middleware/jwt.js');
const cryptoLib = require('../lib/cryptoData');
const { reject } = require('underscore');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser);

var result = {
    success : false,
    msg : ''
}
// url : /api/auth/
// 로그인 체크 후 토큰 발급
router.post('/login', function(req, res) {
    if (req.body.userId == undefined || req.body.userPw == undefined || req.body.authType == undefined ) {
        result.msg = '로그인 정보를 입력해주세요.';
        return result;
    }

    (function () {
        return new Promise(function (resolve) {
            resolve(cryptoLib.getEncryptData(req.body.userPw));
        });
    })().then(function (cryptoPassword) {
        if (cryptoPassword != undefined && cryptoPassword.length > 0) {
            const sql = "select count(*) AS cnt \
            from user     \
            where id='" + req.body.userId + "' \
            and password='" + cryptoPassword + "'";
            
            db.query(sql, function(err, results, fields) {
                if (err) {
                    console.log(err);
                    result.msg = '일시적인 오류가 발생했습니다.';
                    res.send(result);
                } else {
                    if (results[0].cnt == '1') {
                        const user_data = {
                            userId : req.body.userId,
                            authType : req.body.authType
                        }
                        const tokenData = jwt.sign(user_data);
                        result.success = true;
                        result.data = tokenData;
                        result.msg = '';
                        res.cookie('chatApp_user_id', user_data.userId);
                        res.send(result);
                    } else {
                        result.msg = '아이디 패스워드를 확인해주세요.';
                        res.send(result);
                    }
                }
            });
        }
    }).catch(function(err) {
        console.error(err);
        res.send(result);
    });
   
});

//회원 중복확인
router.get('/signUp/:userId', function(req, res) {
    const sql = "select count(*) AS cnt \
                   from user     \
                  where id='" + req.params.userId + "'";
    db.query(sql, function(err, results, fields) {
        if (err) {
            console.log(err);
            result.msg = '일시적인 오류가 발생했습니다.';
            res.send(result);
        } else {
            if (results[0].cnt == 1) {
                result.msg = '아이디가 중복되었습니다.';
                res.send(result);
            } else {
                result.success = true;
                result.msg = '사용 가능한 아이디입니다.';
                res.send(result);
            }
        }
    }); 
});

//화원 가입
router.post('/signUp', function(req, res) {
    if (req.body.userId === undefined || req.body.userName === undefined || req.body.userPw === undefined) {
        result.msg = '회원 데이터를 다시 입력해주세요';
        res.send(result);
    }
    // post 아이디 중복체크
    const cryptoPassword = cryptoLib.getEncryptData(req.body.userPw);

    cryptoPassword.then((cryptoRes) => {
        if (cryptoRes.length > 0) {
            const sql = "insert into user(`id`,`name`,`password`,`reg_date`) values('" + req.body.userId + "','" + req.body.userName + "','" + cryptoRes + "',now());";

            db.query(sql, function(err, results, fields) {
                if (err) {
                    console.log(err);
                    result.msg = '일시적인 오류가 발생했습니다.';
                    res.send(result);
                } else {
                    if (results) {
                        result.msg = '회원가입 완료';
                        result.success = true;
                        res.send(result);
                    } else {
                        result.msg = '일시적인 오류가 발생했습니다.';
                        res.send(result);
                    }
                }
            });
        } else {
            result.msg = '일시적인 오류가 발생했습니다.';
            res.send(result);
        }
    });
});
// token 권한 발급
router.get('/token/:userId/:authType', function(req, res) {
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
    result.msg = tokenData;
    result.success = true;
    res.send(result);
});

// token 권한 확인
router.get('/token/validation/:token/:claim', function(req, res) {
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