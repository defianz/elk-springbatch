"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const react_1 = tslib_1.__importDefault(require("react"));
const eui_1 = require("@elastic/eui");
const common_1 = require("./common");
exports.ExpandedRow = ({ item }) => {
    const keys = common_1.getSelectableFields([item]);
    const list = keys.map(k => {
        const value = lodash_1.get(item._source, k, '');
        return (react_1.default.createElement("span", { key: k },
            react_1.default.createElement(eui_1.EuiBadge, null,
                k,
                ":"),
            react_1.default.createElement("small", null,
                " ",
                value,
                "\u00A0\u00A0")));
    });
    return react_1.default.createElement(eui_1.EuiText, null, list);
};
