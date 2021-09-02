"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersistedLog = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var Rx = _interopRequireWildcard(require("rxjs"));

var _operators = require("rxjs/operators");

var _storage = require("ui/storage");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var localStorage = new _storage.Storage(window.localStorage);

var defaultIsDuplicate = function defaultIsDuplicate(oldItem, newItem) {
  return _lodash.default.isEqual(oldItem, newItem);
};

var PersistedLog =
/*#__PURE__*/
function () {
  function PersistedLog(name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var storage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage;

    _classCallCheck(this, PersistedLog);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "maxLength", void 0);

    _defineProperty(this, "filterDuplicates", void 0);

    _defineProperty(this, "isDuplicate", void 0);

    _defineProperty(this, "storage", void 0);

    _defineProperty(this, "items", void 0);

    _defineProperty(this, "update$", new Rx.BehaviorSubject(undefined));

    this.name = name;
    this.maxLength = typeof options.maxLength === 'string' ? this.maxLength = parseInt(options.maxLength, 10) : options.maxLength;
    this.filterDuplicates = options.filterDuplicates || false;
    this.isDuplicate = options.isDuplicate || defaultIsDuplicate;
    this.storage = storage;
    this.items = this.storage.get(this.name) || [];

    if (this.maxLength !== undefined && !isNaN(this.maxLength)) {
      this.items = _lodash.default.take(this.items, this.maxLength);
    }
  }

  _createClass(PersistedLog, [{
    key: "add",
    value: function add(val) {
      var _this = this;

      if (val == null) {
        return this.items;
      } // remove any matching items from the stack if option is set


      if (this.filterDuplicates) {
        _lodash.default.remove(this.items, function (item) {
          return _this.isDuplicate(item, val);
        });
      }

      this.items.unshift(val); // if maxLength is set, truncate the stack

      if (this.maxLength && !isNaN(this.maxLength)) {
        this.items = _lodash.default.take(this.items, this.maxLength);
      } // persist the stack


      this.storage.set(this.name, this.items);
      this.update$.next(undefined);
      return this.items;
    }
  }, {
    key: "get",
    value: function get() {
      return _lodash.default.cloneDeep(this.items);
    }
  }, {
    key: "get$",
    value: function get$() {
      var _this2 = this;

      return this.update$.pipe((0, _operators.map)(function () {
        return _this2.get();
      }));
    }
  }]);

  return PersistedLog;
}();

exports.PersistedLog = PersistedLog;