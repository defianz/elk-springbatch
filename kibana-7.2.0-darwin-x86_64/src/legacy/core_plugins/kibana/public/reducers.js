"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducers = void 0;

var _redux = require("redux");

var _reducers = require("./dashboard/reducers");

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
 * Only a single reducer now, but eventually there should be one for each sub app that is part of the
 * core kibana plugins.
 */
var reducers = (0, _redux.combineReducers)({
  dashboard: _reducers.dashboard
});
exports.reducers = reducers;