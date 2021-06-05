"use strict";

var mongo = require('mongoose');

var Schema = mongo.Schema;
var SomeModelSchema = new Schema({
  name: String
});
module.exports = mongo.model('SomeModel', SomeModelSchema);