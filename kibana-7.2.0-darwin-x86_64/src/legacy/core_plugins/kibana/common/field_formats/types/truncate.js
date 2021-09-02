"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTruncateFormat = createTruncateFormat;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const omission = '...';

function createTruncateFormat(FieldFormat) {
  var _class, _temp;

  return _temp = _class = class TruncateFormat extends FieldFormat {
    _convert(val) {
      const length = this.param('fieldLength');

      if (length > 0) {
        return _lodash.default.trunc(val, {
          'length': length + omission.length,
          'omission': omission
        });
      }

      return val;
    }

  }, _defineProperty(_class, "id", 'truncate'), _defineProperty(_class, "title", 'Truncated String'), _defineProperty(_class, "fieldType", ['string']), _temp;
}