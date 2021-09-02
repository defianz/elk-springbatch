"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = percentile;

var _lodash = _interopRequireDefault(require("lodash"));

var _get_agg_value = _interopRequireDefault(require("../../helpers/get_agg_value"));

var _get_default_decoration = _interopRequireDefault(require("../../helpers/get_default_decoration"));

var _get_splits = _interopRequireDefault(require("../../helpers/get_splits"));

var _get_last_metric = _interopRequireDefault(require("../../helpers/get_last_metric"));

var _metric_types = require("../../../../../common/metric_types");

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
function percentile(resp, panel, series, meta) {
  return next => results => {
    const metric = (0, _get_last_metric.default)(series);

    if (metric.type !== _metric_types.METRIC_TYPES.PERCENTILE) {
      return next(results);
    }

    (0, _get_splits.default)(resp, panel, series, meta).forEach(split => {
      metric.percentiles.forEach(percentile => {
        const percentileValue = percentile.value ? percentile.value : 0;
        const label = `${split.label} (${percentileValue})`;
        const data = split.timeseries.buckets.map(bucket => {
          const m = _lodash.default.assign({}, metric, {
            percent: percentileValue
          });

          return [bucket.key, (0, _get_agg_value.default)(bucket, m)];
        });

        if (percentile.mode === 'band') {
          const fillData = split.timeseries.buckets.map(bucket => {
            const m = _lodash.default.assign({}, metric, {
              percent: percentile.percentile
            });

            return [bucket.key, (0, _get_agg_value.default)(bucket, m)];
          });
          results.push({
            id: `${split.id}:${percentile.id}`,
            color: split.color,
            label,
            data,
            lines: {
              show: true,
              fill: percentile.shade,
              lineWidth: 0
            },
            points: {
              show: false
            },
            legend: false,
            fillBetween: `${split.id}:${percentile.id}:${percentile.percentile}`
          });
          results.push({
            id: `${split.id}:${percentile.id}:${percentile.percentile}`,
            color: split.color,
            label,
            data: fillData,
            lines: {
              show: true,
              fill: false,
              lineWidth: 0
            },
            legend: false,
            points: {
              show: false
            }
          });
        } else {
          const decoration = (0, _get_default_decoration.default)(series);
          results.push({
            id: `${split.id}:${percentile.id}`,
            color: split.color,
            label,
            data,
            ...decoration
          });
        }
      });
    });
    return next(results);
  };
}

module.exports = exports.default;