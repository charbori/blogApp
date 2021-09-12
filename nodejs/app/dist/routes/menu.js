"use strict";

var express = require('express');

var router = express.Router();

var db = require('../nodeApi/mysqlConnect.js');

var xss_filter = require('../lib/xssFiltering.js');

var test_table = 'category';
router.get('/getCategoryDataAll', function (req, res) {
  var sql = "SELECT idx, name, type, xcode, mcode, scode, des \
                FROM category                               \
                order by type, xcode, mcode ASC";
  db.query(sql, function (error, results, fields) {
    if (error) {
      console.log(error);
      var result_data = JSON.stringify({
        success: false,
        data: ""
      });
      res.send(result_data);
    } else {
      var result_data = JSON.stringify({
        success: true,
        data: results
      });
      res.send(result_data);
    }
  });
});
router.get('/getSidebarCategoryData', function (req, res) {
  req.query.xcode = xss_filter(req.query.xcode);
  var sql = "SELECT idx, name, type    \
                 FROM category      \
                WHERE type = '2' and xcode = '" + req.query.xcode + "'";
  db.query(sql, function (error, results, fields) {
    if (error) {
      console.log(error);
      var result_data = JSON.stringify({
        success: false,
        data: ""
      });
      res.send(result_data);
    } else {
      var result_data = JSON.stringify({
        success: true,
        data: results
      });
      res.send(result_data);
    }
  });
});
router.get('/getSidebarRelatedData', function (req, res) {
  if (typeof req.query.post_type === 'undefined') {
    console.log('undefined!!');
    var result_data = JSON.stringify({
      success: false,
      data: ""
    });
    res.send(result_data);
  } else if (req.query.post_type.length < 1) {
    console.log('length fail');
    var result_data = JSON.stringify({
      success: false,
      data: ""
    });
    res.send(result_data);
  }

  req.query.post_type = xss_filter(req.query.post_type);
  var sql = "SELECT idx, title, contents,reg_date,user_id  \
                 FROM post        \
                WHERE post_type='" + req.query.post_type + "' limit 5";
  db.query(sql, function (error, results, fields) {
    if (error) {
      console.log(error);
      var result_data = JSON.stringify({
        success: false,
        data: ""
      });
      res.send(result_data);
    } else {
      var result_data = JSON.stringify({
        success: true,
        data: results
      });
      res.send(result_data);
    }
  });
});
router.get('/getSidebarRecommendData', function (req, res) {
  var now = new Date().toISOString().slice(0, 10).replace('T', ' ');
  var sql = "SELECT idx, name, des \
                 FROM post_recommend      \
                WHERE date > '" + now + "' limit 5";
  db.query(sql, function (error, results, fields) {
    if (error) {
      console.log(error);
      var result_data = JSON.stringify({
        success: false,
        data: ""
      });
      res.send(result_data);
    } else {
      var result_data = JSON.stringify({
        success: true,
        data: results
      });
      res.send(result_data);
    }
  });
});
module.exports = router;