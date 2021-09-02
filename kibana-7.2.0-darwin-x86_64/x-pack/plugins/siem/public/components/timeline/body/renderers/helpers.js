"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
exports.deleteItemIdx = (data, idx) => [
    ...data.slice(0, idx),
    ...data.slice(idx + 1),
];
exports.findItem = (data, field) => data.findIndex(d => d.field === field);
exports.getValues = (field, data) => {
    const obj = data.find(d => d.field === field);
    if (obj != null && obj.value != null) {
        return obj.value;
    }
    return undefined;
};
exports.Details = styled_components_1.default.div `
  margin: 10px 0 10px 10px;
`;
exports.TokensFlexItem = styled_components_1.default(eui_1.EuiFlexItem) `
  margin-left: 3px;
`;
exports.Row = styled_components_1.default.div `
  width: 100%;
  overflow: hidden;
  &:hover {
    background-color: ${props => props.theme.eui.euiTableHoverColor};
  }
`;
