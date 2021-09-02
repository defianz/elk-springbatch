"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = require("./view");

Object.keys(_view).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _view[key];
    }
  });
});

var _panels = require("./panels");

Object.keys(_panels).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _panels[key];
    }
  });
});

var _embeddables = require("./embeddables");

Object.keys(_embeddables).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _embeddables[key];
    }
  });
});

var _metadata = require("./metadata");

Object.keys(_metadata).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _metadata[key];
    }
  });
});