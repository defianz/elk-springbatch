"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDescription = exports.getTitle = exports.getQuery = exports.getFilters = exports.getTimeRange = exports.getHidePanelTitles = exports.getUseMargins = exports.getMaximizedPanelId = exports.getFullScreenMode = exports.getViewMode = exports.getStagedFilters = exports.getEmbeddableMetadata = exports.getEmbeddableStagedFilter = exports.getEmbeddableCustomization = exports.getEmbeddableInitialized = exports.getEmbeddableError = exports.getEmbeddables = exports.getPanelType = exports.getPanel = exports.getPanels = exports.getDashboard = void 0;

var DashboardSelectors = _interopRequireWildcard(require("../dashboard/selectors"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
var getDashboard = function getDashboard(state) {
  return state.dashboard;
};

exports.getDashboard = getDashboard;

var getPanels = function getPanels(state) {
  return DashboardSelectors.getPanels(getDashboard(state));
};

exports.getPanels = getPanels;

var getPanel = function getPanel(state, panelId) {
  return DashboardSelectors.getPanel(getDashboard(state), panelId);
};

exports.getPanel = getPanel;

var getPanelType = function getPanelType(state, panelId) {
  return DashboardSelectors.getPanelType(getDashboard(state), panelId);
};

exports.getPanelType = getPanelType;

var getEmbeddables = function getEmbeddables(state) {
  return DashboardSelectors.getEmbeddables(getDashboard(state));
};

exports.getEmbeddables = getEmbeddables;

var getEmbeddableError = function getEmbeddableError(state, panelId) {
  return DashboardSelectors.getEmbeddableError(getDashboard(state), panelId);
};

exports.getEmbeddableError = getEmbeddableError;

var getEmbeddableInitialized = function getEmbeddableInitialized(state, panelId) {
  return DashboardSelectors.getEmbeddableInitialized(getDashboard(state), panelId);
};

exports.getEmbeddableInitialized = getEmbeddableInitialized;

var getEmbeddableCustomization = function getEmbeddableCustomization(state, panelId) {
  return DashboardSelectors.getEmbeddableCustomization(getDashboard(state), panelId);
};

exports.getEmbeddableCustomization = getEmbeddableCustomization;

var getEmbeddableStagedFilter = function getEmbeddableStagedFilter(state, panelId) {
  return DashboardSelectors.getEmbeddableStagedFilter(getDashboard(state), panelId);
};

exports.getEmbeddableStagedFilter = getEmbeddableStagedFilter;

var getEmbeddableMetadata = function getEmbeddableMetadata(state, panelId) {
  return DashboardSelectors.getEmbeddableMetadata(getDashboard(state), panelId);
};

exports.getEmbeddableMetadata = getEmbeddableMetadata;

var getStagedFilters = function getStagedFilters(state) {
  return DashboardSelectors.getStagedFilters(getDashboard(state));
};

exports.getStagedFilters = getStagedFilters;

var getViewMode = function getViewMode(state) {
  return DashboardSelectors.getViewMode(getDashboard(state));
};

exports.getViewMode = getViewMode;

var getFullScreenMode = function getFullScreenMode(state) {
  return DashboardSelectors.getFullScreenMode(getDashboard(state));
};

exports.getFullScreenMode = getFullScreenMode;

var getMaximizedPanelId = function getMaximizedPanelId(state) {
  return DashboardSelectors.getMaximizedPanelId(getDashboard(state));
};

exports.getMaximizedPanelId = getMaximizedPanelId;

var getUseMargins = function getUseMargins(state) {
  return DashboardSelectors.getUseMargins(getDashboard(state));
};

exports.getUseMargins = getUseMargins;

var getHidePanelTitles = function getHidePanelTitles(state) {
  return DashboardSelectors.getHidePanelTitles(getDashboard(state));
};

exports.getHidePanelTitles = getHidePanelTitles;

var getTimeRange = function getTimeRange(state) {
  return DashboardSelectors.getTimeRange(getDashboard(state));
};

exports.getTimeRange = getTimeRange;

var getFilters = function getFilters(state) {
  return DashboardSelectors.getFilters(getDashboard(state));
};

exports.getFilters = getFilters;

var getQuery = function getQuery(state) {
  return DashboardSelectors.getQuery(getDashboard(state));
};

exports.getQuery = getQuery;

var getTitle = function getTitle(state) {
  return DashboardSelectors.getTitle(getDashboard(state));
};

exports.getTitle = getTitle;

var getDescription = function getDescription(state) {
  return DashboardSelectors.getDescription(getDashboard(state));
};

exports.getDescription = getDescription;