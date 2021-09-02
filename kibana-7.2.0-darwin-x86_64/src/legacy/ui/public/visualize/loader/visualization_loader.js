"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visualizationLoader = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _visualization = require("../components/visualization");

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
function renderVisualization(element, vis, visData, visParams, uiState, params) {
  return new Promise(function (resolve) {
    var listenOnChange = _lodash.default.get(params, 'listenOnChange', false);

    (0, _reactDom.render)(_react.default.createElement(_visualization.Visualization, {
      vis: vis,
      visData: visData,
      visParams: visParams,
      uiState: uiState,
      listenOnChange: listenOnChange,
      onInit: resolve
    }), element);
  });
}

function destroy(element) {
  if (element) {
    (0, _reactDom.unmountComponentAtNode)(element);
  }
}

var visualizationLoader = {
  render: renderVisualization,
  destroy: destroy
};
exports.visualizationLoader = visualizationLoader;