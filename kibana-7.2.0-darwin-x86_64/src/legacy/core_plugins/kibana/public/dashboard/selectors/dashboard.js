"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStagedFilters = exports.getContainerState = exports.getDescription = exports.getTitle = exports.getMetadata = exports.getQuery = exports.getFilters = exports.getRefreshConfig = exports.getTimeRange = exports.getMaximizedPanelId = exports.getHidePanelTitles = exports.getFullScreenMode = exports.getViewMode = exports.getUseMargins = exports.getVisibleContextMenuPanelId = exports.getEmbeddableEditUrl = exports.getEmbeddableMetadata = exports.getEmbeddableStagedFilter = exports.getEmbeddableInitialized = exports.getEmbeddableTitle = exports.getEmbeddableError = exports.getEmbeddable = exports.getEmbeddableCustomization = exports.getEmbeddables = exports.getPanelType = exports.getPanel = exports.getPanels = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

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
var getPanels = function getPanels(dashboard) {
  return dashboard.panels;
};

exports.getPanels = getPanels;

var getPanel = function getPanel(dashboard, panelId) {
  return getPanels(dashboard)[panelId];
};

exports.getPanel = getPanel;

var getPanelType = function getPanelType(dashboard, panelId) {
  return getPanel(dashboard, panelId).type;
};

exports.getPanelType = getPanelType;

var getEmbeddables = function getEmbeddables(dashboard) {
  return dashboard.embeddables;
}; // TODO: rename panel.embeddableConfig to embeddableCustomization. Because it's on the panel that's stored on a
// dashboard, renaming this will require a migration step.


exports.getEmbeddables = getEmbeddables;

var getEmbeddableCustomization = function getEmbeddableCustomization(dashboard, panelId) {
  return getPanel(dashboard, panelId).embeddableConfig;
};

exports.getEmbeddableCustomization = getEmbeddableCustomization;

var getEmbeddable = function getEmbeddable(dashboard, panelId) {
  return dashboard.embeddables[panelId];
};

exports.getEmbeddable = getEmbeddable;

var getEmbeddableError = function getEmbeddableError(dashboard, panelId) {
  return getEmbeddable(dashboard, panelId).error;
};

exports.getEmbeddableError = getEmbeddableError;

var getEmbeddableTitle = function getEmbeddableTitle(dashboard, panelId) {
  var embeddable = getEmbeddable(dashboard, panelId);
  return embeddable && embeddable.initialized && embeddable.metadata ? embeddable.metadata.title : '';
};

exports.getEmbeddableTitle = getEmbeddableTitle;

var getEmbeddableInitialized = function getEmbeddableInitialized(dashboard, panelId) {
  return getEmbeddable(dashboard, panelId).initialized;
};

exports.getEmbeddableInitialized = getEmbeddableInitialized;

var getEmbeddableStagedFilter = function getEmbeddableStagedFilter(dashboard, panelId) {
  return getEmbeddable(dashboard, panelId).stagedFilter;
};

exports.getEmbeddableStagedFilter = getEmbeddableStagedFilter;

var getEmbeddableMetadata = function getEmbeddableMetadata(dashboard, panelId) {
  return getEmbeddable(dashboard, panelId).metadata;
};

exports.getEmbeddableMetadata = getEmbeddableMetadata;

var getEmbeddableEditUrl = function getEmbeddableEditUrl(dashboard, panelId) {
  var embeddable = getEmbeddable(dashboard, panelId);
  return embeddable && embeddable.initialized && embeddable.metadata ? embeddable.metadata.editUrl : '';
};

exports.getEmbeddableEditUrl = getEmbeddableEditUrl;

var getVisibleContextMenuPanelId = function getVisibleContextMenuPanelId(dashboard) {
  return dashboard.view.visibleContextMenuPanelId;
};

exports.getVisibleContextMenuPanelId = getVisibleContextMenuPanelId;

var getUseMargins = function getUseMargins(dashboard) {
  return dashboard.view.useMargins;
};

exports.getUseMargins = getUseMargins;

var getViewMode = function getViewMode(dashboard) {
  return dashboard.view.viewMode;
};

exports.getViewMode = getViewMode;

var getFullScreenMode = function getFullScreenMode(dashboard) {
  return dashboard.view.isFullScreenMode;
};

exports.getFullScreenMode = getFullScreenMode;

var getHidePanelTitles = function getHidePanelTitles(dashboard) {
  return dashboard.view.hidePanelTitles;
};

exports.getHidePanelTitles = getHidePanelTitles;

var getMaximizedPanelId = function getMaximizedPanelId(dashboard) {
  return dashboard.view.maximizedPanelId;
};

exports.getMaximizedPanelId = getMaximizedPanelId;

var getTimeRange = function getTimeRange(dashboard) {
  return dashboard.view.timeRange;
};

exports.getTimeRange = getTimeRange;

var getRefreshConfig = function getRefreshConfig(dashboard) {
  return dashboard.view.refreshConfig;
};

exports.getRefreshConfig = getRefreshConfig;

var getFilters = function getFilters(dashboard) {
  return dashboard.view.filters;
};

exports.getFilters = getFilters;

var getQuery = function getQuery(dashboard) {
  return dashboard.view.query;
};

exports.getQuery = getQuery;

var getMetadata = function getMetadata(dashboard) {
  return dashboard.metadata;
};

exports.getMetadata = getMetadata;

var getTitle = function getTitle(dashboard) {
  return dashboard.metadata.title;
};

exports.getTitle = getTitle;

var getDescription = function getDescription(dashboard) {
  return dashboard.metadata.description;
};

exports.getDescription = getDescription;

var getContainerState = function getContainerState(dashboard, panelId) {
  var time = getTimeRange(dashboard);
  return {
    customTitle: getPanel(dashboard, panelId).title,
    embeddableCustomization: _lodash.default.cloneDeep(getEmbeddableCustomization(dashboard, panelId) || {}),
    filters: getFilters(dashboard),
    hidePanelTitles: getHidePanelTitles(dashboard),
    isPanelExpanded: getMaximizedPanelId(dashboard) === panelId,
    query: getQuery(dashboard),
    timeRange: {
      from: time.from,
      to: time.to
    },
    refreshConfig: getRefreshConfig(dashboard),
    viewMode: getViewMode(dashboard)
  };
};
/**
 * @return an array of filters any embeddables wish dashboard to apply
 */


exports.getContainerState = getContainerState;

var getStagedFilters = function getStagedFilters(dashboard) {
  return _lodash.default.compact(_lodash.default.map(dashboard.embeddables, 'stagedFilter'));
};

exports.getStagedFilters = getStagedFilters;