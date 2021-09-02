"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDateOnServerFormat = createDateOnServerFormat;

var _lodash = require("lodash");

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createDateOnServerFormat(FieldFormat) {
  var _class, _temp;

  return _temp = _class = class DateFormat extends FieldFormat {
    constructor(params, getConfig) {
      super(params);
      this.getConfig = getConfig;
      this._memoizedConverter = (0, _lodash.memoize)(val => {
        if (val == null) {
          return '-';
        }
        /* On the server, importing moment returns a new instance. Unlike on
         * the client side, it doesn't have the dateFormat:tz configuration
         * baked in.
         * We need to set the timezone manually here. The date is taken in as
         * UTC and converted into the desired timezone. */


        let date;

        if (this._timeZone === 'Browser') {
          // Assume a warning has been logged this can be unpredictable. It
          // would be too verbose to log anything here.
          date = _momentTimezone.default.utc(val);
        } else {
          date = _momentTimezone.default.utc(val).tz(this._timeZone);
        }

        if (date.isValid()) {
          return date.format(this._memoizedPattern);
        } else {
          return val;
        }
      });
    }

    getParamDefaults() {
      return {
        pattern: this.getConfig('dateFormat'),
        timezone: this.getConfig('dateFormat:tz')
      };
    }

    _convert(val) {
      // don't give away our ref to converter so we can hot-swap when config changes
      const pattern = this.param('pattern');
      const timezone = this.param('timezone');
      const timezoneChanged = this._timeZone !== timezone;
      const datePatternChanged = this._memoizedPattern !== pattern;

      if (timezoneChanged || datePatternChanged) {
        this._timeZone = timezone;
        this._memoizedPattern = pattern;
      }

      return this._memoizedConverter(val);
    }

  }, _defineProperty(_class, "id", 'date'), _defineProperty(_class, "title", 'Date'), _defineProperty(_class, "fieldType", 'date'), _temp;
}