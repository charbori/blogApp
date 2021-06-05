"use strict";

var mongo = require('mongoose');

var mongoose = mongo.connection;
mongoose.on('error', console.error.bind(console, "mongoDB connection error:"));
var todoSchema = new mongo.Schema({
  todoid: {
    type: Number,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true
  },
  completed: {
    type: String,
    "default": false
  }
}, {
  timestamps: true
});

todoSchema.statics.create = function (payload) {
  var todo = new this(payload);
  return todo.save();
};

todoSchema.statics.findAll = function () {
  return this.find({});
};

todoSchema.statics.findOneByTodoid = function (todoid) {
  return this.findOne({
    todoid: todoid
  });
};

todoSchema.statics.updateByTodoid = function (todoid, payload) {
  return this.findOneAndUpdate({
    todoid: todoid
  }, payload, {
    "new": true
  });
};

todoSchema.statics.deleteByTodoid = function (todoid) {
  return this.remove({
    todoid: todoid
  });
};

module["export"] = mongo.model('Todo', todoSchema);