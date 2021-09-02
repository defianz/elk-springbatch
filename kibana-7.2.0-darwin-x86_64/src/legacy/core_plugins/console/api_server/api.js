"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Api {
  constructor(name) {
    _defineProperty(this, "addGlobalAutocompleteRules", function (parentNode, rules) {
      this.globalRules[parentNode] = rules;
    });

    this.globalRules = {};
    this.endpoints = {};
    this.name = name;
  }

  addEndpointDescription(endpoint, description = {}) {
    let copiedDescription = {};

    if (this.endpoints[endpoint]) {
      copiedDescription = { ...this.endpoints[endpoint]
      };
    }

    let urlParamsDef;

    _lodash.default.each(description.patterns || [], function (p) {
      if (p.indexOf('{indices}') >= 0) {
        urlParamsDef = urlParamsDef || {};
        urlParamsDef.ignore_unavailable = '__flag__';
        urlParamsDef.allow_no_indices = '__flag__';
        urlParamsDef.expand_wildcards = ['open', 'closed'];
      }
    });

    if (urlParamsDef) {
      description.url_params = _lodash.default.extend(description.url_params || {}, copiedDescription.url_params);

      _lodash.default.defaults(description.url_params, urlParamsDef);
    }

    _lodash.default.extend(copiedDescription, description);

    _lodash.default.defaults(copiedDescription, {
      id: endpoint,
      patterns: [endpoint],
      methods: ['GET']
    });

    this.endpoints[endpoint] = copiedDescription;
  }

  asJson() {
    return {
      'name': this.name,
      'globals': this.globalRules,
      'endpoints': this.endpoints
    };
  }

}

var _default = Api;
exports.default = _default;
module.exports = exports.default;