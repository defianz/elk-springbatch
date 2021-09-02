"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fp_1 = require("lodash/fp");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const text_filter_1 = require("../text_filter");
/** Renders a header's filter, based on the `columnHeaderType` */
exports.Filter = recompose_1.pure(({ header, onFilterChange = fp_1.noop }) => {
    switch (header.columnHeaderType) {
        case 'text-filter':
            return (React.createElement(text_filter_1.TextFilter, { columnId: header.id, minWidth: header.width, onFilterChange: onFilterChange, placeholder: header.placeholder }));
        case 'not-filtered': // fall through
        default:
            return null;
    }
});
