"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toUser = toUser;

var _angular = _interopRequireDefault(require("angular"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Take text from the model and present it to the user as a string
 * @param {text} model value
 * @returns {string}
 */
function toUser(text) {
  if (text == null) {
    return '';
  }

  if (_typeof(text) === 'object') {
    if (text.match_all) {
      return '';
    }

    if (text.query_string) {
      return toUser(text.query_string.query);
    }

    return _angular.default.toJson(text);
  }

  return '' + text;
}