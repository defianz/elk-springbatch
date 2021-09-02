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
const types_1 = require("../../../../graphql/types");
var SortDirectionIndicatorEnum;
(function (SortDirectionIndicatorEnum) {
    SortDirectionIndicatorEnum["SORT_UP"] = "sortUp";
    SortDirectionIndicatorEnum["SORT_DOWN"] = "sortDown";
})(SortDirectionIndicatorEnum || (SortDirectionIndicatorEnum = {}));
/** Returns the symbol that corresponds to the specified `SortDirection` */
exports.getDirection = (sortDirection) => {
    switch (sortDirection) {
        case types_1.Direction.asc:
            return SortDirectionIndicatorEnum.SORT_UP;
        case types_1.Direction.desc:
            return SortDirectionIndicatorEnum.SORT_DOWN;
        case 'none':
            return undefined;
        default:
            throw new Error('Unhandled sort direction');
    }
};
/** Renders a sort indicator */
exports.SortIndicator = recompose_1.pure(({ sortDirection }) => (React.createElement(eui_1.EuiIcon, { "data-test-subj": "sortIndicator", type: exports.getDirection(sortDirection) })));
