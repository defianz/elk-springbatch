"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processBucket;

var _build_processor_function = _interopRequireDefault(require("../build_processor_function"));

var _table = _interopRequireDefault(require("../response_processors/table"));

var _get_last_value = _interopRequireDefault(require("../../../../common/get_last_value"));

var _regression = _interopRequireDefault(require("regression"));

var _lodash = require("lodash");

var _get_active_series = require("../helpers/get_active_series");

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
function processBucket(panel) {
  return bucket => {
    const series = (0, _get_active_series.getActiveSeries)(panel).map(series => {
      const timeseries = (0, _lodash.get)(bucket, `${series.id}.timeseries`);
      const buckets = (0, _lodash.get)(bucket, `${series.id}.buckets`);

      if (!timeseries && buckets) {
        const meta = (0, _lodash.get)(bucket, `${series.id}.meta`);
        const timeseries = {
          buckets: (0, _lodash.get)(bucket, `${series.id}.buckets`)
        };
        (0, _lodash.set)(bucket, series.id, {
          meta,
          timeseries
        });
      }

      const processor = (0, _build_processor_function.default)(_table.default, bucket, panel, series);
      const result = (0, _lodash.first)(processor([]));
      if (!result) return null;
      const data = (0, _lodash.get)(result, 'data', []);

      const linearRegression = _regression.default.linear(data);

      result.last = (0, _get_last_value.default)(data);
      result.slope = linearRegression.equation[0];
      return result;
    });
    return {
      key: bucket.key,
      series
    };
  };
}

module.exports = exports.default;