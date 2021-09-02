"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const lodash_1 = require("lodash");
const eui_1 = require("@elastic/eui");
const FormattedValue_1 = require("./FormattedValue");
/**
 * Converts a deeply-nested object into a one-level object
 * with dot-notation paths as keys.
 */
function pathify(item, { maxDepth, parentKey = '', depth = 0 }) {
    return Object.keys(item)
        .sort()
        .reduce((pathified, key) => {
        const currentKey = lodash_1.compact([parentKey, key]).join('.');
        if ((!maxDepth || depth + 1 <= maxDepth) && lodash_1.isObject(item[key])) {
            return {
                ...pathified,
                ...pathify(item[key], {
                    maxDepth,
                    parentKey: currentKey,
                    depth: depth + 1
                })
            };
        }
        else {
            return { ...pathified, [currentKey]: item[key] };
        }
    }, {});
}
exports.pathify = pathify;
function DottedKeyValueTable({ data, parentKey, maxDepth, tableProps = {} }) {
    const pathified = pathify(data, { maxDepth, parentKey });
    const rows = Object.keys(pathified)
        .sort()
        .map(k => [k, pathified[k]]);
    return (react_1.default.createElement(eui_1.EuiTable, Object.assign({ compressed: true }, tableProps),
        react_1.default.createElement(eui_1.EuiTableBody, null, rows.map(([key, value]) => (react_1.default.createElement(eui_1.EuiTableRow, { key: key },
            react_1.default.createElement(eui_1.EuiTableRowCell, null,
                react_1.default.createElement("strong", { "data-testid": "dot-key" }, key)),
            react_1.default.createElement(eui_1.EuiTableRowCell, { "data-testid": "value" },
                react_1.default.createElement(FormattedValue_1.FormattedValue, { value: value }))))))));
}
exports.DottedKeyValueTable = DottedKeyValueTable;
