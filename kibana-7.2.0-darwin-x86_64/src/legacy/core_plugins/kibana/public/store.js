"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = void 0;

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _types = require("ui/embeddable/types");

var _dashboard_view_mode = require("./dashboard/dashboard_view_mode");

var _reducers = require("./reducers");

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
var enhancers = [(0, _redux.applyMiddleware)(_reduxThunk.default)];
var store = (0, _redux.createStore)(_reducers.reducers, {
  dashboard: {
    embeddables: {},
    metadata: {
      title: 'New Dashboard'
    },
    panels: {},
    view: {
      filters: [],
      hidePanelTitles: false,
      isFullScreenMode: false,
      query: {
        language: _types.QueryLanguageType.LUCENE,
        query: ''
      },
      timeRange: {
        from: 'now-15m',
        to: 'now'
      },
      useMargins: true,
      viewMode: _dashboard_view_mode.DashboardViewMode.VIEW
    }
  }
}, _redux.compose.apply(void 0, enhancers));
exports.store = store;