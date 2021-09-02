"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DashboardPanelContainer = void 0;

var _i18n = require("@kbn/i18n");

var _reactRedux = require("react-redux");

var _actions = require("../actions");

var _dashboard_view_mode = require("../dashboard_view_mode");

var _selectors = require("../selectors");

var _dashboard_panel = require("./dashboard_panel");

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
  var embeddableFactory = _ref2.embeddableFactory,
      panelId = _ref2.panelId;
  var embeddable = (0, _selectors.getEmbeddable)(dashboard, panelId);
  var error = null;

  if (!embeddableFactory) {
    var panelType = (0, _selectors.getPanelType)(dashboard, panelId);
    error = _i18n.i18n.translate('kbn.dashboard.panel.noFoundEmbeddableFactoryErrorMessage', {
      defaultMessage: 'No embeddable factory found for panel type {panelType}',
      values: {
        panelType: panelType
      }
    });
  } else {
    error = embeddable && (0, _selectors.getEmbeddableError)(dashboard, panelId) || '';
  }

  var lastReloadRequestTime = embeddable ? embeddable.lastReloadRequestTime : 0;
  var initialized = embeddable ? (0, _selectors.getEmbeddableInitialized)(dashboard, panelId) : false;
  return {
    error: error,
    viewOnlyMode: (0, _selectors.getFullScreenMode)(dashboard) || (0, _selectors.getViewMode)(dashboard) === _dashboard_view_mode.DashboardViewMode.VIEW,
    containerState: (0, _selectors.getContainerState)(dashboard, panelId),
    initialized: initialized,
    panel: (0, _selectors.getPanel)(dashboard, panelId),
    lastReloadRequestTime: lastReloadRequestTime
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref3) {
  var panelId = _ref3.panelId;
  return {
    destroy: function destroy() {
      return dispatch((0, _actions.deletePanel)(panelId));
    },
    embeddableIsInitializing: function embeddableIsInitializing() {
      return dispatch((0, _actions.embeddableIsInitializing)(panelId));
    },
    embeddableIsInitialized: function embeddableIsInitialized(metadata) {
      return dispatch((0, _actions.embeddableIsInitialized)({
        panelId: panelId,
        metadata: metadata
      }));
    },
    embeddableStateChanged: function embeddableStateChanged(embeddableState) {
      return dispatch((0, _actions.embeddableStateChanged)({
        panelId: panelId,
        embeddableState: embeddableState
      }));
    },
    embeddableError: function embeddableError(errorMessage) {
      return dispatch((0, _actions.embeddableError)({
        panelId: panelId,
        error: errorMessage
      }));
    }
  };
};

var DashboardPanelContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_dashboard_panel.DashboardPanel);
exports.DashboardPanelContainer = DashboardPanelContainer;