"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildRequestBody = buildRequestBody;

var _build_processor_function = _interopRequireDefault(require("../build_processor_function"));

var _series = _interopRequireDefault(require("../request_processors/series"));

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

/**
 * Builds series request body
 *
 * @param {...args}: [
 *   req: {Object} - a request object,
 *   panel: {Object} - a panel object,
 *   series: {Object} - an series object,
 *   esQueryConfig: {Object} - es query config object,
 *   indexPatternObject: {Object} - an index pattern object,
 *   capabilities: {Object} - a search capabilities object
 * ]
 * @returns {Object} doc - processed body
 */
function buildRequestBody(...args) {
  const processor = (0, _build_processor_function.default)(_series.default, ...args);
  const doc = processor({});
  return doc;
}