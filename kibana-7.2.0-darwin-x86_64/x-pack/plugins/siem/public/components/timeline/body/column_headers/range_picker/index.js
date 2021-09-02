"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const ranges_1 = require("./ranges");
exports.rangePickerWidth = 120;
// TODO: Upgrade Eui library and use EuiSuperSelect
const SelectContainer = styled_components_1.default.div `
  cursor: pointer;
  width: ${exports.rangePickerWidth}px;
`;
/** Renders a time range picker for the MiniMap (e.g. 1 Day, 1 Week...) */
exports.RangePicker = recompose_1.pure(({ selected, onRangeSelected }) => {
    const onChange = (event) => {
        onRangeSelected(event.target.value);
    };
    return (React.createElement(SelectContainer, null,
        React.createElement(eui_1.EuiSelect, { "data-test-subj": "rangePicker", value: selected, options: ranges_1.Ranges.map(range => ({
                text: range,
            })), onChange: onChange })));
});
