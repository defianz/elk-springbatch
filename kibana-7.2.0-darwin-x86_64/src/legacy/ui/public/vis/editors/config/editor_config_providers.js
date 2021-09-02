"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditorConfigProviderRegistry = exports.editorConfigProviders = void 0;

var _math = require("../../../utils/math");

var _parse_es_interval = require("../../../utils/parse_es_interval");

var _least_common_interval = require("../../lib/least_common_interval");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EditorConfigProviderRegistry =
/*#__PURE__*/
function () {
  function EditorConfigProviderRegistry() {
    _classCallCheck(this, EditorConfigProviderRegistry);

    _defineProperty(this, "providers", new Set());
  }

  _createClass(EditorConfigProviderRegistry, [{
    key: "register",
    value: function register(configProvider) {
      this.providers.add(configProvider);
    }
  }, {
    key: "getConfigForAgg",
    value: function getConfigForAgg(aggType, indexPattern, aggConfig) {
      var configs = Array.from(this.providers).map(function (provider) {
        return provider(aggType, indexPattern, aggConfig);
      });
      return this.mergeConfigs(configs);
    }
  }, {
    key: "isTimeBaseParam",
    value: function isTimeBaseParam(config) {
      return config.hasOwnProperty('default') && config.hasOwnProperty('timeBase');
    }
  }, {
    key: "isBaseParam",
    value: function isBaseParam(config) {
      return config.hasOwnProperty('base');
    }
  }, {
    key: "isFixedParam",
    value: function isFixedParam(config) {
      return config.hasOwnProperty('fixedValue');
    }
  }, {
    key: "mergeHidden",
    value: function mergeHidden(current, merged) {
      return Boolean(current.hidden || merged.hidden);
    }
  }, {
    key: "mergeHelp",
    value: function mergeHelp(current, merged) {
      if (!current.help) {
        return merged.help;
      }

      return merged.help ? "".concat(merged.help, "\n\n").concat(current.help) : current.help;
    }
  }, {
    key: "mergeFixedAndBase",
    value: function mergeFixedAndBase(current, merged, paramName) {
      if (this.isFixedParam(current) && this.isFixedParam(merged) && current.fixedValue !== merged.fixedValue) {
        // In case multiple configurations provided a fixedValue, these must all be the same.
        // If not we'll throw an error.
        throw new Error("Two EditorConfigProviders provided different fixed values for field ".concat(paramName, ":\n          ").concat(merged.fixedValue, " !== ").concat(current.fixedValue));
      }

      if (this.isFixedParam(current) && this.isBaseParam(merged) || this.isBaseParam(current) && this.isFixedParam(merged)) {
        // In case one config tries to set a fixed value and another setting a base value,
        // we'll throw an error. This could be solved more elegantly, by allowing fixedValues
        // that are the multiple of the specific base value, but since there is no use-case for that
        // right now, this isn't implemented.
        throw new Error("Tried to provide a fixedValue and a base for param ".concat(paramName, "."));
      }

      if (this.isBaseParam(current) && this.isBaseParam(merged)) {
        // In case where both had interval values, just use the least common multiple between both interval
        return {
          base: (0, _math.leastCommonMultiple)(current.base, merged.base)
        };
      } // In this case we haven't had a fixed value of base for that param yet, we use the one specified
      // in the current config


      if (this.isFixedParam(current)) {
        return {
          fixedValue: current.fixedValue
        };
      }

      if (this.isBaseParam(current)) {
        return {
          base: current.base
        };
      }

      return {};
    }
  }, {
    key: "mergeTimeBase",
    value: function mergeTimeBase(current, merged, paramName) {
      if (current.default !== current.timeBase) {
        throw new Error("Tried to provide differing default and timeBase values for ".concat(paramName, "."));
      }

      if (this.isTimeBaseParam(current) && this.isTimeBaseParam(merged)) {
        // In case both had where interval values, just use the least common multiple between both intervals
        try {
          var _timeBase = (0, _least_common_interval.leastCommonInterval)(current.timeBase, merged.timeBase);

          return {
            default: _timeBase,
            timeBase: _timeBase
          };
        } catch (e) {
          throw e;
        }
      }

      if (this.isTimeBaseParam(current)) {
        try {
          (0, _parse_es_interval.parseEsInterval)(current.timeBase);
          return {
            default: current.timeBase,
            timeBase: current.timeBase
          };
        } catch (e) {
          throw e;
        }
      }

      return {};
    }
  }, {
    key: "mergeConfigs",
    value: function mergeConfigs(configs) {
      var _this = this;

      return configs.reduce(function (output, conf) {
        Object.entries(conf).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              paramName = _ref2[0],
              paramConfig = _ref2[1];

          if (!output[paramName]) {
            output[paramName] = {};
          }

          output[paramName] = _objectSpread({
            hidden: _this.mergeHidden(paramConfig, output[paramName]),
            help: _this.mergeHelp(paramConfig, output[paramName])
          }, _this.isTimeBaseParam(paramConfig) ? _this.mergeTimeBase(paramConfig, output[paramName], paramName) : _this.mergeFixedAndBase(paramConfig, output[paramName], paramName));
        });
        return output;
      }, {});
    }
  }]);

  return EditorConfigProviderRegistry;
}();

exports.EditorConfigProviderRegistry = EditorConfigProviderRegistry;
var editorConfigProviders = new EditorConfigProviderRegistry();
exports.editorConfigProviders = editorConfigProviders;