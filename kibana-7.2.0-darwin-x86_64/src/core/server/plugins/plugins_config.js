"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PluginsConfig = exports.config = void 0;

var _configSchema = require("@kbn/config-schema");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const config = {
  path: 'plugins',
  schema: _configSchema.schema.object({
    initialize: _configSchema.schema.boolean({
      defaultValue: true
    }),

    /**
     * Defines an array of directories where another plugin should be loaded from.
     * Should only be used in a development environment.
     */
    paths: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
      defaultValue: []
    })
  })
};
/** @internal */

exports.config = config;

class PluginsConfig {
  /**
   * Indicates whether or not plugins should be initialized.
   */

  /**
   * Defines directories that we should scan for the plugin subdirectories.
   */

  /**
   * Defines directories where an additional plugin exists.
   */
  constructor(rawConfig, env) {
    _defineProperty(this, "initialize", void 0);

    _defineProperty(this, "pluginSearchPaths", void 0);

    _defineProperty(this, "additionalPluginPaths", void 0);

    this.initialize = rawConfig.initialize;
    this.pluginSearchPaths = env.pluginSearchPaths; // Only allow custom plugin paths in dev.

    this.additionalPluginPaths = env.mode.dev ? rawConfig.paths : [];
  }

}

exports.PluginsConfig = PluginsConfig;