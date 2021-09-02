"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisHelpText = void 0;

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

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
var VisHelpText = function VisHelpText(_ref) {
  var visType = _ref.visType;
  return _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react2.default.createElement("h2", null, visType.title)), _react2.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react2.default.createElement("div", {
    id: "visTypeDescription-".concat(visType.name)
  }, visType.stage === 'experimental' && _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_eui.EuiText, null, _react2.default.createElement("em", null, _react2.default.createElement(_react.FormattedMessage, {
    id: "kbn.visualize.newVisWizard.experimentalDescription",
    defaultMessage: "This visualization is experimental. The design and implementation are less mature than stable visualizations and might be subject to change."
  }))), _react2.default.createElement(_eui.EuiSpacer, {
    size: "s"
  })), _react2.default.createElement(_eui.EuiText, null, visType.description)));
};

exports.VisHelpText = VisHelpText;