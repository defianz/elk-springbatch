"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDashboardEditUrl = createDashboardEditUrl;
exports.DEFAULT_PANEL_HEIGHT = exports.DEFAULT_PANEL_WIDTH = exports.DASHBOARD_GRID_HEIGHT = exports.DASHBOARD_GRID_COLUMN_COUNT = exports.DashboardConstants = void 0;

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
var DashboardConstants = {
  ADD_VISUALIZATION_TO_DASHBOARD_MODE_PARAM: 'addToDashboard',
  NEW_VISUALIZATION_ID_PARAM: 'addVisualization',
  LANDING_PAGE_PATH: '/dashboards',
  CREATE_NEW_DASHBOARD_URL: '/dashboard'
};
exports.DashboardConstants = DashboardConstants;
var DASHBOARD_GRID_COLUMN_COUNT = 48;
exports.DASHBOARD_GRID_COLUMN_COUNT = DASHBOARD_GRID_COLUMN_COUNT;
var DASHBOARD_GRID_HEIGHT = 20;
exports.DASHBOARD_GRID_HEIGHT = DASHBOARD_GRID_HEIGHT;
var DEFAULT_PANEL_WIDTH = DASHBOARD_GRID_COLUMN_COUNT / 2;
exports.DEFAULT_PANEL_WIDTH = DEFAULT_PANEL_WIDTH;
var DEFAULT_PANEL_HEIGHT = 15;
exports.DEFAULT_PANEL_HEIGHT = DEFAULT_PANEL_HEIGHT;

function createDashboardEditUrl(id) {
  return "/dashboard/".concat(id);
}