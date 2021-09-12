"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _dotenv = _interopRequireDefault(require("dotenv"));

require("../env/env.js");

var _index = _interopRequireDefault(require("../routes/index"));

var _boardRouter = _interopRequireDefault(require("../routes/boardRouter"));

var _logsRouter = _interopRequireDefault(require("../routes/logsRouter"));

var _menu = _interopRequireDefault(require("../routes/menu"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = process.env.POST || 8888;
console.log(process.env.DB_HOST);
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use('/api', _index["default"]);
app.use('/api/board', _boardRouter["default"]);
app.use('/api/logs', _logsRouter["default"]);
app.use('/api/category', _menu["default"]);
app.listen(port, function () {
  console.log("express is running on ".concat(port));
});