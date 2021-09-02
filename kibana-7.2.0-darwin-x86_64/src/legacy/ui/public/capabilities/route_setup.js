"use strict";

var _lodash = require("lodash");

var _chrome = _interopRequireDefault(require("ui/chrome"));

var _routes = _interopRequireDefault(require("ui/routes"));

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
_routes.default.addSetupWork(function (uiCapabilities, kbnBaseUrl, $route, kbnUrl) {
  var route = (0, _lodash.get)($route, 'current.$$route');

  if (!route.requireUICapability) {
    return;
  }

  if (!(0, _lodash.get)(uiCapabilities, route.requireUICapability)) {
    var url = _chrome.default.addBasePath("".concat(kbnBaseUrl, "#/home"));

    kbnUrl.redirect(url);
    throw _routes.default.WAIT_FOR_URL_CHANGE_TOKEN;
  }
});