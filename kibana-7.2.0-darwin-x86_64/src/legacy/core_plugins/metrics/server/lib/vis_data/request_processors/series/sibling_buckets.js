"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = siblingBuckets;

var _lodash = _interopRequireDefault(require("lodash"));

var _get_bucket_size = _interopRequireDefault(require("../../helpers/get_bucket_size"));

var _bucket_transform = _interopRequireDefault(require("../../helpers/bucket_transform"));

var _get_interval_and_timefield = _interopRequireDefault(require("../../get_interval_and_timefield"));

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
function siblingBuckets(req, panel, series, esQueryConfig, indexPatternObject, capabilities) {
  return next => doc => {
    const {
      interval
    } = (0, _get_interval_and_timefield.default)(panel, series, indexPatternObject);
    const {
      bucketSize
    } = (0, _get_bucket_size.default)(req, interval, capabilities);
    series.metrics.filter(row => /_bucket$/.test(row.type)).forEach(metric => {
      const fn = _bucket_transform.default[metric.type];

      if (fn) {
        try {
          const bucket = fn(metric, series.metrics, bucketSize);

          _lodash.default.set(doc, `aggs.${series.id}.aggs.${metric.id}`, bucket);
        } catch (e) {// meh
        }
      }
    });
    return next(doc);
  };
}

module.exports = exports.default;