"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsonLayout = void 0;

var _configSchema = require("@kbn/config-schema");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  literal,
  object
} = _configSchema.schema;
const jsonLayoutSchema = object({
  kind: literal('json')
});
/** @internal */

/**
 * Layout that just converts `LogRecord` into JSON string.
 * @internal
 */
class JsonLayout {
  static errorToSerializableObject(error) {
    if (error === undefined) {
      return error;
    }

    return {
      message: error.message,
      name: error.name,
      stack: error.stack
    };
  }

  format(record) {
    return JSON.stringify({
      '@timestamp': record.timestamp.toISOString(),
      context: record.context,
      error: JsonLayout.errorToSerializableObject(record.error),
      level: record.level.id.toUpperCase(),
      message: record.message,
      meta: record.meta
    });
  }

}

exports.JsonLayout = JsonLayout;

_defineProperty(JsonLayout, "configSchema", jsonLayoutSchema);