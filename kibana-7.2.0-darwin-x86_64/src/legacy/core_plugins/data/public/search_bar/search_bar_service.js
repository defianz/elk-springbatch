"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchBarService = void 0;

var _lodash = require("lodash");

var _search_bar = require("./components/search_bar");

var _directive = require("./directive");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Search Bar Service
 * @internal
 */
var SearchBarService =
/*#__PURE__*/
function () {
  function SearchBarService() {
    _classCallCheck(this, SearchBarService);
  }

  _createClass(SearchBarService, [{
    key: "setup",
    value: function setup() {
      return {
        ui: {
          SearchBar: _search_bar.SearchBar
        },
        loadLegacyDirectives: (0, _lodash.once)(_directive.setupDirective)
      };
    }
  }, {
    key: "stop",
    value: function stop() {// nothing to do here yet
    }
  }]);

  return SearchBarService;
}();
/** @public */


exports.SearchBarService = SearchBarService;