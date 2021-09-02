"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisTypeIcon = void 0;

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

/**
 * This renders the icon for a specific visualization type.
 * This currently checks the following:
 * - If visType.image is set, use that as the `src` of an image
 * - Otherwise use the visType.icon as an EuiIcon or the 'empty' icon if that's not set
 */
var VisTypeIcon = function VisTypeIcon(_ref) {
  var visType = _ref.visType;
  return _react.default.createElement(_react.default.Fragment, null, visType.image && _react.default.createElement("img", {
    src: visType.image,
    "aria-hidden": "true",
    role: "presentation",
    alt: "",
    className: "visNewVisDialog__typeImage"
  }), !visType.image && _react.default.createElement(_eui.EuiIcon, {
    type: visType.icon || 'empty',
    size: "l",
    color: "secondary",
    "aria-hidden": "true"
  }));
};

exports.VisTypeIcon = VisTypeIcon;