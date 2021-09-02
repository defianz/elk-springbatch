"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = metricBuckets;

var _lodash = _interopRequireDefault(require("lodash"));

var _get_bucket_size = _interopRequireDefault(require("../../helpers/get_bucket_size"));

var _bucket_transform = _interopRequireDefault(require("../../helpers/bucket_transform"));

var _get_interval_and_timefield = _interopRequireDefault(require("../../get_interval_and_timefield"));

var _calculate_agg_root = require("./calculate_agg_root");

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
function metricBuckets(req, panel, esQueryConfig, indexPatternObject) {
  return next => doc => {
    const {
      interval
    } = (0, _get_interval_and_timefield.default)(panel, {}, indexPatternObject);
    const {
      intervalString
    } = (0, _get_bucket_size.default)(req, interval);
    panel.series.forEach(column => {
      const aggRoot = (0, _calculate_agg_root.calculateAggRoot)(doc, column);
      column.metrics.filter(row => !/_bucket$/.test(row.type) && !/^series/.test(row.type)).forEach(metric => {
        const fn = _bucket_transform.default[metric.type];

        if (fn) {
          try {
            const bucket = fn(metric, column.metrics, intervalString);

            _lodash.default.set(doc, `${aggRoot}.timeseries.aggs.${metric.id}`, bucket);
          } catch (e) {// meh
          }
        }
      });
    });
    return next(doc);
  };
}

module.exports = exports.default;