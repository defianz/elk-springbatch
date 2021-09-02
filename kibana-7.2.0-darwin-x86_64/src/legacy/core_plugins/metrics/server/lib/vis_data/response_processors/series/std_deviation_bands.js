"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = stdDeviationBands;

var _lodash = _interopRequireDefault(require("lodash"));

var _get_splits = _interopRequireDefault(require("../../helpers/get_splits"));

var _get_last_metric = _interopRequireDefault(require("../../helpers/get_last_metric"));

var _map_bucket = _interopRequireDefault(require("../../helpers/map_bucket"));

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
function stdDeviationBands(resp, panel, series, meta) {
  return next => results => {
    const metric = (0, _get_last_metric.default)(series);

    if (metric.type === 'std_deviation' && metric.mode === 'band') {
      (0, _get_splits.default)(resp, panel, series, meta).forEach(split => {
        const upper = split.timeseries.buckets.map((0, _map_bucket.default)(_lodash.default.assign({}, metric, {
          mode: 'upper'
        })));
        const lower = split.timeseries.buckets.map((0, _map_bucket.default)(_lodash.default.assign({}, metric, {
          mode: 'lower'
        })));
        results.push({
          id: `${split.id}:upper`,
          label: split.label,
          color: split.color,
          lines: {
            show: true,
            fill: 0.5,
            lineWidth: 0
          },
          points: {
            show: false
          },
          fillBetween: `${split.id}:lower`,
          data: upper
        });
        results.push({
          id: `${split.id}:lower`,
          color: split.color,
          lines: {
            show: true,
            fill: false,
            lineWidth: 0
          },
          points: {
            show: false
          },
          data: lower
        });
      });
    }

    return next(results);
  };
}

module.exports = exports.default;