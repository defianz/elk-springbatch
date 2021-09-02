"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSourceFormat = createSourceFormat;

var _lodash = _interopRequireDefault(require("lodash"));

var _no_white_space = require("../../utils/no_white_space");

var _shorten_dotted_string = require("../../utils/shorten_dotted_string");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const templateHtml = `
  <dl class="source truncate-by-height">
    <% defPairs.forEach(function (def) { %>
      <dt><%- def[0] %>:</dt>
      <dd><%= def[1] %></dd>
      <%= ' ' %>
    <% }); %>
  </dl>`;

const template = _lodash.default.template((0, _no_white_space.noWhiteSpace)(templateHtml));

function createSourceFormat(FieldFormat) {
  class SourceFormat extends FieldFormat {
    constructor(params, getConfig) {
      super(params);
      this.getConfig = getConfig;
    }

  }

  _defineProperty(SourceFormat, "id", '_source');

  _defineProperty(SourceFormat, "title", '_source');

  _defineProperty(SourceFormat, "fieldType", '_source');

  SourceFormat.prototype._convert = {
    text: value => JSON.stringify(value),
    html: function sourceToHtml(source, field, hit) {
      if (!field) return _lodash.default.escape(this.getConverterFor('text')(source));
      const highlights = hit && hit.highlight || {};
      const formatted = field.indexPattern.formatHit(hit);
      const highlightPairs = [];
      const sourcePairs = [];
      const isShortDots = this.getConfig('shortDots:enable');

      _lodash.default.keys(formatted).forEach(key => {
        const pairs = highlights[key] ? highlightPairs : sourcePairs;
        const field = isShortDots ? (0, _shorten_dotted_string.shortenDottedString)(key) : key;
        const val = formatted[key];
        pairs.push([field, val]);
      }, []);

      return template({
        defPairs: highlightPairs.concat(sourcePairs)
      });
    }
  };
  return SourceFormat;
}