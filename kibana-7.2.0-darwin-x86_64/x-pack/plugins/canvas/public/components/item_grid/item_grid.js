"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
const react_1 = tslib_1.__importStar(require("react"));
const PER_ROW_DEFAULT = 6;
exports.ItemGrid = function ItemGridFunc({ items = [], itemsPerRow = PER_ROW_DEFAULT, children, }) {
    const reducedRows = items.reduce((rows, item) => {
        if (lodash_1.last(rows).length >= itemsPerRow) {
            rows.push([]);
        }
        lodash_1.last(rows).push(children(item));
        return rows;
    }, [[]]);
    return (react_1.default.createElement(react_1.Fragment, null, reducedRows.map((row, i) => (react_1.default.createElement("div", { key: `item-grid-row-${i}`, className: "item-grid-row" }, row)))));
};
exports.ItemGrid.propTypes = {
    items: prop_types_1.default.array,
    itemsPerRow: prop_types_1.default.number,
    children: prop_types_1.default.func.isRequired,
};
