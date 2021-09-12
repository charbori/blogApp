"use strict";

var express = require('express');

var router = express.Router();

var db = require('../nodeApi/mysqlConnect.js');

router.get('/', function (req, res) {
  res.send('content');
});
module.exports = router;