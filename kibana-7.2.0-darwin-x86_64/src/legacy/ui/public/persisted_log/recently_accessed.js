"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recentlyAccessed = void 0;

var _chrome = _interopRequireDefault(require("ui/chrome"));

var _ = require("./");

var _create_log_key = require("./create_log_key");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RecentlyAccessed =
/*#__PURE__*/
function () {
  function RecentlyAccessed() {
    _classCallCheck(this, RecentlyAccessed);

    _defineProperty(this, "history", void 0);

    var logKey = (0, _create_log_key.createLogKey)('recentlyAccessed', _chrome.default.getBasePath());
    this.history = new _.PersistedLog(logKey, {
      maxLength: 20,
      filterDuplicates: true,
      isDuplicate: function isDuplicate(oldItem, newItem) {
        return oldItem.id === newItem.id;
      }
    });
  }

  _createClass(RecentlyAccessed, [{
    key: "add",
    value: function add(link, label, id) {
      this.history.add({
        link: link,
        label: label,
        id: id
      });
    }
  }, {
    key: "get",
    value: function get() {
      return this.history.get();
    }
  }, {
    key: "get$",
    value: function get$() {
      return this.history.get$();
    }
  }]);

  return RecentlyAccessed;
}();

var recentlyAccessed = new RecentlyAccessed();
exports.recentlyAccessed = recentlyAccessed;