"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToastsApi = void 0;

var Rx = _interopRequireWildcard(require("rxjs"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var normalizeToast = function normalizeToast(toastOrTitle) {
  if (typeof toastOrTitle === 'string') {
    return {
      title: toastOrTitle
    };
  }

  return toastOrTitle;
};
/** @public */


var ToastsApi =
/*#__PURE__*/
function () {
  function ToastsApi() {
    _classCallCheck(this, ToastsApi);

    _defineProperty(this, "toasts$", new Rx.BehaviorSubject([]));

    _defineProperty(this, "idCounter", 0);
  }

  _createClass(ToastsApi, [{
    key: "get$",
    value: function get$() {
      return this.toasts$.asObservable();
    }
  }, {
    key: "add",
    value: function add(toastOrTitle) {
      var toast = _objectSpread({
        id: String(this.idCounter++)
      }, normalizeToast(toastOrTitle));

      this.toasts$.next([].concat(_toConsumableArray(this.toasts$.getValue()), [toast]));
      return toast;
    }
  }, {
    key: "remove",
    value: function remove(toast) {
      var list = this.toasts$.getValue();
      var listWithoutToast = list.filter(function (t) {
        return t !== toast;
      });

      if (listWithoutToast.length !== list.length) {
        this.toasts$.next(listWithoutToast);
      }
    }
  }, {
    key: "addSuccess",
    value: function addSuccess(toastOrTitle) {
      return this.add(_objectSpread({
        color: 'success',
        iconType: 'check'
      }, normalizeToast(toastOrTitle)));
    }
  }, {
    key: "addWarning",
    value: function addWarning(toastOrTitle) {
      return this.add(_objectSpread({
        color: 'warning',
        iconType: 'help'
      }, normalizeToast(toastOrTitle)));
    }
  }, {
    key: "addDanger",
    value: function addDanger(toastOrTitle) {
      return this.add(_objectSpread({
        color: 'danger',
        iconType: 'alert'
      }, normalizeToast(toastOrTitle)));
    }
  }]);

  return ToastsApi;
}();

exports.ToastsApi = ToastsApi;