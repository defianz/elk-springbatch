"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelHeader = void 0;

var _react = require("@kbn/i18n/react");

var _classnames = _interopRequireDefault(require("classnames"));

var _react2 = _interopRequireDefault(require("react"));

var _panel_options_menu_container = require("./panel_options_menu_container");

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
function PanelHeaderUi(_ref) {
  var title = _ref.title,
      panelId = _ref.panelId,
      embeddable = _ref.embeddable,
      isViewOnlyMode = _ref.isViewOnlyMode,
      hidePanelTitles = _ref.hidePanelTitles,
      intl = _ref.intl;
  var classes = (0, _classnames.default)('dshPanel__header', {
    'dshPanel__header--floater': !title || hidePanelTitles
  });

  if (isViewOnlyMode && (!title || hidePanelTitles)) {
    return _react2.default.createElement("div", {
      className: classes
    }, _react2.default.createElement(_panel_options_menu_container.PanelOptionsMenuContainer, {
      panelId: panelId,
      embeddable: embeddable
    }));
  }

  return _react2.default.createElement("div", {
    className: classes,
    "data-test-subj": "dashboardPanelHeading-".concat((title || '').replace(/\s/g, ''))
  }, _react2.default.createElement("div", {
    "data-test-subj": "dashboardPanelTitle",
    className: "dshPanel__title dshPanel__dragger",
    title: title,
    "aria-label": intl.formatMessage({
      id: 'kbn.dashboard.panel.dashboardPanelAriaLabel',
      defaultMessage: 'Dashboard panel: {title}'
    }, {
      title: title
    })
  }, hidePanelTitles ? '' : title), _react2.default.createElement(_panel_options_menu_container.PanelOptionsMenuContainer, {
    panelId: panelId,
    embeddable: embeddable
  }));
}

var PanelHeader = (0, _react.injectI18n)(PanelHeaderUi);
exports.PanelHeader = PanelHeader;