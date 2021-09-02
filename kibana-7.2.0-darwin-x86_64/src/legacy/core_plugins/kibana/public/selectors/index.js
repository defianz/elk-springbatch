"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  CoreKibanaState: true
};
Object.defineProperty(exports, "CoreKibanaState", {
  enumerable: true,
  get: function get() {
    return _types.CoreKibanaState;
  }
});

var _dashboard_selectors = require("./dashboard_selectors");

Object.keys(_dashboard_selectors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _dashboard_selectors[key];
    }
  });
});

var _types = require("./types");