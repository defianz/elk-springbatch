"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Toast", {
  enumerable: true,
  get: function get() {
    return _public.Toast;
  }
});
Object.defineProperty(exports, "ToastInput", {
  enumerable: true,
  get: function get() {
    return _public.ToastInput;
  }
});
exports.ToastNotifications = void 0;

var _public = require("../../../../../core/public");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ToastNotifications = function ToastNotifications(toasts) {
  var _this = this;

  _classCallCheck(this, ToastNotifications);

  this.toasts = toasts;

  _defineProperty(this, "list", []);

  _defineProperty(this, "onChangeCallback", void 0);

  _defineProperty(this, "onChange", function (callback) {
    _this.onChangeCallback = callback;
  });

  _defineProperty(this, "add", function (toastOrTitle) {
    return _this.toasts.add(toastOrTitle);
  });

  _defineProperty(this, "remove", function (toast) {
    return _this.toasts.remove(toast);
  });

  _defineProperty(this, "addSuccess", function (toastOrTitle) {
    return _this.toasts.addSuccess(toastOrTitle);
  });

  _defineProperty(this, "addWarning", function (toastOrTitle) {
    return _this.toasts.addWarning(toastOrTitle);
  });

  _defineProperty(this, "addDanger", function (toastOrTitle) {
    return _this.toasts.addDanger(toastOrTitle);
  });

  toasts.get$().subscribe(function (list) {
    _this.list = list;

    if (_this.onChangeCallback) {
      _this.onChangeCallback();
    }
  });
};

exports.ToastNotifications = ToastNotifications;