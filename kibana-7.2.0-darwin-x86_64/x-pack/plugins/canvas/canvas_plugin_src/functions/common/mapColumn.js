"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore untyped Elastic library
const common_1 = require("@kbn/interpreter/common");
const strings_1 = require("../../strings");
function mapColumn() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().mapColumn;
    return {
        name: 'mapColumn',
        aliases: ['mc'],
        type: 'datatable',
        help,
        context: {
            types: ['datatable'],
        },
        args: {
            name: {
                types: ['string'],
                aliases: ['_', 'column'],
                help: argHelp.name,
                required: true,
            },
            expression: {
                types: ['boolean', 'number', 'string', 'null'],
                resolve: false,
                aliases: ['exp', 'fn'],
                help: argHelp.expression,
            },
        },
        fn: (context, args) => {
            const expression = args.expression || (() => Promise.resolve(null));
            const columns = [...context.columns];
            const rowPromises = context.rows.map(row => {
                return expression({
                    type: 'datatable',
                    columns,
                    rows: [row],
                }).then(val => ({
                    ...row,
                    [args.name]: val,
                }));
            });
            return Promise.all(rowPromises).then(rows => {
                const existingColumnIndex = columns.findIndex(({ name }) => name === args.name);
                const type = rows.length ? common_1.getType(rows[0][args.name]) : 'null';
                const newColumn = { name: args.name, type };
                if (existingColumnIndex === -1) {
                    columns.push(newColumn);
                }
                else {
                    columns[existingColumnIndex] = newColumn;
                }
                return {
                    type: 'datatable',
                    columns,
                    rows,
                };
            });
        },
    };
}
exports.mapColumn = mapColumn;
