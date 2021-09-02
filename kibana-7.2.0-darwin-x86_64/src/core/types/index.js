"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core_service = require("./core_service");

Object.keys(_core_service).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _core_service[key];
    }
  });
});