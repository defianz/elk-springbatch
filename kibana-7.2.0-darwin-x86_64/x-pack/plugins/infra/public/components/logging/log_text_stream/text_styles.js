"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const polished_1 = require("polished");
const react_1 = tslib_1.__importStar(require("react"));
const eui_styled_components_1 = tslib_1.__importStar(require("../../../../../../common/eui_styled_components"));
exports.monospaceTextStyle = (scale) => eui_styled_components_1.css `
  font-family: ${props => props.theme.eui.euiCodeFontFamily};
  font-size: ${props => {
    switch (scale) {
        case 'large':
            return props.theme.eui.euiFontSizeM;
        case 'medium':
            return props.theme.eui.euiFontSizeS;
        case 'small':
            return props.theme.eui.euiFontSizeXS;
        default:
            return props.theme.eui.euiFontSize;
    }
}}
  line-height: ${props => props.theme.eui.euiLineHeight};
`;
exports.hoveredContentStyle = eui_styled_components_1.css `
  background-color: ${props => props.theme.darkMode
    ? polished_1.transparentize(0.9, polished_1.darken(0.05, props.theme.eui.euiColorHighlight))
    : polished_1.darken(0.05, props.theme.eui.euiColorHighlight)};
`;
exports.useMeasuredCharacterDimensions = (scale) => {
    const [dimensions, setDimensions] = react_1.useState({
        height: 0,
        width: 0,
    });
    const measureElement = react_1.useCallback((element) => {
        if (!element) {
            return;
        }
        const boundingBox = element.getBoundingClientRect();
        setDimensions({
            height: boundingBox.height,
            width: boundingBox.width,
        });
    }, []);
    const CharacterDimensionsProbe = react_1.useMemo(() => () => (react_1.default.createElement(MonospaceCharacterDimensionsProbe, { scale: scale, innerRef: measureElement }, "X")), [scale]);
    return {
        CharacterDimensionsProbe,
        dimensions,
    };
};
const MonospaceCharacterDimensionsProbe = eui_styled_components_1.default.div.attrs({
    'aria-hidden': true,
}) `
  visibility: hidden;
  position: absolute;
  height: auto;
  width: auto;
  padding: 0;
  margin: 0;

  ${props => exports.monospaceTextStyle(props.scale)}
`;
