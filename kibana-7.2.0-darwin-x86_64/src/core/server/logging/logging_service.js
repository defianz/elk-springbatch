"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoggingService = void 0;

var _appenders = require("./appenders/appenders");

var _buffer_appender = require("./appenders/buffer/buffer_appender");

var _log_level = require("./log_level");

var _logger = require("./logger");

var _logger_adapter = require("./logger_adapter");

var _logging_config = require("./logging_config");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Service that is responsible for maintaining loggers and logger appenders.
 * @internal
 */
class LoggingService {
  constructor() {
    _defineProperty(this, "config", void 0);

    _defineProperty(this, "appenders", new Map());

    _defineProperty(this, "bufferAppender", new _buffer_appender.BufferAppender());

    _defineProperty(this, "loggers", new Map());
  }

  get(...contextParts) {
    const context = _logging_config.LoggingConfig.getLoggerContext(contextParts);

    if (this.loggers.has(context)) {
      return this.loggers.get(context);
    }

    this.loggers.set(context, new _logger_adapter.LoggerAdapter(this.createLogger(context, this.config)));
    return this.loggers.get(context);
  }
  /**
   * Safe wrapper that allows passing logging service as immutable LoggerFactory.
   */


  asLoggerFactory() {
    return {
      get: (...contextParts) => this.get(...contextParts)
    };
  }
  /**
   * Updates all current active loggers with the new config values.
   * @param config New config instance.
   */


  upgrade(rawConfig) {
    const config = new _logging_config.LoggingConfig(rawConfig); // Config update is asynchronous and may require some time to complete, so we should invalidate
    // config so that new loggers will be using BufferAppender until newly configured appenders are ready.

    this.config = undefined; // Appenders must be reset, so we first dispose of the current ones, then
    // build up a new set of appenders.

    for (const appender of this.appenders.values()) {
      appender.dispose();
    }

    this.appenders.clear();

    for (const [appenderKey, appenderConfig] of config.appenders) {
      this.appenders.set(appenderKey, _appenders.Appenders.create(appenderConfig));
    }

    for (const [loggerKey, loggerAdapter] of this.loggers) {
      loggerAdapter.updateLogger(this.createLogger(loggerKey, config));
    }

    this.config = config; // Re-log all buffered log records with newly configured appenders.

    for (const logRecord of this.bufferAppender.flush()) {
      this.get(logRecord.context).log(logRecord);
    }
  }
  /**
   * Disposes all loggers (closes log files, clears buffers etc.). Service is not usable after
   * calling of this method until new config is provided via `upgrade` method.
   * @returns Promise that is resolved once all loggers are successfully disposed.
   */


  async stop() {
    for (const appender of this.appenders.values()) {
      await appender.dispose();
    }

    await this.bufferAppender.dispose();
    this.appenders.clear();
    this.loggers.clear();
  }

  createLogger(context, config) {
    if (config === undefined) {
      // If we don't have config yet, use `buffered` appender that will store all logged messages in the memory
      // until the config is ready.
      return new _logger.BaseLogger(context, _log_level.LogLevel.All, [this.bufferAppender]);
    }

    const {
      level,
      appenders
    } = this.getLoggerConfigByContext(config, context);

    const loggerLevel = _log_level.LogLevel.fromId(level);

    const loggerAppenders = appenders.map(appenderKey => this.appenders.get(appenderKey));
    return new _logger.BaseLogger(context, loggerLevel, loggerAppenders);
  }

  getLoggerConfigByContext(config, context) {
    const loggerConfig = config.loggers.get(context);

    if (loggerConfig !== undefined) {
      return loggerConfig;
    } // If we don't have configuration for the specified context and it's the "nested" one (eg. `foo.bar.baz`),
    // let's move up to the parent context (eg. `foo.bar`) and check if it has config we can rely on. Otherwise
    // we fallback to the `root` context that should always be defined (enforced by configuration schema).


    return this.getLoggerConfigByContext(config, _logging_config.LoggingConfig.getParentLoggerContext(context));
  }

}

exports.LoggingService = LoggingService;