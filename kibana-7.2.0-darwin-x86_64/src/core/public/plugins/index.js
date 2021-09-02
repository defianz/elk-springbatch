"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Plugin: true,
  PluginInitializer: true,
  PluginInitializerContext: true,
  PluginSetupContext: true,
  PluginStartContext: true
};
Object.defineProperty(exports, "Plugin", {
  enumerable: true,
  get: function get() {
    return _plugin.Plugin;
  }
});
Object.defineProperty(exports, "PluginInitializer", {
  enumerable: true,
  get: function get() {
    return _plugin.PluginInitializer;
  }
});
Object.defineProperty(exports, "PluginInitializerContext", {
  enumerable: true,
  get: function get() {
    return _plugin_context.PluginInitializerContext;
  }
});
Object.defineProperty(exports, "PluginSetupContext", {
  enumerable: true,
  get: function get() {
    return _plugin_context.PluginSetupContext;
  }
});
Object.defineProperty(exports, "PluginStartContext", {
  enumerable: true,
  get: function get() {
    return _plugin_context.PluginStartContext;
  }
});

var _plugins_service = require("./plugins_service");

Object.keys(_plugins_service).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _plugins_service[key];
    }
  });
});

var _plugin = require("./plugin");

var _plugin_context = require("./plugin_context");