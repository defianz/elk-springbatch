"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelHeaderContainer = void 0;

var _reactRedux = require("react-redux");

var _dashboard_view_mode = require("../../dashboard_view_mode");

var _panel_header = require("./panel_header");

var _selectors = require("../../selectors");

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
var mapStateToProps = function mapStateToProps(_ref, _ref2) {
  var dashboard = _ref.dashboard;
  var panelId = _ref2.panelId;
  var panel = (0, _selectors.getPanel)(dashboard, panelId);
  var embeddableTitle = (0, _selectors.getEmbeddableTitle)(dashboard, panelId);
  return {
    title: panel.title === undefined ? embeddableTitle : panel.title,
    isExpanded: (0, _selectors.getMaximizedPanelId)(dashboard) === panelId,
    isViewOnlyMode: (0, _selectors.getFullScreenMode)(dashboard) || (0, _selectors.getViewMode)(dashboard) === _dashboard_view_mode.DashboardViewMode.VIEW,
    hidePanelTitles: (0, _selectors.getHidePanelTitles)(dashboard)
  };
};

var PanelHeaderContainer = (0, _reactRedux.connect)(mapStateToProps)(_panel_header.PanelHeader);
exports.PanelHeaderContainer = PanelHeaderContainer;