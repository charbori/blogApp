var express = require('express');
const db = require('../nodeApi/mysqlConnect.js');
const crypto = require('crypto');
const base64url = require('base64url');
const secretKey = require('../env/secretKey').secretKey;
const option = require('../env/secretKey').option;
const { resourceLimits } = require('worker_threads');

module.exports = {
    /*
    param array (   string  userId : '~',
                    string  authType : 'admin | guest' )
    */
    sign: async (user) => {
        if (user.userId === undefined) {
            return false;
        }
        const expireTime = Date.now() + 1800 * 1000; // 30분
        const payloadData = {
            'exp': expireTime,
            'userId': user.userId,
            'auth': user.authType
        };

        const encodeClaim = base64url.encode(JSON.stringify(payloadData));
        console.log(encodeClaim);
        const hashData = crypto.createHmac('sha256', secretKey).update(user.userId).digest('base64');
        console.log(hashData);

        const result = encodeClaim + '.' + hashData;
        return result;
    },
    /*
    param array (   token : "aaa.bbb.ccc", 
                    claim : 'admin|guest' )
    */
    verify: async (param) => {
        var result = {
            success : false,
            msg : ''
        }
        if (param === undefined) {
            result.msg = 'N';
            return result;
        }
        // decode token
        const data = param.token.split('.');
        const decodeClaim = JSON.parse(base64url.decode(data[0]));
        console.log(decodeClaim);
        console.log(param.claim);
        const hashData = crypto.createHmac('sha256', secretKey).update(decodeClaim.userId).digest('base64');

        // check claim 현재는 admin / guest만 확인함
        // 추가되는 경우에는 db상에서 auth 테이블 생성하여 권한 관리해야함
        if (decodeClaim.auth != 'admin' && decodeClaim.auth != param.claim) {
            return result.msg = 'A';
        }

        const expireTime = Date.now();

        // success
        if (hashData === param.hashToken && expireTime <= parseInt(decodeClaim.exp)) {
            result.success = true;
            result.msg = 'S';
            return result;
        }
        result.msg = 'F';
        return result;
    }
}