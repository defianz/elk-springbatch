"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateIndexPatternPrompt = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

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
var CreateIndexPatternPrompt = function CreateIndexPatternPrompt(_ref) {
  var onClose = _ref.onClose;
  return _react2.default.createElement(_eui.EuiFlyout, {
    size: "s",
    onClose: onClose,
    "data-test-subj": "CreateIndexPatternPrompt"
  }, _react2.default.createElement(_eui.EuiFlyoutHeader, {
    hasBorder: true
  }, _react2.default.createElement(_eui.EuiText, {
    grow: false
  }, _react2.default.createElement("h2", null, _react2.default.createElement(_react.FormattedMessage, {
    id: "kbn.management.indexPatternPrompt.title",
    defaultMessage: "About index patterns"
  })))), _react2.default.createElement(_eui.EuiFlyoutBody, null, _react2.default.createElement(_eui.EuiText, {
    textAlign: "left"
  }, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
    id: "kbn.management.indexPatternPrompt.subtitle",
    defaultMessage: "Index patterns allow you to bucket disparate data sources together so their shared fields may be queried in Kibana."
  }))), _react2.default.createElement(_eui.EuiHorizontalRule, {
    margin: "l"
  }), _react2.default.createElement(_eui.EuiText, {
    textAlign: "left"
  }, _react2.default.createElement("h3", null, _react2.default.createElement(_react.FormattedMessage, {
    id: "kbn.management.indexPatternPrompt.examplesTitle",
    defaultMessage: "Examples of index patterns"
  }))), _react2.default.createElement(_eui.EuiSpacer, null), _react2.default.createElement(_eui.EuiDescriptionList, {
    className: "indexPatternListPrompt__descList"
  }, _react2.default.createElement(_eui.EuiDescriptionListTitle, null, _react2.default.createElement(_react.FormattedMessage, {
    id: "kbn.management.indexPatternPrompt.exampleOneTitle",
    defaultMessage: "Single data source"
  })), _react2.default.createElement(_eui.EuiDescriptionListDescription, null, _react2.default.createElement(_react.FormattedMessage, {
    id: "kbn.management.indexPatternPrompt.exampleOne",
    defaultMessage: "Index a single data source named log-west-001 so you can build charts or query its contents fast."
  })), _react2.default.createElement(_eui.EuiDescriptionListTitle, null, _react2.default.createElement(_react.FormattedMessage, {
    id: "kbn.management.indexPatternPrompt.exampleTwoTitle",
    defaultMessage: "Multiple data sources"
  })), _react2.default.createElement(_eui.EuiDescriptionListDescription, null, _react2.default.createElement(_react.FormattedMessage, {
    id: "kbn.management.indexPatternPrompt.exampleTwo",
    defaultMessage: "Group all incoming data sources starting with log-west* so you can query against all your west coast server logs."
  })), _react2.default.createElement(_eui.EuiDescriptionListTitle, null, _react2.default.createElement(_react.FormattedMessage, {
    id: "kbn.management.indexPatternPrompt.exampleThreeTitle",
    defaultMessage: "Custom groupings"
  })), _react2.default.createElement(_eui.EuiDescriptionListDescription, null, _react2.default.createElement(_react.FormattedMessage, {
    id: "kbn.management.indexPatternPrompt.exampleThree",
    defaultMessage: "Specifically group your archived, monthly, roll-up metrics of those logs into a separate index pattern so you can aggregate historical trends to compare."
  })))));
};

exports.CreateIndexPatternPrompt = CreateIndexPatternPrompt;