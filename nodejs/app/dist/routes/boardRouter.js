"use strict";

var express = require('express');

var router = express.Router();

var db = require('../nodeApi/mysqlConnect.js');

router.get('/findUser', function (req, res) {
  db.query('select * from user', function (error, results, fields) {
    if (error) {
      console.log(error);
    }

    console.log(results);
  });
  db.end();
});
module.exports = router;