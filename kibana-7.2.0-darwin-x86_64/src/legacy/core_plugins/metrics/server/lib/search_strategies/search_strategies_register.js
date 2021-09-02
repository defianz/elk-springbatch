"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchStrategiesRegister = void 0;

var _abstract_search_strategy = require("./strategies/abstract_search_strategy");

var _abstract_request = require("./searh_requests/abstract_request");

var _default_search_strategy = require("./strategies/default_search_strategy");

var _default_search_capabilities = require("./default_search_capabilities");

var _extract_index_patterns = require("../../../common/extract_index_patterns");

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
const strategies = [];

const addStrategy = searchStrategy => {
  if (searchStrategy instanceof _abstract_search_strategy.AbstractSearchStrategy) {
    strategies.unshift(searchStrategy);
  }

  return strategies;
};

class SearchStrategiesRegister {
  static init(server) {
    server.expose('AbstractSearchStrategy', _abstract_search_strategy.AbstractSearchStrategy);
    server.expose('AbstractSearchRequest', _abstract_request.AbstractSearchRequest);
    server.expose('DefaultSearchCapabilities', _default_search_capabilities.DefaultSearchCapabilities);
    server.expose('addSearchStrategy', searchStrategy => addStrategy(searchStrategy));
    addStrategy(new _default_search_strategy.DefaultSearchStrategy(server));
  }

  static async getViableStrategy(req, indexPattern) {
    for (const searchStrategy of strategies) {
      const {
        isViable,
        capabilities
      } = await searchStrategy.checkForViability(req, indexPattern);

      if (isViable) {
        return {
          searchStrategy,
          capabilities
        };
      }
    }
  }

  static async getViableStrategyForPanel(req, panel) {
    const indexPattern = (0, _extract_index_patterns.extractIndexPatterns)(panel).join(',');
    return SearchStrategiesRegister.getViableStrategy(req, indexPattern);
  }

}

exports.SearchStrategiesRegister = SearchStrategiesRegister;