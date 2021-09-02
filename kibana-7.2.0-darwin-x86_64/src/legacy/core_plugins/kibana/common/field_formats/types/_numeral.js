"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNumeralFormat = createNumeralFormat;

var _lodash = _interopRequireDefault(require("lodash"));

var _numeral = _interopRequireDefault(require("@elastic/numeral"));

var _languages = _interopRequireDefault(require("@elastic/numeral/languages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const numeralInst = (0, _numeral.default)();

_languages.default.forEach(function (numeralLanguage) {
  _numeral.default.language(numeralLanguage.id, numeralLanguage.lang);
});

function createNumeralFormat(FieldFormat, opts) {
  class NumeralFormat extends FieldFormat {
    constructor(params, getConfig) {
      super(params);
      this.getConfig = getConfig;
    }

    getParamDefaults() {
      if (_lodash.default.has(opts, 'getParamDefaults')) {
        return opts.getParamDefaults(this.getConfig);
      }

      return {
        pattern: this.getConfig(`format:${opts.id}:defaultPattern`)
      };
    }

    _convert(val) {
      if (val === -Infinity) return '-∞';
      if (val === +Infinity) return '+∞';

      if (typeof val !== 'number') {
        val = parseFloat(val);
      }

      if (isNaN(val)) return '';

      const previousLocale = _numeral.default.language();

      const defaultLocale = this.getConfig && this.getConfig('format:number:defaultLocale') || 'en';

      _numeral.default.language(defaultLocale);

      const formatted = numeralInst.set(val).format(this.param('pattern'));

      _numeral.default.language(previousLocale);

      return opts.afterConvert ? opts.afterConvert.call(this, formatted) : formatted;
    }

  }

  _defineProperty(NumeralFormat, "id", opts.id);

  _defineProperty(NumeralFormat, "title", opts.title);

  _defineProperty(NumeralFormat, "fieldType", 'number');

  if (opts.prototype) {
    _lodash.default.assign(NumeralFormat.prototype, opts.prototype);
  }

  return NumeralFormat;
}