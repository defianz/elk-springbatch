"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateQuery = exports.updateFilters = exports.updateRefreshConfig = exports.updateTimeRange = exports.updateHidePanelTitles = exports.updateUseMargins = exports.updateIsFullScreenMode = exports.minimizePanel = exports.maximizePanel = exports.setVisibleContextMenuPanelId = exports.closeContextMenu = exports.updateViewMode = exports.ViewActionTypeKeys = void 0;

var _reduxActions = require("redux-actions");

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

/* eslint-disable @typescript-eslint/no-empty-interface */
var ViewActionTypeKeys;
exports.ViewActionTypeKeys = ViewActionTypeKeys;

(function (ViewActionTypeKeys) {
  ViewActionTypeKeys["UPDATE_VIEW_MODE"] = "UPDATE_VIEW_MODE";
  ViewActionTypeKeys["SET_VISIBLE_CONTEXT_MENU_PANEL_ID"] = "SET_VISIBLE_CONTEXT_MENU_PANEL_ID";
  ViewActionTypeKeys["MAXIMIZE_PANEL"] = "MAXIMIZE_PANEL";
  ViewActionTypeKeys["MINIMIZE_PANEL"] = "MINIMIZE_PANEL";
  ViewActionTypeKeys["UPDATE_IS_FULL_SCREEN_MODE"] = "UPDATE_IS_FULL_SCREEN_MODE";
  ViewActionTypeKeys["UPDATE_USE_MARGINS"] = "UPDATE_USE_MARGINS";
  ViewActionTypeKeys["UPDATE_HIDE_PANEL_TITLES"] = "UPDATE_HIDE_PANEL_TITLES";
  ViewActionTypeKeys["UPDATE_TIME_RANGE"] = "UPDATE_TIME_RANGE";
  ViewActionTypeKeys["UPDATE_REFRESH_CONFIG"] = "UPDATE_REFRESH_CONFIG";
  ViewActionTypeKeys["UPDATE_FILTERS"] = "UPDATE_FILTERS";
  ViewActionTypeKeys["UPDATE_QUERY"] = "UPDATE_QUERY";
  ViewActionTypeKeys["CLOSE_CONTEXT_MENU"] = "CLOSE_CONTEXT_MENU";
})(ViewActionTypeKeys || (exports.ViewActionTypeKeys = ViewActionTypeKeys = {}));

var updateViewMode = (0, _reduxActions.createAction)(ViewActionTypeKeys.UPDATE_VIEW_MODE);
exports.updateViewMode = updateViewMode;
var closeContextMenu = (0, _reduxActions.createAction)(ViewActionTypeKeys.CLOSE_CONTEXT_MENU);
exports.closeContextMenu = closeContextMenu;
var setVisibleContextMenuPanelId = (0, _reduxActions.createAction)(ViewActionTypeKeys.SET_VISIBLE_CONTEXT_MENU_PANEL_ID);
exports.setVisibleContextMenuPanelId = setVisibleContextMenuPanelId;
var maximizePanel = (0, _reduxActions.createAction)(ViewActionTypeKeys.MAXIMIZE_PANEL);
exports.maximizePanel = maximizePanel;
var minimizePanel = (0, _reduxActions.createAction)(ViewActionTypeKeys.MINIMIZE_PANEL);
exports.minimizePanel = minimizePanel;
var updateIsFullScreenMode = (0, _reduxActions.createAction)(ViewActionTypeKeys.UPDATE_IS_FULL_SCREEN_MODE);
exports.updateIsFullScreenMode = updateIsFullScreenMode;
var updateUseMargins = (0, _reduxActions.createAction)(ViewActionTypeKeys.UPDATE_USE_MARGINS);
exports.updateUseMargins = updateUseMargins;
var updateHidePanelTitles = (0, _reduxActions.createAction)(ViewActionTypeKeys.UPDATE_HIDE_PANEL_TITLES);
exports.updateHidePanelTitles = updateHidePanelTitles;
var updateTimeRange = (0, _reduxActions.createAction)(ViewActionTypeKeys.UPDATE_TIME_RANGE);
exports.updateTimeRange = updateTimeRange;
var updateRefreshConfig = (0, _reduxActions.createAction)(ViewActionTypeKeys.UPDATE_REFRESH_CONFIG);
exports.updateRefreshConfig = updateRefreshConfig;
var updateFilters = (0, _reduxActions.createAction)(ViewActionTypeKeys.UPDATE_FILTERS);
exports.updateFilters = updateFilters;
var updateQuery = (0, _reduxActions.createAction)(ViewActionTypeKeys.UPDATE_QUERY);
exports.updateQuery = updateQuery;