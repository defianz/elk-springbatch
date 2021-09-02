"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuggestionComponent = void 0;

var _eui = require("@elastic/eui");

var _classnames = _interopRequireDefault(require("classnames"));

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
function getEuiIconType(type) {
  switch (type) {
    case 'field':
      return 'kqlField';

    case 'value':
      return 'kqlValue';

    case 'recentSearch':
      return 'search';

    case 'conjunction':
      return 'kqlSelector';

    case 'operator':
      return 'kqlOperand';

    default:
      throw new Error("Unknown type: ".concat(type));
  }
}

var SuggestionComponent = function SuggestionComponent(props) {
  return (// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus
    _react.default.createElement("div", {
      className: (0, _classnames.default)({
        kbnTypeahead__item: true,
        active: props.selected
      }),
      role: "option",
      onClick: function onClick() {
        return props.onClick(props.suggestion);
      },
      onMouseEnter: props.onMouseEnter,
      ref: props.innerRef,
      id: props.ariaId,
      "aria-selected": props.selected
    }, _react.default.createElement("div", {
      className: 'kbnSuggestionItem kbnSuggestionItem--' + props.suggestion.type
    }, _react.default.createElement("div", {
      className: "kbnSuggestionItem__type"
    }, _react.default.createElement(_eui.EuiIcon, {
      type: getEuiIconType(props.suggestion.type)
    })), _react.default.createElement("div", {
      className: "kbnSuggestionItem__text"
    }, props.suggestion.text), _react.default.createElement("div", {
      className: "kbnSuggestionItem__description"
    }, props.suggestion.description)))
  );
};

exports.SuggestionComponent = SuggestionComponent;