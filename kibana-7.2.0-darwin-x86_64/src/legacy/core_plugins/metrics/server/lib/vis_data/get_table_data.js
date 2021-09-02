"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTableData = getTableData;

var _build_request_body = _interopRequireDefault(require("./table/build_request_body"));

var _handle_error_response = _interopRequireDefault(require("./handle_error_response"));

var _lodash = require("lodash");

var _process_bucket = _interopRequireDefault(require("./table/process_bucket"));

var _search_strategies_register = require("../search_strategies/search_strategies_register");

var _get_es_query_uisettings = require("./helpers/get_es_query_uisettings");

var _get_index_pattern = require("./helpers/get_index_pattern");

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
async function getTableData(req, panel) {
  const panelIndexPattern = panel.index_pattern;
  const {
    searchStrategy,
    capabilities
  } = await _search_strategies_register.SearchStrategiesRegister.getViableStrategy(req, panelIndexPattern);
  const searchRequest = searchStrategy.getSearchRequest(req);
  const esQueryConfig = await (0, _get_es_query_uisettings.getEsQueryConfig)(req);
  const {
    indexPatternObject
  } = await (0, _get_index_pattern.getIndexPatternObject)(req, panelIndexPattern);
  const body = (0, _build_request_body.default)(req, panel, esQueryConfig, indexPatternObject, capabilities);
  const meta = {
    type: panel.type,
    uiRestrictions: capabilities.uiRestrictions
  };

  try {
    const [resp] = await searchRequest.search([{
      body,
      index: panelIndexPattern
    }]);
    const buckets = (0, _lodash.get)(resp, 'aggregations.pivot.buckets', []);
    return { ...meta,
      series: buckets.map((0, _process_bucket.default)(panel))
    };
  } catch (err) {
    if (err.body) {
      err.response = err.body;
      return { ...meta,
        ...(0, _handle_error_response.default)(panel)(err)
      };
    }
  }
}