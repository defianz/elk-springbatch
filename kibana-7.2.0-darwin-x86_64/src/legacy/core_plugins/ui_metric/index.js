"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = require("path");

var _ui_metric = require("./server/routes/api/ui_metric");

var _index = require("./server/usage/index");

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
// eslint-disable-next-line import/no-default-export
function _default(kibana) {
  return new kibana.Plugin({
    id: 'ui_metric',
    require: ['kibana', 'elasticsearch'],
    publicDir: (0, _path.resolve)(__dirname, 'public'),
    uiExports: {
      mappings: require('./mappings.json'),
      hacks: ['plugins/ui_metric']
    },

    init(server) {
      (0, _ui_metric.registerUserActionRoute)(server);
      (0, _index.registerUiMetricUsageCollector)(server);
    }

  });
}

module.exports = exports.default;