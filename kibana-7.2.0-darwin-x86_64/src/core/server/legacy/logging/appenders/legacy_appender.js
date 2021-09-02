"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LegacyAppender = void 0;

var _configSchema = require("@kbn/config-schema");

var _legacy_logging_server = require("../legacy_logging_server");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Simple appender that just forwards `LogRecord` to the legacy KbnServer log.
 * @internal
 */
class LegacyAppender {
  constructor(legacyLoggingConfig) {
    _defineProperty(this, "loggingServer", void 0);

    this.loggingServer = new _legacy_logging_server.LegacyLoggingServer(legacyLoggingConfig);
  }
  /**
   * Forwards `LogRecord` to the legacy platform that will layout and
   * write record to the configured destination.
   * @param record `LogRecord` instance to forward to.
   */


  append(record) {
    this.loggingServer.log(record);
  }

  dispose() {
    this.loggingServer.stop();
  }

}

exports.LegacyAppender = LegacyAppender;

_defineProperty(LegacyAppender, "configSchema", _configSchema.schema.object({
  kind: _configSchema.schema.literal('legacy-appender'),
  legacyLoggingConfig: _configSchema.schema.any()
}));