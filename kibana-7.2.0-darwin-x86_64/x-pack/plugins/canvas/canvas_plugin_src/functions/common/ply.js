"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const strings_1 = require("../../strings");
function ply() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().ply;
    return {
        name: 'ply',
        type: 'datatable',
        help,
        context: {
            types: ['datatable'],
        },
        args: {
            by: {
                types: ['string'],
                help: argHelp.by,
                multi: true,
            },
            expression: {
                types: ['datatable'],
                resolve: false,
                multi: true,
                aliases: ['fn', 'function'],
                help: argHelp.expression,
            },
        },
        fn: (context, args) => {
            if (!args) {
                return context;
            }
            let byColumns;
            let originalDatatables;
            if (args.by) {
                byColumns = args.by.map(by => {
                    const column = context.columns.find(col => col.name === by);
                    if (!column) {
                        throw new Error(`Column not found: '${by}'`);
                    }
                    return column;
                });
                const keyedDatatables = lodash_1.groupBy(context.rows, row => JSON.stringify(lodash_1.pick(row, args.by)));
                originalDatatables = Object.values(keyedDatatables).map(rows => ({
                    ...context,
                    rows,
                }));
            }
            else {
                originalDatatables = [context];
            }
            const datatablePromises = originalDatatables.map(originalDatatable => {
                let expressionResultPromises = [];
                if (args.expression) {
                    expressionResultPromises = args.expression.map(expression => expression(originalDatatable));
                }
                else {
                    expressionResultPromises.push(Promise.resolve(originalDatatable));
                }
                return Promise.all(expressionResultPromises).then(combineAcross);
            });
            return Promise.all(datatablePromises).then(newDatatables => {
                // Here we're just merging each for the by splits, so it doesn't actually matter if the rows are the same length
                const columns = combineColumns([byColumns].concat(lodash_1.map(newDatatables, 'columns')));
                const rows = lodash_1.flatten(newDatatables.map((dt, i) => {
                    const byColumnValues = lodash_1.pick(originalDatatables[i].rows[0], args.by);
                    return dt.rows.map(row => ({
                        ...byColumnValues,
                        ...row,
                    }));
                }));
                return {
                    type: 'datatable',
                    rows,
                    columns,
                };
            });
        },
    };
}
exports.ply = ply;
function combineColumns(arrayOfColumnsArrays) {
    return arrayOfColumnsArrays.reduce((resultingColumns, columns) => {
        if (columns) {
            columns.forEach(column => {
                if (resultingColumns.find(resultingColumn => resultingColumn.name === column.name)) {
                    return;
                }
                else {
                    resultingColumns.push(column);
                }
            });
        }
        return resultingColumns;
    }, []);
}
// This handles merging the tables produced by multiple expressions run on a single member of the `by` split.
// Thus all tables must be the same length, although their columns do not need to be the same, we will handle combining the columns
function combineAcross(datatableArray) {
    const [referenceTable] = datatableArray;
    const targetRowLength = referenceTable.rows.length;
    // Sanity check
    datatableArray.forEach(datatable => {
        if (datatable.rows.length !== targetRowLength) {
            throw new Error('All expressions must return the same number of rows');
        }
    });
    // Merge columns and rows.
    const arrayOfRowsArrays = lodash_1.map(datatableArray, 'rows');
    const rows = [];
    for (let i = 0; i < targetRowLength; i++) {
        const rowsAcross = lodash_1.map(arrayOfRowsArrays, i);
        // The reason for the Object.assign is that rowsAcross is an array
        // and those rows need to be applied as arguments to Object.assign
        rows.push(Object.assign({}, ...rowsAcross));
    }
    const columns = combineColumns(lodash_1.map(datatableArray, 'columns'));
    return {
        type: 'datatable',
        rows,
        columns,
    };
}
