"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "IndexPattern", {
  enumerable: true,
  get: function get() {
    return _index_patterns.IndexPattern;
  }
});
Object.defineProperty(exports, "StaticIndexPattern", {
  enumerable: true,
  get: function get() {
    return _index_patterns.StaticIndexPattern;
  }
});
Object.defineProperty(exports, "StaticIndexPatternField", {
  enumerable: true,
  get: function get() {
    return _index_patterns.StaticIndexPatternField;
  }
});
Object.defineProperty(exports, "Field", {
  enumerable: true,
  get: function get() {
    return _index_patterns.Field;
  }
});
exports.data = void 0;

var _search_bar = require("./search_bar");

var _query_bar = require("./query_bar");

var _index_patterns = require("./index_patterns");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DataPlugin =
/*#__PURE__*/
function () {
  function DataPlugin() {
    _classCallCheck(this, DataPlugin);

    _defineProperty(this, "indexPatterns", void 0);

    _defineProperty(this, "searchBar", void 0);

    _defineProperty(this, "queryBar", void 0);

    this.indexPatterns = new _index_patterns.IndexPatternsService();
    this.queryBar = new _query_bar.QueryBarService();
    this.searchBar = new _search_bar.SearchBarService();
  }

  _createClass(DataPlugin, [{
    key: "setup",
    value: function setup() {
      return {
        indexPatterns: this.indexPatterns.setup(),
        search: this.searchBar.setup(),
        query: this.queryBar.setup()
      };
    }
  }, {
    key: "stop",
    value: function stop() {
      this.indexPatterns.stop();
      this.searchBar.stop();
      this.queryBar.stop();
    }
  }]);

  return DataPlugin;
}();
/**
 * We export data here so that users importing from 'plugins/data'
 * will automatically receive the response value of the `setup` contract, mimicking
 * the data that will eventually be injected by the new platform.
 */


var data = new DataPlugin().setup();
/** @public */

exports.data = data;