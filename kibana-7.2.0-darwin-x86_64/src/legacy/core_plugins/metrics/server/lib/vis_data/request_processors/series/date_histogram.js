"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dateHistogram;

var _get_bucket_size = _interopRequireDefault(require("../../helpers/get_bucket_size"));

var _offset_time = _interopRequireDefault(require("../../offset_time"));

var _get_interval_and_timefield = _interopRequireDefault(require("../../get_interval_and_timefield"));

var _lodash = require("lodash");

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
function dateHistogram(req, panel, series, esQueryConfig, indexPatternObject, capabilities) {
  return next => doc => {
    const {
      timeField,
      interval
    } = (0, _get_interval_and_timefield.default)(panel, series, indexPatternObject);
    const {
      bucketSize,
      intervalString
    } = (0, _get_bucket_size.default)(req, interval, capabilities);
    const {
      from,
      to
    } = (0, _offset_time.default)(req, series.offset_time);
    const timezone = capabilities.searchTimezone;
    (0, _lodash.set)(doc, `aggs.${series.id}.aggs.timeseries.date_histogram`, {
      field: timeField,
      interval: intervalString,
      min_doc_count: 0,
      time_zone: timezone,
      extended_bounds: {
        min: from.valueOf(),
        max: to.valueOf()
      }
    });
    (0, _lodash.set)(doc, `aggs.${series.id}.meta`, {
      timeField,
      intervalString,
      bucketSize,
      seriesId: series.id
    });
    return next(doc);
  };
}

module.exports = exports.default;