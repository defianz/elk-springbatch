"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Storage = void 0;

var _angular = _interopRequireDefault(require("angular"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Storage = function Storage(store) {
  var _this = this;

  _classCallCheck(this, Storage);

  _defineProperty(this, "store", void 0);

  _defineProperty(this, "get", function (key) {
    if (!_this.store) {
      return null;
    }

    var storageItem = _this.store.getItem(key);

    if (storageItem === null) {
      return null;
    }

    try {
      return JSON.parse(storageItem);
    } catch (error) {
      return null;
    }
  });

  _defineProperty(this, "set", function (key, value) {
    try {
      return _this.store.setItem(key, _angular.default.toJson(value));
    } catch (e) {
      return false;
    }
  });

  _defineProperty(this, "remove", function (key) {
    return _this.store.removeItem(key);
  });

  _defineProperty(this, "clear", function () {
    return _this.store.clear();
  });

  this.store = store;
};

exports.Storage = Storage;