"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQueryLog = getQueryLog;

var _chrome = _interopRequireDefault(require("ui/chrome"));

var _persisted_log = require("ui/persisted_log");

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
var config = _chrome.default.getUiSettingsClient();

function getQueryLog(appName, language) {
  return new _persisted_log.PersistedLog("typeahead:".concat(appName, "-").concat(language), {
    maxLength: config.get('history:limit'),
    filterDuplicates: true
  });
}