"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// @ts-ignore Untyped library
const lodash_uniqby_1 = tslib_1.__importDefault(require("lodash.uniqby"));
// @ts-ignore Untyped Elastic library
const tinymath_1 = require("tinymath");
const lodash_1 = require("lodash");
const moment_1 = tslib_1.__importDefault(require("moment"));
// @ts-ignore Untyped local
const pivot_object_array_1 = require("../../../../common/lib/pivot_object_array");
// @ts-ignore Untyped local
const unquote_string_1 = require("../../../../common/lib/unquote_string");
// @ts-ignore Untyped local
const is_column_reference_1 = require("./lib/is_column_reference");
// @ts-ignore Untyped local
const get_expression_type_1 = require("./lib/get_expression_type");
const strings_1 = require("../../../strings");
// TODO: pointseries performs poorly, that's why we run it on the server.
const columnExists = (cols, colName) => cols.includes(unquote_string_1.unquoteString(colName));
function keysOf(obj) {
    return Object.keys(obj);
}
function pointseries() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().pointseries;
    return {
        name: 'pointseries',
        type: 'pointseries',
        help,
        context: {
            types: ['datatable'],
        },
        args: {
            x: {
                types: ['string', 'null'],
                help: argHelp.x,
            },
            y: {
                types: ['string', 'null'],
                help: argHelp.y,
            },
            color: {
                types: ['string', 'null'],
                help: argHelp.color,
            },
            size: {
                types: ['string', 'null'],
                help: argHelp.size,
            },
            text: {
                types: ['string', 'null'],
                help: argHelp.text,
            },
        },
        fn: (context, args) => {
            // Note: can't replace pivotObjectArray with datatableToMathContext, lose name of non-numeric columns
            const columnNames = context.columns.map(col => col.name);
            const mathScope = pivot_object_array_1.pivotObjectArray(context.rows, columnNames);
            const autoQuoteColumn = (col) => {
                if (!col || !columnNames.includes(col)) {
                    return col;
                }
                return col.match(/\s/) ? `'${col}'` : col;
            };
            const measureNames = [];
            const dimensions = [];
            const columns = {};
            // Separates args into dimensions and measures arrays
            // by checking if arg is a column reference (dimension)
            keysOf(args).forEach(argName => {
                const mathExp = autoQuoteColumn(args[argName]);
                if (mathExp != null && mathExp.trim() !== '') {
                    const col = {
                        type: '',
                        role: '',
                        expression: mathExp,
                    };
                    if (is_column_reference_1.isColumnReference(mathExp)) {
                        // TODO: Do something better if the column does not exist
                        if (!columnExists(columnNames, mathExp)) {
                            return;
                        }
                        dimensions.push({
                            name: argName,
                            value: mathExp,
                        });
                        col.type = get_expression_type_1.getExpressionType(context.columns, mathExp);
                        col.role = 'dimension';
                    }
                    else {
                        measureNames.push(argName);
                        col.type = 'number';
                        col.role = 'measure';
                    }
                    // @ts-ignore untyped local: get_expression_type
                    columns[argName] = col;
                }
            });
            const PRIMARY_KEY = '%%CANVAS_POINTSERIES_PRIMARY_KEY%%';
            const rows = context.rows.map((row, i) => ({
                ...row,
                [PRIMARY_KEY]: i,
            }));
            function normalizeValue(expression, value) {
                switch (get_expression_type_1.getExpressionType(context.columns, expression)) {
                    case 'string':
                        return String(value);
                    case 'number':
                        return Number(value);
                    case 'date':
                        return moment_1.default(value).valueOf();
                    default:
                        return value;
                }
            }
            // Dimensions
            // Group rows by their dimension values, using the argument values and preserving the PRIMARY_KEY
            // There's probably a better way to do this
            const results = rows.reduce((rowAcc, row, i) => {
                const newRow = dimensions.reduce((acc, { name, value }) => {
                    try {
                        acc[name] = args[name]
                            ? normalizeValue(value, tinymath_1.evaluate(value, mathScope)[i])
                            : '_all';
                    }
                    catch (e) {
                        // TODO: handle invalid column names...
                        // Do nothing if column does not exist
                        // acc[dimension] = '_all';
                    }
                    return acc;
                }, { [PRIMARY_KEY]: row[PRIMARY_KEY] });
                return Object.assign(rowAcc, { [row[PRIMARY_KEY]]: newRow });
            }, {});
            // Measures
            // First group up all of the distinct dimensioned bits. Each of these will be reduced to just 1 value
            // for each measure
            const measureKeys = lodash_1.groupBy(rows, row => dimensions
                .map(({ name }) => {
                const value = args[name];
                return value ? row[value] : '_all';
            })
                .join('::%BURLAP%::'));
            // Then compute that 1 value for each measure
            lodash_1.values(measureKeys).forEach(valueRows => {
                const subtable = { type: 'datatable', columns: context.columns, rows: valueRows };
                const subScope = pivot_object_array_1.pivotObjectArray(subtable.rows, subtable.columns.map(col => col.name));
                const measureValues = measureNames.map(measure => {
                    try {
                        const ev = tinymath_1.evaluate(args[measure], subScope);
                        if (Array.isArray(ev)) {
                            throw new Error('Expressions must be wrapped in a function such as sum()');
                        }
                        return ev;
                    }
                    catch (e) {
                        // TODO: don't catch if eval to Array
                        return null;
                    }
                });
                valueRows.forEach(row => {
                    Object.assign(results[row[PRIMARY_KEY]], lodash_1.zipObject(measureNames, measureValues));
                });
            });
            // It only makes sense to uniq the rows in a point series as 2 values can not exist in the exact same place at the same time.
            const resultingRows = lodash_uniqby_1.default(lodash_1.values(results).map(row => lodash_1.omit(row, PRIMARY_KEY)), JSON.stringify);
            return {
                type: 'pointseries',
                columns,
                rows: resultingRows,
            };
        },
    };
}
exports.pointseries = pointseries;
