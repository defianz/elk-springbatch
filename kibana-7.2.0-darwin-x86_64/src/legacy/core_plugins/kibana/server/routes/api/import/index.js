"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.importApi = importApi;

var _boom = _interopRequireDefault(require("boom"));

var _joi = _interopRequireDefault(require("joi"));

var _import_dashboards = require("../../../lib/import/import_dashboards");

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
function importApi(server) {
  server.route({
    path: '/api/kibana/dashboards/import',
    method: ['POST'],
    config: {
      validate: {
        payload: _joi.default.object().keys({
          objects: _joi.default.array(),
          version: _joi.default.string()
        }),
        query: _joi.default.object().keys({
          force: _joi.default.boolean().default(false),
          exclude: [_joi.default.string(), _joi.default.array().items(_joi.default.string())]
        })
      },
      tags: ['api']
    },
    handler: async req => {
      try {
        return await (0, _import_dashboards.importDashboards)(req);
      } catch (err) {
        throw _boom.default.boomify(err, {
          statusCode: 400
        });
      }
    }
  });
}