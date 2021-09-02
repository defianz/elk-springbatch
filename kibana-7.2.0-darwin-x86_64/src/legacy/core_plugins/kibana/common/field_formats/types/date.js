"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDateFormat = createDateFormat;

var _lodash = _interopRequireDefault(require("lodash"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createDateFormat(FieldFormat) {
  var _class, _temp;

  return _temp = _class = class DateFormat extends FieldFormat {
    constructor(params, getConfig) {
      super(params);
      this.getConfig = getConfig;
    }

    getParamDefaults() {
      return {
        pattern: this.getConfig('dateFormat'),
        timezone: this.getConfig('dateFormat:tz')
      };
    }

    _convert(val) {
      // don't give away our ref to converter so
      // we can hot-swap when config changes
      const pattern = this.param('pattern');
      const timezone = this.param('timezone');
      const timezoneChanged = this._timeZone !== timezone;
      const datePatternChanged = this._memoizedPattern !== pattern;

      if (timezoneChanged || datePatternChanged) {
        this._timeZone = timezone;
        this._memoizedPattern = pattern;
        this._memoizedConverter = _lodash.default.memoize(function converter(val) {
          if (val === null || val === undefined) {
            return '-';
          }

          const date = (0, _moment.default)(val);

          if (date.isValid()) {
            return date.format(pattern);
          } else {
            return val;
          }
        });
      }

      return this._memoizedConverter(val);
    }

  }, _defineProperty(_class, "id", 'date'), _defineProperty(_class, "title", 'Date'), _defineProperty(_class, "fieldType", 'date'), _temp;
}