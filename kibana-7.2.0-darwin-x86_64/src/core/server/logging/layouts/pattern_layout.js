"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PatternLayout = void 0;

var _configSchema = require("@kbn/config-schema");

var _chalk = _interopRequireDefault(require("chalk"));

var _log_level = require("../log_level");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A set of static constants describing supported parameters in the log message pattern.
 */
const Parameters = Object.freeze({
  Context: '{context}',
  Level: '{level}',
  Message: '{message}',
  Timestamp: '{timestamp}'
});
/**
 * Regular expression used to parse log message pattern and fill in placeholders
 * with the actual data.
 */

const PATTERN_REGEX = new RegExp(`${Parameters.Timestamp}|${Parameters.Level}|${Parameters.Context}|${Parameters.Message}`, 'gi');
/**
 * Mapping between `LogLevel` and color that is used to highlight `level` part of
 * the log message.
 */

const LEVEL_COLORS = new Map([[_log_level.LogLevel.Fatal, _chalk.default.red], [_log_level.LogLevel.Error, _chalk.default.red], [_log_level.LogLevel.Warn, _chalk.default.yellow], [_log_level.LogLevel.Debug, _chalk.default.green], [_log_level.LogLevel.Trace, _chalk.default.blue]]);
/**
 * Default pattern used by PatternLayout if it's not overridden in the configuration.
 */

const DEFAULT_PATTERN = `[${Parameters.Timestamp}][${Parameters.Level}][${Parameters.Context}] ${Parameters.Message}`;

const patternLayoutSchema = _configSchema.schema.object({
  highlight: _configSchema.schema.maybe(_configSchema.schema.boolean()),
  kind: _configSchema.schema.literal('pattern'),
  pattern: _configSchema.schema.maybe(_configSchema.schema.string())
});
/** @internal */


/**
 * Layout that formats `LogRecord` using the `pattern` string with optional
 * color highlighting (eg. to make log messages easier to read in the terminal).
 * @internal
 */
class PatternLayout {
  static highlightRecord(record, formattedRecord) {
    if (LEVEL_COLORS.has(record.level)) {
      const color = LEVEL_COLORS.get(record.level);
      formattedRecord.set(Parameters.Level, color(formattedRecord.get(Parameters.Level)));
    }

    formattedRecord.set(Parameters.Context, _chalk.default.magenta(formattedRecord.get(Parameters.Context)));
  }

  constructor(pattern = DEFAULT_PATTERN, highlight = false) {
    this.pattern = pattern;
    this.highlight = highlight;
  }
  /**
   * Formats `LogRecord` into a string based on the specified `pattern` and `highlighting` options.
   * @param record Instance of `LogRecord` to format into string.
   */


  format(record) {
    // Error stack is much more useful than just the message.
    const message = record.error && record.error.stack || record.message;
    const formattedRecord = new Map([[Parameters.Timestamp, record.timestamp.toISOString()], [Parameters.Level, record.level.id.toUpperCase().padEnd(5)], [Parameters.Context, record.context], [Parameters.Message, message]]);

    if (this.highlight) {
      PatternLayout.highlightRecord(record, formattedRecord);
    }

    return this.pattern.replace(PATTERN_REGEX, match => formattedRecord.get(match));
  }

}

exports.PatternLayout = PatternLayout;

_defineProperty(PatternLayout, "configSchema", patternLayoutSchema);