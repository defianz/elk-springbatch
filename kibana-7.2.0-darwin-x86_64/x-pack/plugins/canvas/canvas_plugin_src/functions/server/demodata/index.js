"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
// @ts-ignore
const query_1 = require("../../../../common/lib/datatable/query");
// @ts-ignore
const get_demo_rows_1 = require("./get_demo_rows");
const strings_1 = require("../../../strings");
function demodata() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().demodata;
    return {
        name: 'demodata',
        aliases: [],
        type: 'datatable',
        help,
        context: {
            types: ['filter'],
        },
        args: {
            type: {
                types: ['string', 'null'],
                aliases: ['_'],
                help: argHelp.type,
                default: 'ci',
                options: ['ci', 'shirts'],
            },
        },
        fn: (context, args) => {
            const demoRows = get_demo_rows_1.getDemoRows(args.type);
            let set = {};
            if (args.type === 'ci') {
                set = {
                    columns: [
                        { name: '@timestamp', type: 'date' },
                        { name: 'time', type: 'date' },
                        { name: 'cost', type: 'number' },
                        { name: 'username', type: 'string' },
                        { name: 'price', type: 'number' },
                        { name: 'age', type: 'number' },
                        { name: 'country', type: 'string' },
                        { name: 'state', type: 'string' },
                        { name: 'project', type: 'string' },
                        { name: 'percent_uptime', type: 'number' },
                    ],
                    rows: lodash_1.sortBy(demoRows, 'time'),
                };
            }
            else if (args.type === 'shirts') {
                set = {
                    columns: [
                        { name: 'size', type: 'string' },
                        { name: 'color', type: 'string' },
                        { name: 'price', type: 'number' },
                        { name: 'cut', type: 'string' },
                    ],
                    rows: demoRows,
                };
            }
            const { columns, rows } = set;
            return query_1.queryDatatable({
                type: 'datatable',
                columns,
                rows,
            }, context);
        },
    };
}
exports.demodata = demodata;
