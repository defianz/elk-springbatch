"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBoolFormat = createBoolFormat;

var _as_pretty_string = require("../../utils/as_pretty_string");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createBoolFormat(FieldFormat) {
  var _class, _temp;

  return _temp = _class = class BoolFormat extends FieldFormat {
    _convert(value) {
      if (typeof value === 'string') {
        value = value.trim().toLowerCase();
      }

      switch (value) {
        case false:
        case 0:
        case 'false':
        case 'no':
          return 'false';

        case true:
        case 1:
        case 'true':
        case 'yes':
          return 'true';

        default:
          return (0, _as_pretty_string.asPrettyString)(value);
      }
    }

  }, _defineProperty(_class, "id", 'boolean'), _defineProperty(_class, "title", 'Boolean'), _defineProperty(_class, "fieldType", ['boolean', 'number', 'string']), _temp;
}