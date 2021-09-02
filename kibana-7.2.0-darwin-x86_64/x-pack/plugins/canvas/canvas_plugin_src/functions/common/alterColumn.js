"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const strings_1 = require("../../strings");
function alterColumn() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().alterColumn;
    return {
        name: 'alterColumn',
        type: 'datatable',
        help,
        context: {
            types: ['datatable'],
        },
        args: {
            column: {
                aliases: ['_'],
                types: ['string'],
                help: argHelp.column,
            },
            type: {
                types: ['string'],
                help: argHelp.type,
                default: null,
                options: ['null', 'boolean', 'number', 'string'],
            },
            name: {
                types: ['string', 'null'],
                help: argHelp.name,
                default: null,
            },
        },
        fn: (context, args) => {
            if (!args.column || (!args.type && !args.name)) {
                return context;
            }
            const column = context.columns.find(col => col.name === args.column);
            if (!column) {
                throw new Error(`Column not found: '${args.column}'`);
            }
            const name = args.name || column.name;
            const type = args.type || column.type;
            const columns = context.columns.reduce((all, col) => {
                if (col.name !== args.name) {
                    if (col.name !== column.name) {
                        all.push(col);
                    }
                    else {
                        all.push({ name, type });
                    }
                }
                return all;
            }, []);
            let handler = (val) => val;
            if (args.type) {
                handler = (function getHandler() {
                    switch (type) {
                        case 'string':
                            if (column.type === 'date') {
                                return (v) => new Date(v).toISOString();
                            }
                            return String;
                        case 'number':
                            return Number;
                        case 'date':
                            return (v) => new Date(v).valueOf();
                        case 'boolean':
                            return Boolean;
                        case 'null':
                            return () => null;
                        default:
                            throw new Error(`Cannot convert to '${type}'`);
                    }
                })();
            }
            const rows = context.rows.map(row => ({
                ...lodash_1.omit(row, column.name),
                [name]: handler(row[column.name]),
            }));
            return {
                type: 'datatable',
                columns,
                rows,
            };
        },
    };
}
exports.alterColumn = alterColumn;
