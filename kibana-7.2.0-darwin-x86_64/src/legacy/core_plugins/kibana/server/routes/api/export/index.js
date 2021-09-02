"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportApi = exportApi;

var _export_dashboards = require("../../../lib/export/export_dashboards");

var _boom = _interopRequireDefault(require("boom"));

var _joi = _interopRequireDefault(require("joi"));

var _moment = _interopRequireDefault(require("moment"));

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
function exportApi(server) {
  server.route({
    path: '/api/kibana/dashboards/export',
    config: {
      validate: {
        query: _joi.default.object().keys({
          dashboard: _joi.default.alternatives().try(_joi.default.string(), _joi.default.array().items(_joi.default.string())).required()
        })
      },
      tags: ['api']
    },
    method: ['GET'],
    handler: async (req, h) => {
      const currentDate = _moment.default.utc();

      return (0, _export_dashboards.exportDashboards)(req).then(resp => {
        const json = JSON.stringify(resp, null, '  ');
        const filename = `kibana-dashboards.${currentDate.format('YYYY-MM-DD-HH-mm-ss')}.json`;
        return h.response(json).header('Content-Disposition', `attachment; filename="${filename}"`).header('Content-Type', 'application/json').header('Content-Length', Buffer.byteLength(json, 'utf8'));
      }).catch(err => _boom.default.boomify(err, {
        statusCode: 400
      }));
    }
  });
}