"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const polished_1 = require("polished");
const react_1 = tslib_1.__importDefault(require("react"));
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../common/eui_styled_components"));
class SuggestionItem extends react_1.default.PureComponent {
    render() {
        const { isSelected, onClick, onMouseEnter, suggestion } = this.props;
        return (react_1.default.createElement(SuggestionItemContainer, { isSelected: isSelected, onClick: onClick, onMouseEnter: onMouseEnter, "data-test-subj": "suggestion-item" },
            react_1.default.createElement(SuggestionItemIconField, { suggestionType: suggestion.type },
                react_1.default.createElement(eui_1.EuiIcon, { type: getEuiIconType(suggestion.type) })),
            react_1.default.createElement(SuggestionItemTextField, null, suggestion.text),
            react_1.default.createElement(SuggestionItemDescriptionField, null, suggestion.description)));
    }
}
SuggestionItem.defaultProps = {
    isSelected: false,
};
exports.SuggestionItem = SuggestionItem;
const SuggestionItemContainer = eui_styled_components_1.default.div `
  display: flex;
  flex-direction: row;
  font-size: ${props => props.theme.eui.euiFontSizeS};
  height: ${props => props.theme.eui.euiSizeXL};
  white-space: nowrap;
  background-color: ${props => props.isSelected ? props.theme.eui.euiColorLightestShade : 'transparent'};
`;
const SuggestionItemField = eui_styled_components_1.default.div `
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  height: ${props => props.theme.eui.euiSizeXL};
  padding: ${props => props.theme.eui.euiSizeXS};
`;
const SuggestionItemIconField = SuggestionItemField.extend `
  background-color: ${props => polished_1.transparentize(0.9, getEuiIconColor(props.theme, props.suggestionType))};
  color: ${props => getEuiIconColor(props.theme, props.suggestionType)};
  flex: 0 0 auto;
  justify-content: center;
  width: ${props => props.theme.eui.euiSizeXL};
`;
const SuggestionItemTextField = SuggestionItemField.extend `
  flex: 2 0 0;
  font-family: ${props => props.theme.eui.euiCodeFontFamily};
`;
const SuggestionItemDescriptionField = SuggestionItemField.extend `
  flex: 3 0 0;

  p {
    display: inline;

    span {
      font-family: ${props => props.theme.eui.euiCodeFontFamily};
    }
  }
`;
const getEuiIconType = (suggestionType) => {
    switch (suggestionType) {
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
            return 'empty';
    }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getEuiIconColor = (theme, suggestionType) => {
    switch (suggestionType) {
        case 'field':
            return theme.eui.euiColorVis7;
        case 'value':
            return theme.eui.euiColorVis0;
        case 'operator':
            return theme.eui.euiColorVis1;
        case 'conjunction':
            return theme.eui.euiColorVis2;
        case 'recentSearch':
        default:
            return theme.eui.euiColorMediumShade;
    }
};
