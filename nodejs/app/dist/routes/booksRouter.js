"use strict";

var express = require('express');

var router = express.Router();

var booksCtrl = require('../model/books.controller');

var SomeModel = require('../model/someModel');

var db = require('../nodeApi/mongooseConnect.js');

db(); //router.get('/', booksCtrl.list);

router.post('/', booksCtrl.create); //router.delete('/', booksCtrl.delete);
//router.put('/', booksCtrl.replace);

router.post('/test/find', function (req, res) {
  SomeModel.find({}).then(function (someModel) {
    if (!someModel.length) return res.status(404).send({
      err: 'not found'
    });
    var map = {
      data: someModel,
      msg: ''
    };
    map.msg = 'find successful';
    res.send(JSON.stringify(map));
  })["catch"](function (err) {
    return res.status(500).send(err);
  });
});
router.post('/test/insert', function (req, res) {
  awesome_instance = new SomeModel({
    name: 'awesome'
  });
  awesome_instance.save(function (err) {
    if (err) {
      console.log(err);
      return "error";
    }

    console.log('saved!');
  });
});
module.exports = router;