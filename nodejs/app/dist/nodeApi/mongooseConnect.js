"use strict";

require('dotenv').config();

var mongoose = require('mongoose');

module.exports = function () {
  mongoose.connect('mongodb://root:mongo-db@172.16.0.13:27017/?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  mongoose.connection.on('error', console.error.bind(console, "mongoDB connection error:"));
};