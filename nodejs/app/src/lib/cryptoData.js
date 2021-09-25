var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const base64url = require('base64url');
const secretKey = require('../env/secretKey').secretKey;

module.exports = {
    getEncryptData: async (data) => {
        if (data === undefined) {
            return false;
        }
        return crypto.createHmac('sha256', secretKey).update(data).digest('base64');
    }
}