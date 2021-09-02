"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueryBarService = void 0;

var _lodash = require("lodash");

var _query_bar = require("./components/query_bar");

var _from_user = require("./lib/from_user");

var _to_user = require("./lib/to_user");

var _directive = require("./directive");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Query Bar Service
 *
 * @internal
 */
var QueryBarService =
/*#__PURE__*/
function () {
  function QueryBarService() {
    _classCallCheck(this, QueryBarService);
  }

  _createClass(QueryBarService, [{
    key: "setup",
    value: function setup() {
      return {
        loadLegacyDirectives: (0, _lodash.once)(_directive.setupDirective),
        helpers: {
          fromUser: _from_user.fromUser,
          toUser: _to_user.toUser
        },
        ui: {
          QueryBar: _query_bar.QueryBar
        }
      };
    }
  }, {
    key: "stop",
    value: function stop() {// nothing to do here yet
    }
  }]);

  return QueryBarService;
}();
/** @public */


exports.QueryBarService = QueryBarService;