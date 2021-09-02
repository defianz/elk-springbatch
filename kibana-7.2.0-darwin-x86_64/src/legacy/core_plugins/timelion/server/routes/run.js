"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _bluebird = _interopRequireDefault(require("bluebird"));

var _lodash = _interopRequireDefault(require("lodash"));

var _chain_runner = _interopRequireDefault(require("../handlers/chain_runner.js"));

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
const timelionDefaults = require('../lib/get_namespaced_settings')();

function formatErrorResponse(e, h) {
  return h.response({
    title: e.toString(),
    message: e.toString()
  }).code(500);
}

function _default(server) {
  server.route({
    method: ['POST', 'GET'],
    path: '/api/timelion/run',
    handler: async (request, h) => {
      try {
        const uiSettings = await request.getUiSettingsService().getAll();

        const tlConfig = require('../handlers/lib/tl_config.js')({
          server,
          request,
          settings: _lodash.default.defaults(uiSettings, timelionDefaults) // Just in case they delete some setting.

        });

        const chainRunner = (0, _chain_runner.default)(tlConfig);
        const sheet = await _bluebird.default.all(chainRunner.processRequest(request.payload || {
          sheet: [request.query.expression],
          time: {
            from: request.query.from,
            to: request.query.to,
            interval: request.query.interval,
            timezone: request.query.timezone
          }
        }));
        return {
          sheet,
          stats: chainRunner.getStats()
        };
      } catch (err) {
        server.log(['timelion', 'error'], `${err.toString()}: ${err.stack}`); // TODO Maybe we should just replace everywhere we throw with Boom? Probably.

        if (err.isBoom) {
          return err;
        } else {
          return formatErrorResponse(err, h);
        }
      }
    }
  });
}

module.exports = exports.default;