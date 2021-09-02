"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogLevel = void 0;

var _utils = require("../../utils");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Represents the log level, manages string to `LogLevel` conversion and comparison of log level
 * priorities between themselves.
 * @internal
 */
class LogLevel {
  /**
   * Converts string representation of log level into `LogLevel` instance.
   * @param level - String representation of log level.
   * @returns Instance of `LogLevel` class.
   */
  static fromId(level) {
    switch (level) {
      case 'all':
        return LogLevel.All;

      case 'fatal':
        return LogLevel.Fatal;

      case 'error':
        return LogLevel.Error;

      case 'warn':
        return LogLevel.Warn;

      case 'info':
        return LogLevel.Info;

      case 'debug':
        return LogLevel.Debug;

      case 'trace':
        return LogLevel.Trace;

      case 'off':
        return LogLevel.Off;

      default:
        return (0, _utils.assertNever)(level);
    }
  }

  constructor(id, value) {
    this.id = id;
    this.value = value;
  }
  /**
   * Indicates whether current log level covers the one that is passed as an argument.
   * @param level - Instance of `LogLevel` to compare to.
   * @returns True if specified `level` is covered by this log level.
   */


  supports(level) {
    return this.value >= level.value;
  }

}

exports.LogLevel = LogLevel;

_defineProperty(LogLevel, "Off", new LogLevel('off', 1));

_defineProperty(LogLevel, "Fatal", new LogLevel('fatal', 2));

_defineProperty(LogLevel, "Error", new LogLevel('error', 3));

_defineProperty(LogLevel, "Warn", new LogLevel('warn', 4));

_defineProperty(LogLevel, "Info", new LogLevel('info', 5));

_defineProperty(LogLevel, "Debug", new LogLevel('debug', 6));

_defineProperty(LogLevel, "Trace", new LogLevel('trace', 7));

_defineProperty(LogLevel, "All", new LogLevel('all', 8));