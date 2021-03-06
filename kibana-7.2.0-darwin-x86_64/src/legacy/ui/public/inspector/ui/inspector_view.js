"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InspectorView = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

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

/**
 * The InspectorView component should be the top most element in every implemented
 * inspector view. It makes sure, that the appropriate stylings are applied to the
 * view.
 */
var InspectorView = function InspectorView(_ref) {
  var useFlex = _ref.useFlex,
      children = _ref.children;
  var classes = (0, _classnames.default)({
    'kbnInspectorView--flex': Boolean(useFlex)
  });
  return _react.default.createElement(_eui.EuiFlyoutBody, {
    className: classes
  }, children);
};

exports.InspectorView = InspectorView;
InspectorView.propTypes = {
  /**
   * Set to true if the element should have display: flex set.
   */
  useFlex: _propTypes.default.bool
};