"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../../../../graphql/types");
const helpers_1 = require("../../../../../lib/helpers");
/** Given a `header`, returns the `SortDirection` applicable to it */
exports.getNewSortDirectionOnClick = ({ clickedHeader, currentSort, }) => clickedHeader.id === currentSort.columnId ? exports.getNextSortDirection(currentSort) : types_1.Direction.desc;
/** Given a current sort direction, it returns the next sort direction */
exports.getNextSortDirection = (currentSort) => {
    switch (currentSort.sortDirection) {
        case types_1.Direction.desc:
            return types_1.Direction.asc;
        case types_1.Direction.asc:
            return types_1.Direction.desc;
        case 'none':
            return types_1.Direction.desc;
        default:
            return helpers_1.assertUnreachable(currentSort.sortDirection, 'Unhandled sort direction');
    }
};
exports.getSortDirection = ({ header, sort }) => header.id === sort.columnId ? sort.sortDirection : 'none';
