"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _calculate_auto = _interopRequireDefault(require("./calculate_auto"));

var _moment = _interopRequireDefault(require("moment"));

var _unit_to_seconds = require("./unit_to_seconds");

var _interval_regexp = require("../../../../common/interval_regexp");

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
const calculateBucketData = (timeInterval, capabilities) => {
  const intervalString = capabilities ? capabilities.getValidTimeInterval(timeInterval) : timeInterval;
  const intervalStringMatch = intervalString.match(_interval_regexp.INTERVAL_STRING_RE);
  let bucketSize = Number(intervalStringMatch[1]) * (0, _unit_to_seconds.getUnitValue)(intervalStringMatch[2]); // don't go too small

  if (bucketSize < 1) {
    bucketSize = 1;
  }

  return {
    bucketSize,
    intervalString
  };
};

const getTimeRangeBucketSize = ({
  min,
  max
}) => {
  const from = _moment.default.utc(min);

  const to = _moment.default.utc(max);

  const duration = _moment.default.duration(to.valueOf() - from.valueOf(), 'ms');

  return _calculate_auto.default.near(100, duration).asSeconds();
};

var _default = (req, interval, capabilities) => {
  const bucketSize = getTimeRangeBucketSize(req.payload.timerange);
  let intervalString = `${bucketSize}s`;
  const gteAutoMatch = Boolean(interval) && interval.match(_interval_regexp.GTE_INTERVAL_RE);

  if (gteAutoMatch) {
    const bucketData = calculateBucketData(gteAutoMatch[1], capabilities);

    if (bucketData.bucketSize >= bucketSize) {
      return bucketData;
    }
  }

  const matches = interval && interval.match(_interval_regexp.INTERVAL_STRING_RE);

  if (matches) {
    intervalString = interval;
  }

  return calculateBucketData(intervalString, capabilities);
};

exports.default = _default;
module.exports = exports.default;