"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const eui_theme_light_json_1 = tslib_1.__importDefault(require("@elastic/eui/dist/eui_theme_light.json"));
const react_1 = tslib_1.__importDefault(require("react"));
const react_sticky_1 = require("react-sticky");
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const super_date_picker_1 = require("../super_date_picker");
const offsetChrome = 49;
const gutterTimeline = '70px'; // Temporary until timeline is moved - MichaelMarcialis
const disableSticky = 'screen and (max-width: ' + eui_theme_light_json_1.default.euiBreakpoints.s + ')';
const disableStickyMq = window.matchMedia(disableSticky);
const Aside = styled_components_1.default.aside `
  ${props => `
    background: ${props.theme.eui.euiColorEmptyShade};
    border-bottom: ${props.theme.eui.euiBorderThin};
    box-sizing: content-box;
    margin: 0 -${gutterTimeline} 0 -${props.theme.eui.euiSizeL};
    padding: ${props.theme.eui.euiSize} ${gutterTimeline} ${props.theme.eui.euiSize} ${props.theme.eui.euiSizeL};

    ${props.isSticky &&
    `
      top: ${offsetChrome}px !important;
      z-index: ${props.theme.eui.euiZNavigation};
    `}

    @media only ${disableSticky} {
      position: static !important;
      z-index: ${props.theme.eui.euiZContent} !important;
    }
  `}
`;
// Temporary fix for EuiSuperDatePicker whitespace bug and auto width - Michael Marcialis
const FlexItemWithDatePickerFix = styled_components_1.default(eui_1.EuiFlexItem) `
  .euiSuperDatePicker__flexWrapper {
    max-width: none;
    width: auto;
  }
`;
exports.FiltersGlobal = recompose_1.pure(({ children }) => (react_1.default.createElement(react_sticky_1.Sticky, { disableCompensation: disableStickyMq.matches, topOffset: -offsetChrome }, ({ style, isSticky }) => (react_1.default.createElement(Aside, { isSticky: isSticky, style: style },
    react_1.default.createElement(eui_1.EuiFlexGroup, null,
        react_1.default.createElement(eui_1.EuiFlexItem, { grow: 8 }, children),
        react_1.default.createElement(FlexItemWithDatePickerFix, { grow: 4 },
            react_1.default.createElement(super_date_picker_1.SuperDatePicker, { id: "global" }))))))));
