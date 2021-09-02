"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortPrefixFirst = sortPrefixFirst;

var _lodash = require("lodash");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function sortPrefixFirst(array, prefix, property) {
  if (!prefix) {
    return array;
  }

  var lowerCasePrefix = ('' + prefix).toLowerCase();
  var partitions = (0, _lodash.partition)(array, function (entry) {
    var value = ('' + (property ? entry[property] : entry)).toLowerCase();
    return value.startsWith(lowerCasePrefix);
  });
  return [].concat(_toConsumableArray(partitions[0]), _toConsumableArray(partitions[1]));
}