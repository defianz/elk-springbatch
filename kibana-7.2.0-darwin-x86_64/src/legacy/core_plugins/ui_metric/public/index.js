"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackUiMetric = trackUiMetric;

var _chrome = _interopRequireDefault(require("ui/chrome"));

var _modules = require("ui/modules");

var _ui_metric = require("ui/ui_metric");

var _common = require("../common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
// @ts-ignore
var _http;

_modules.uiModules.get('kibana').run(function ($http) {
  _http = $http;
});

function createErrorMessage(subject) {
  var message = "trackUiMetric was called with ".concat(subject, ", which is not allowed to contain a colon. ") + "Colons play a special role in how metrics are saved as stored objects";
  return new Error(message);
}

function trackUiMetric(appName, metricType) {
  if (!(0, _ui_metric.getCanTrackUiMetrics)()) {
    return;
  }

  if (appName.includes(':')) {
    throw createErrorMessage("app name '".concat(appName, "'"));
  }

  if (metricType.includes(':')) {
    throw createErrorMessage("metric type ".concat(metricType));
  }

  var metricTypes = Array.isArray(metricType) ? metricType.join(',') : metricType;

  var uri = _chrome.default.addBasePath("".concat(_common.API_BASE_PATH, "/").concat(appName, "/").concat(metricTypes));

  _http.post(uri);
}