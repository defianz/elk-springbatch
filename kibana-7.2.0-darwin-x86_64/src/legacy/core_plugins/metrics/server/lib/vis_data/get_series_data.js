"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSeriesData = getSeriesData;

var _get_request_params = require("./series/get_request_params");

var _handle_response_body = _interopRequireDefault(require("./series/handle_response_body"));

var _handle_error_response = _interopRequireDefault(require("./handle_error_response"));

var _get_annotations = require("./get_annotations");

var _search_strategies_register = require("../search_strategies/search_strategies_register");

var _get_es_query_uisettings = require("./helpers/get_es_query_uisettings");

var _get_active_series = require("./helpers/get_active_series");

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
async function getSeriesData(req, panel) {
  const {
    searchStrategy,
    capabilities
  } = await _search_strategies_register.SearchStrategiesRegister.getViableStrategyForPanel(req, panel);
  const searchRequest = searchStrategy.getSearchRequest(req);
  const esQueryConfig = await (0, _get_es_query_uisettings.getEsQueryConfig)(req);
  const bodiesPromises = (0, _get_active_series.getActiveSeries)(panel).map(series => (0, _get_request_params.getSeriesRequestParams)(req, panel, series, esQueryConfig, capabilities));
  const searches = (await Promise.all(bodiesPromises)).reduce((acc, items) => acc.concat(items), []);
  const meta = {
    type: panel.type,
    uiRestrictions: capabilities.uiRestrictions
  };

  try {
    const data = await searchRequest.search(searches);
    const series = data.map((0, _handle_response_body.default)(panel));
    let annotations = null;

    if (panel.annotations && panel.annotations.length) {
      annotations = await (0, _get_annotations.getAnnotations)({
        req,
        panel,
        series,
        esQueryConfig,
        searchStrategy,
        capabilities
      });
    }

    return { ...meta,
      [panel.id]: {
        annotations,
        id: panel.id,
        series: series.reduce((acc, series) => acc.concat(series), [])
      }
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