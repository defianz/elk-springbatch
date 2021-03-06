"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUrlFormat = createUrlFormat;

var _lodash = _interopRequireDefault(require("lodash"));

var _highlight_html = require("../../highlight/highlight_html");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const templateMatchRE = /{{([\s\S]+?)}}/g;
const whitelistUrlSchemes = ['http://', 'https://'];
const URL_TYPES = [{
  kind: 'a',
  text: 'Link'
}, {
  kind: 'img',
  text: 'Image'
}, {
  kind: 'audio',
  text: 'Audio'
}];
const DEFAULT_URL_TYPE = 'a';

function createUrlFormat(FieldFormat) {
  class UrlFormat extends FieldFormat {
    constructor(params) {
      super(params);
      this._compileTemplate = _lodash.default.memoize(this._compileTemplate);
    }

    getParamDefaults() {
      return {
        type: DEFAULT_URL_TYPE,
        urlTemplate: null,
        labelTemplate: null
      };
    }

    _formatLabel(value, url) {
      const template = this.param('labelTemplate');
      if (url == null) url = this._formatUrl(value);
      if (!template) return url;
      return this._compileTemplate(template)({
        value: value,
        url: url
      });
    }

    _formatUrl(value) {
      const template = this.param('urlTemplate');
      if (!template) return value;
      return this._compileTemplate(template)({
        value: encodeURIComponent(value),
        rawValue: value
      });
    }

    _compileTemplate(template) {
      const parts = template.split(templateMatchRE).map(function (part, i) {
        // trim all the odd bits, the variable names
        return i % 2 ? part.trim() : part;
      });
      return function (locals) {
        // replace all the odd bits with their local var
        let output = '';
        let i = -1;

        while (++i < parts.length) {
          if (i % 2) {
            if (locals.hasOwnProperty(parts[i])) {
              const local = locals[parts[i]];
              output += local == null ? '' : local;
            }
          } else {
            output += parts[i];
          }
        }

        return output;
      };
    }

  }

  _defineProperty(UrlFormat, "id", 'url');

  _defineProperty(UrlFormat, "title", 'Url');

  _defineProperty(UrlFormat, "fieldType", ['number', 'boolean', 'date', 'ip', 'string', 'murmur3', 'unknown', 'conflict']);

  _defineProperty(UrlFormat, "urlTypes", URL_TYPES);

  UrlFormat.prototype._convert = {
    text: function (value) {
      return this._formatLabel(value);
    },
    html: function (rawValue, field, hit, parsedUrl) {
      const url = _lodash.default.escape(this._formatUrl(rawValue));

      const label = _lodash.default.escape(this._formatLabel(rawValue, url));

      switch (this.param('type')) {
        case 'audio':
          return `<audio controls preload="none" src="${url}">`;

        case 'img':
          // If the URL hasn't been formatted to become a meaningful label then the best we can do
          // is tell screen readers where the image comes from.
          const imageLabel = label === url ? `A dynamically-specified image located at ${url}` : label;
          return `<img src="${url}" alt="${imageLabel}">`;

        default:
          const inWhitelist = whitelistUrlSchemes.some(scheme => url.indexOf(scheme) === 0);

          if (!inWhitelist && !parsedUrl) {
            return url;
          }

          let prefix = '';
          /**
           * This code attempts to convert a relative url into a kibana absolute url
           *
           * SUPPORTED:
           *  - /app/kibana/
           *  - ../app/kibana
           *  - #/discover
           *
           * UNSUPPORTED
           *  - app/kibana
           */

          if (!inWhitelist) {
            // Handles urls like: `#/discover`
            if (url[0] === '#') {
              prefix = `${parsedUrl.origin}${parsedUrl.pathname}`;
            } // Handle urls like: `/app/kibana` or `/xyz/app/kibana`
            else if (url.indexOf(parsedUrl.basePath || '/') === 0) {
                prefix = `${parsedUrl.origin}`;
              } // Handle urls like: `../app/kibana`
              else {
                  prefix = `${parsedUrl.origin}${parsedUrl.basePath}/app/`;
                }
          }

          let linkLabel;

          if (hit && hit.highlight && hit.highlight[field.name]) {
            linkLabel = (0, _highlight_html.getHighlightHtml)(label, hit.highlight[field.name]);
          } else {
            linkLabel = label;
          }

          const linkTarget = this.param('openLinkInCurrentTab') ? '_self' : '_blank';
          return `<a href="${prefix}${url}" target="${linkTarget}" rel="noopener noreferrer">${linkLabel}</a>`;
      }
    }
  };
  return UrlFormat;
}