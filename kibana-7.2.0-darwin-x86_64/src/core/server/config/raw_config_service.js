"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RawConfigService = void 0;

var _lodash = require("lodash");

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _typeDetect = _interopRequireDefault(require("type-detect"));

var _object_to_config_adapter = require("./object_to_config_adapter");

var _read_config = require("./read_config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @internal */
class RawConfigService {
  /**
   * The stream of configs read from the config file.
   *
   * This is the _raw_ config before any overrides are applied.
   */
  constructor(configFiles, configAdapter = rawConfig => new _object_to_config_adapter.ObjectToConfigAdapter(rawConfig)) {
    this.configFiles = configFiles;

    _defineProperty(this, "rawConfigFromFile$", new _rxjs.ReplaySubject(1));

    _defineProperty(this, "config$", void 0);

    this.config$ = this.rawConfigFromFile$.pipe((0, _operators.map)(rawConfig => {
      if ((0, _lodash.isPlainObject)(rawConfig)) {
        // TODO Make config consistent, e.g. handle dots in keys
        return configAdapter((0, _lodash.cloneDeep)(rawConfig));
      }

      throw new Error(`the raw config must be an object, got [${(0, _typeDetect.default)(rawConfig)}]`);
    }));
  }
  /**
   * Read the initial Kibana config.
   */


  loadConfig() {
    this.rawConfigFromFile$.next((0, _read_config.getConfigFromFiles)(this.configFiles));
  }

  stop() {
    this.rawConfigFromFile$.complete();
  }
  /**
   * Re-read the Kibana config.
   */


  reloadConfig() {
    this.loadConfig();
  }

  getConfig$() {
    return this.config$;
  }

}

exports.RawConfigService = RawConfigService;