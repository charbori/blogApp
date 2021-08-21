"use strict";

var _path = _interopRequireDefault(require("path"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var port = process.env.POST || 8888;

var api = require('../routes/index');

var apiBook = require('../routes/booksRouter');

var apiBoard = require('../routes/boardRouter');

var apiMenu = require('../routes/menu');

var cors = require('cors');

if (process.env.NODE_ENV === 'prod') {
  _dotenv["default"].config({
    path: _path["default"].join("env", ".env.prod")
  });
} else if (process.env.NODE_ENV === 'dev') {
  _dotenv["default"].config({
    path: _path["default"].join("env", ".env.dev")
  });
} else {
  throw new Error("process.env.NODE_ENV를 설정하지 않았습니다.");
}

app.use(cors());
app.use(bodyParser.json());
app.use('/api', api);
app.use('/book', apiBook);
app.use('/board', apiBoard);
app.use('/category', apiMenu); //app.use('/api', (req, res) => res.json({username:'bryan'}));

app.listen(port, function () {
  console.log("express is running on ".concat(port));
});
