"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const strings_1 = require("../../strings");
function columns() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().columns;
    return {
        name: 'columns',
        type: 'datatable',
        help,
        context: {
            types: ['datatable'],
        },
        args: {
            include: {
                types: ['string'],
                help: argHelp.include,
                default: null,
            },
            exclude: {
                types: ['string'],
                help: argHelp.exclude,
                default: null,
            },
        },
        fn: (context, args) => {
            const { include, exclude } = args;
            const { columns: contextColumns, rows: contextRows, ...rest } = context;
            let result = { ...context };
            if (exclude) {
                const fields = exclude.split(',').map(field => field.trim());
                const cols = contextColumns.filter(col => !fields.includes(col.name));
                const rows = cols.length > 0 ? contextRows.map(row => lodash_1.omit(row, fields)) : [];
                result = { rows, columns: cols, ...rest };
            }
            if (include) {
                const fields = include.split(',').map(field => field.trim());
                // const columns = result.columns.filter(col => fields.includes(col.name));
                // Include columns in the order the user specified
                const cols = [];
                fields.forEach(field => {
                    const column = lodash_1.find(result.columns, { name: field });
                    if (column) {
                        cols.push(column);
                    }
                });
                const rows = cols.length > 0 ? result.rows.map(row => lodash_1.pick(row, fields)) : [];
                result = { rows, columns: cols, ...rest };
            }
            return result;
        },
    };
}
exports.columns = columns;
