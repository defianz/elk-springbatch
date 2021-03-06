"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelError = PanelError;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

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
function PanelError(_ref) {
  var error = _ref.error;
  return _react.default.createElement("div", {
    className: "dshPanel__error panel-content"
  }, _react.default.createElement(_eui.EuiText, {
    color: "subdued",
    size: "xs"
  }, _react.default.createElement(_eui.EuiIcon, {
    type: "alert",
    color: "danger"
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), error));
}