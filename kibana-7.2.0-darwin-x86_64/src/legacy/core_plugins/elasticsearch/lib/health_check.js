"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _bluebird = _interopRequireDefault(require("bluebird"));

var _kibana_version = _interopRequireDefault(require("./kibana_version"));

var _ensure_es_version = require("./ensure_es_version");

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
function _default(plugin, server, requestDelay) {
  plugin.status.yellow('Waiting for Elasticsearch');

  function waitUntilReady() {
    return new _bluebird.default(resolve => {
      plugin.status.once('green', resolve);
    });
  }

  function check() {
    return (0, _ensure_es_version.ensureEsVersion)(server, _kibana_version.default.get()).then(() => plugin.status.green('Ready')).catch(err => plugin.status.red(err));
  }

  let timeoutId = null;

  function scheduleCheck(ms) {
    if (timeoutId) return;
    const myId = setTimeout(function () {
      check().finally(function () {
        if (timeoutId === myId) startorRestartChecking();
      });
    }, ms);
    timeoutId = myId;
  }

  function startorRestartChecking() {
    scheduleCheck(stopChecking() ? requestDelay : 1);
  }

  function stopChecking() {
    if (!timeoutId) return false;
    clearTimeout(timeoutId);
    timeoutId = null;
    return true;
  }

  server.ext('onPreStop', stopChecking);
  return {
    waitUntilReady: waitUntilReady,
    run: check,
    start: startorRestartChecking,
    stop: stopChecking,
    isRunning: function () {
      return !!timeoutId;
    }
  };
}

module.exports = exports.default;