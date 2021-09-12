"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var xss_filter = function xss_filter(content) {
  switch (_typeof(content)) {
    case 'string':
      return content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      break;

    case 'object':
      if (Array.isArray(content)) {
        for (var i = 0; i < content.length; i++) {
          if (_typeof(content[i]) === 'object') {
            content[i] = xss_filter(content[i]);
          } else if (typeof content[i] === 'string') {
            content[i] = content[i].replace(/</g, "&lt;").replace(/>/g, "&gt;");
          }
        }

        return content;
      } else {
        return content;
      }

      break;
  }
};

module.exports = xss_filter;