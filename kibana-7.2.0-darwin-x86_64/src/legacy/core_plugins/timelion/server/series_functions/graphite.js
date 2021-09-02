"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18n = require("@kbn/i18n");

var _lodash = _interopRequireDefault(require("lodash"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _moment = _interopRequireDefault(require("moment"));

var _datasource = _interopRequireDefault(require("../lib/classes/datasource"));

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
var _default = new _datasource.default('graphite', {
  args: [{
    name: 'metric',
    // _test-data.users.*.data
    types: ['string'],
    help: _i18n.i18n.translate('timelion.help.functions.graphite.args.metricHelpText', {
      defaultMessage: 'Graphite metric to pull, e.g., {metricExample}',
      values: {
        metricExample: '_test-data.users.*.data'
      }
    })
  }],
  help: _i18n.i18n.translate('timelion.help.functions.graphiteHelpText', {
    defaultMessage: `[experimental] Pull data from graphite. Configure your graphite server in Kibana's Advanced Settings`
  }),
  fn: function graphite(args, tlConfig) {
    const config = args.byName;
    const time = {
      min: (0, _moment.default)(tlConfig.time.from).format('HH:mm[_]YYYYMMDD'),
      max: (0, _moment.default)(tlConfig.time.to).format('HH:mm[_]YYYYMMDD')
    };
    const URL = tlConfig.settings['timelion:graphite.url'] + '/render/' + '?format=json' + '&from=' + time.min + '&until=' + time.max + '&target=' + config.metric;
    return (0, _nodeFetch.default)(URL).then(function (resp) {
      return resp.json();
    }).then(function (resp) {
      const list = _lodash.default.map(resp, function (series) {
        const data = _lodash.default.map(series.datapoints, function (point) {
          return [point[1] * 1000, point[0]];
        });

        return {
          data: data,
          type: 'series',
          fit: 'nearest',
          // TODO make this customizable
          label: series.target
        };
      });

      return {
        type: 'seriesList',
        list: list
      };
    }).catch(function (e) {
      throw e;
    });
  }
});

exports.default = _default;
module.exports = exports.default;