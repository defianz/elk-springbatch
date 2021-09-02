"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiSettingsClient = void 0;

var _lodash = require("lodash");

var Rx = _interopRequireWildcard(require("rxjs"));

var _operators = require("rxjs/operators");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @public */
var UiSettingsClient =
/*#__PURE__*/
function () {
  function UiSettingsClient(params) {
    _classCallCheck(this, UiSettingsClient);

    _defineProperty(this, "update$", new Rx.Subject());

    _defineProperty(this, "saved$", new Rx.Subject());

    _defineProperty(this, "updateErrors$", new Rx.Subject());

    _defineProperty(this, "api", void 0);

    _defineProperty(this, "defaults", void 0);

    _defineProperty(this, "cache", void 0);

    this.api = params.api;
    this.defaults = (0, _lodash.cloneDeep)(params.defaults);
    this.cache = (0, _lodash.defaultsDeep)({}, this.defaults, (0, _lodash.cloneDeep)(params.initialSettings));
  }
  /**
   * Gets the metadata about all uiSettings, including the type, default value, and user value
   * for each key.
   */


  _createClass(UiSettingsClient, [{
    key: "getAll",
    value: function getAll() {
      return (0, _lodash.cloneDeep)(this.cache);
    }
    /**
     * Gets the value for a specific uiSetting. If this setting has no user-defined value
     * then the `defaultOverride` parameter is returned (and parsed if setting is of type
     * "json" or "number). If the parameter is not defined and the key is not defined by a
     * uiSettingDefaults then an error is thrown, otherwise the default is read
     * from the uiSettingDefaults.
     */

  }, {
    key: "get",
    value: function get(key, defaultOverride) {
      var declared = this.isDeclared(key);

      if (!declared && defaultOverride !== undefined) {
        return defaultOverride;
      }

      if (!declared) {
        throw new Error("Unexpected `config.get(\"".concat(key, "\")` call on unrecognized configuration setting \"").concat(key, "\".\nSetting an initial value via `config.set(\"").concat(key, "\", value)` before attempting to retrieve\nany custom setting value for \"").concat(key, "\" may fix this issue.\nYou can use `config.get(\"").concat(key, "\", defaultValue)`, which will just return\n`defaultValue` when the key is unrecognized."));
      }

      var type = this.cache[key].type;
      var userValue = this.cache[key].userValue;
      var defaultValue = defaultOverride !== undefined ? defaultOverride : this.cache[key].value;
      var value = userValue == null ? defaultValue : userValue;

      if (type === 'json') {
        return JSON.parse(value);
      }

      if (type === 'number') {
        return parseFloat(value);
      }

      return value;
    }
    /**
     * Gets an observable of the current value for a config key, and all updates to that config
     * key in the future. Providing a `defaultOverride` argument behaves the same as it does in #get()
     */

  }, {
    key: "get$",
    value: function get$(key, defaultOverride) {
      var _this = this;

      return Rx.concat(Rx.defer(function () {
        return Rx.of(_this.get(key, defaultOverride));
      }), this.update$.pipe((0, _operators.filter)(function (update) {
        return update.key === key;
      }), (0, _operators.map)(function () {
        return _this.get(key, defaultOverride);
      })));
    }
    /**
     * Sets the value for a uiSetting. If the setting is not defined in the uiSettingDefaults
     * it will be stored as a custom setting. The new value will be synchronously available via
     * the `get()` method and sent to the server in the background. If the request to the
     * server fails then a toast notification will be displayed and the setting will be
     * reverted it its value before `set()` was called.
     */

  }, {
    key: "set",
    value: function () {
      var _set = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(key, val) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.update(key, val);

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function set(_x, _x2) {
        return _set.apply(this, arguments);
      }

      return set;
    }()
    /**
     * Removes the user-defined value for a setting, causing it to revert to the default. This
     * method behaves the same as calling `set(key, null)`, including the synchronization, custom
     * setting, and error behavior of that method.
     */

  }, {
    key: "remove",
    value: function () {
      var _remove = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(key) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.update(key, null);

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function remove(_x3) {
        return _remove.apply(this, arguments);
      }

      return remove;
    }()
    /**
     * Returns true if the key is a "known" uiSetting, meaning it is either defined in the
     * uiSettingDefaults or was previously added as a custom setting via the `set()` method.
     */

  }, {
    key: "isDeclared",
    value: function isDeclared(key) {
      return key in this.cache;
    }
    /**
     * Returns true if the setting has no user-defined value or is unknown
     */

  }, {
    key: "isDefault",
    value: function isDefault(key) {
      return !this.isDeclared(key) || this.cache[key].userValue == null;
    }
    /**
     * Returns true if the setting is not a part of the uiSettingDefaults, but was either
     * added directly via `set()`, or is an unknown setting found in the uiSettings saved
     * object
     */

  }, {
    key: "isCustom",
    value: function isCustom(key) {
      return this.isDeclared(key) && !('value' in this.cache[key]);
    }
    /**
     * Returns true if a settings value is overridden by the server. When a setting is overridden
     * its value can not be changed via `set()` or `remove()`.
     */

  }, {
    key: "isOverridden",
    value: function isOverridden(key) {
      return this.isDeclared(key) && Boolean(this.cache[key].isOverridden);
    }
    /**
     * Overrides the default value for a setting in this specific browser tab. If the page
     * is reloaded the default override is lost.
     */

  }, {
    key: "overrideLocalDefault",
    value: function overrideLocalDefault(key, newDefault) {
      // capture the previous value
      var prevDefault = this.defaults[key] ? this.defaults[key].value : undefined; // update defaults map

      this.defaults[key] = _objectSpread({}, this.defaults[key] || {}, {
        value: newDefault
      }); // update cached default value

      this.cache[key] = _objectSpread({}, this.cache[key] || {}, {
        value: newDefault
      }); // don't broadcast change if userValue was already overriding the default

      if (this.cache[key].userValue == null) {
        this.update$.next({
          key: key,
          newValue: newDefault,
          oldValue: prevDefault
        });
        this.saved$.next({
          key: key,
          newValue: newDefault,
          oldValue: prevDefault
        });
      }
    }
    /**
     * Returns an Observable that notifies subscribers of each update to the uiSettings,
     * including the key, newValue, and oldValue of the setting that changed.
     */

  }, {
    key: "getUpdate$",
    value: function getUpdate$() {
      return this.update$.asObservable();
    }
    /**
     * Returns an Observable that notifies subscribers of each update to the uiSettings,
     * including the key, newValue, and oldValue of the setting that changed.
     */

  }, {
    key: "getSaved$",
    value: function getSaved$() {
      return this.saved$.asObservable();
    }
    /**
     * Returns an Observable that notifies subscribers of each error while trying to update
     * the settings, containing the actual Error class.
     */

  }, {
    key: "getUpdateErrors$",
    value: function getUpdateErrors$() {
      return this.updateErrors$.asObservable();
    }
    /**
     * Prepares the uiSettingsClient to be discarded, completing any update$ observables
     * that have been created.
     */

  }, {
    key: "stop",
    value: function stop() {
      this.update$.complete();
      this.saved$.complete();
    }
  }, {
    key: "assertUpdateAllowed",
    value: function assertUpdateAllowed(key) {
      if (this.isOverridden(key)) {
        throw new Error("Unable to update \"".concat(key, "\" because its value is overridden by the Kibana server"));
      }
    }
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(key, newVal) {
        var declared, defaults, oldVal, unchanged, initialVal, _ref, settings;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.assertUpdateAllowed(key);
                declared = this.isDeclared(key);
                defaults = this.defaults;
                oldVal = declared ? this.cache[key].userValue : undefined;
                unchanged = oldVal === newVal;

                if (!unchanged) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return", true);

              case 7:
                initialVal = declared ? this.get(key) : undefined;
                this.setLocally(key, newVal);
                _context3.prev = 9;
                _context3.next = 12;
                return this.api.batchSet(key, newVal);

              case 12:
                _ref = _context3.sent;
                settings = _ref.settings;
                this.cache = (0, _lodash.defaultsDeep)({}, defaults, settings);
                this.saved$.next({
                  key: key,
                  newValue: newVal,
                  oldValue: initialVal
                });
                return _context3.abrupt("return", true);

              case 19:
                _context3.prev = 19;
                _context3.t0 = _context3["catch"](9);
                this.setLocally(key, initialVal);
                this.updateErrors$.next(_context3.t0);
                return _context3.abrupt("return", false);

              case 24:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[9, 19]]);
      }));

      function update(_x4, _x5) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "setLocally",
    value: function setLocally(key, newValue) {
      this.assertUpdateAllowed(key);

      if (!this.isDeclared(key)) {
        this.cache[key] = {};
      }

      var oldValue = this.get(key);

      if (newValue === null) {
        delete this.cache[key].userValue;
      } else {
        var type = this.cache[key].type;

        if (type === 'json' && typeof newValue !== 'string') {
          this.cache[key].userValue = JSON.stringify(newValue);
        } else {
          this.cache[key].userValue = newValue;
        }
      }

      this.update$.next({
        key: key,
        newValue: newValue,
        oldValue: oldValue
      });
    }
  }]);

  return UiSettingsClient;
}();

exports.UiSettingsClient = UiSettingsClient;