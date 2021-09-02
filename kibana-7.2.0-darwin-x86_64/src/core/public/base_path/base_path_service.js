"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BasePathService = void 0;

var _utils = require("../utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** @internal */
var BasePathService =
/*#__PURE__*/
function () {
  function BasePathService() {
    _classCallCheck(this, BasePathService);
  }

  _createClass(BasePathService, [{
    key: "setup",
    value: function setup(_ref) {
      var injectedMetadata = _ref.injectedMetadata;
      var basePath = injectedMetadata.getBasePath() || '';
      var basePathSetup = {
        get: function get() {
          return basePath;
        },
        addToPath: function addToPath(path) {
          return (0, _utils.modifyUrl)(path, function (parts) {
            if (!parts.hostname && parts.pathname && parts.pathname.startsWith('/')) {
              parts.pathname = "".concat(basePath).concat(parts.pathname);
            }
          });
        },
        removeFromPath: function removeFromPath(path) {
          if (!basePath) {
            return path;
          }

          if (path === basePath) {
            return '/';
          }

          if (path.startsWith(basePath + '/')) {
            return path.slice(basePath.length);
          }

          return path;
        }
      };
      return basePathSetup;
    }
  }, {
    key: "start",
    value: function start(_ref2) {
      var injectedMetadata = _ref2.injectedMetadata;
      return this.setup({
        injectedMetadata: injectedMetadata
      });
    }
  }]);

  return BasePathService;
}();

exports.BasePathService = BasePathService;