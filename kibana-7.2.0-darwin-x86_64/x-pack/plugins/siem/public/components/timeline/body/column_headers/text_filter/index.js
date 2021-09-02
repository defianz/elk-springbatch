"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const fp_1 = require("lodash/fp");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
exports.DEFAULT_PLACEHOLDER = 'Filter';
const FieldText = styled_components_1.default(eui_1.EuiFieldText) `
  min-width: ${props => props.minwidth};
`;
/** Renders a text-based column filter */
exports.TextFilter = recompose_1.pure(({ columnId, minWidth, filter = '', onFilterChange = fp_1.noop, placeholder = exports.DEFAULT_PLACEHOLDER, }) => {
    const onChange = (event) => {
        onFilterChange({ columnId, filter: event.target.value });
    };
    return (React.createElement(FieldText, { "data-test-subj": "textFilter", minwidth: `${minWidth}px`, placeholder: placeholder, value: filter, onChange: onChange }));
});
