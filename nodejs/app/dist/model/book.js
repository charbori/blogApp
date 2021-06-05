"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Author = new Schema({
  name: String,
  email: String
});
var Book = new Schema({
  title: String,
  authors: [Author],
  publishedDate: Date,
  price: Number,
  tags: [String],
  createdAt: {
    type: Date,
    "default": Date.now
  }
});
module.exports = mongoose.model('Book', Book);