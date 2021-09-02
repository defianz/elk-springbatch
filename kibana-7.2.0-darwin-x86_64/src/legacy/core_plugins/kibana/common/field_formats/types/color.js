"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createColorFormat = createColorFormat;

var _lodash = _interopRequireDefault(require("lodash"));

var _as_pretty_string = require("../../utils/as_pretty_string");

var _color_default = require("./color_default");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const convertTemplate = _lodash.default.template('<span style="<%- style %>"><%- val %></span>');

function createColorFormat(FieldFormat) {
  class ColorFormat extends FieldFormat {
    getParamDefaults() {
      return {
        fieldType: null,
        // populated by editor, see controller below
        colors: [_lodash.default.cloneDeep(_color_default.DEFAULT_COLOR)]
      };
    }

    findColorRuleForVal(val) {
      switch (this.param('fieldType')) {
        case 'string':
          return _lodash.default.findLast(this.param('colors'), colorParam => {
            return new RegExp(colorParam.regex).test(val);
          });

        case 'number':
          return _lodash.default.findLast(this.param('colors'), ({
            range
          }) => {
            if (!range) return;
            const [start, end] = range.split(':');
            return val >= Number(start) && val <= Number(end);
          });

        default:
          return null;
      }
    }

  }

  _defineProperty(ColorFormat, "id", 'color');

  _defineProperty(ColorFormat, "title", 'Color');

  _defineProperty(ColorFormat, "fieldType", ['number', 'string']);

  ColorFormat.prototype._convert = {
    html(val) {
      const color = this.findColorRuleForVal(val);
      if (!color) return _lodash.default.escape((0, _as_pretty_string.asPrettyString)(val));
      let style = '';
      if (color.text) style += `color: ${color.text};`;
      if (color.background) style += `background-color: ${color.background};`;
      return convertTemplate({
        val,
        style
      });
    }

  };
  return ColorFormat;
}