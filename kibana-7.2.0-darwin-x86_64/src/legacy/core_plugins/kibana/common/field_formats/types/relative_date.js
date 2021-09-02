"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRelativeDateFormat = createRelativeDateFormat;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createRelativeDateFormat(FieldFormat) {
  var _class, _temp;

  return _temp = _class = class RelativeDateFormat extends FieldFormat {
    constructor(params) {
      super(params);
    }

    _convert(val) {
      if (val === null || val === undefined) {
        return '-';
      }

      const date = (0, _moment.default)(val);

      if (date.isValid()) {
        return date.fromNow();
      } else {
        return val;
      }
    }

  }, _defineProperty(_class, "id", 'relative_date'), _defineProperty(_class, "title", 'Relative Date'), _defineProperty(_class, "fieldType", 'date'), _temp;
}