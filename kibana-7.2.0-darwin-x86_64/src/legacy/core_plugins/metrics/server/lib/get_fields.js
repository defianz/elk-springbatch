"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFields = getFields;

var _search_strategies_register = require("./search_strategies/search_strategies_register");

var _lodash = require("lodash");

var _get_index_pattern = require("./vis_data/helpers/get_index_pattern");

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
async function getFields(req) {
  const indexPattern = req.query.index;
  const {
    indexPatternString
  } = await (0, _get_index_pattern.getIndexPatternObject)(req, indexPattern);
  const {
    searchStrategy,
    capabilities
  } = await _search_strategies_register.SearchStrategiesRegister.getViableStrategy(req, indexPatternString);
  const fields = (await searchStrategy.getFieldsForWildcard(req, indexPatternString, capabilities)).filter(field => field.aggregatable);
  return (0, _lodash.uniq)(fields, field => field.name);
}