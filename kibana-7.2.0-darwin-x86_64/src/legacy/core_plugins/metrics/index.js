"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = require("path");

var _fields = _interopRequireDefault(require("./server/routes/fields"));

var _vis = _interopRequireDefault(require("./server/routes/vis"));

var _search_strategies_register = require("./server/lib/search_strategies/search_strategies_register");

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
function _default(kibana) {
  return new kibana.Plugin({
    require: ['kibana', 'elasticsearch'],
    uiExports: {
      visTypes: ['plugins/metrics/kbn_vis_types'],
      interpreter: ['plugins/metrics/tsvb_fn'],
      styleSheetPaths: (0, _path.resolve)(__dirname, 'public/index.scss')
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
        chartResolution: Joi.number().default(150),
        minimumBucketSize: Joi.number().default(10)
      }).default();
    },

    init(server) {
      (0, _fields.default)(server);
      (0, _vis.default)(server);

      _search_strategies_register.SearchStrategiesRegister.init(server);
    }

  });
}

module.exports = exports.default;