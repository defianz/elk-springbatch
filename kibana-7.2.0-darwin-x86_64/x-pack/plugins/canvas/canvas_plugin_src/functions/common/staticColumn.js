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
function staticColumn() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().staticColumn;
    return {
        name: 'staticColumn',
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
            value: {
                types: ['string', 'number', 'boolean', 'null'],
                help: argHelp.value,
                default: null,
            },
        },
        fn: (context, args) => {
            const rows = context.rows.map(row => ({ ...row, [args.name]: args.value }));
            const type = common_1.getType(args.value);
            const columns = [...context.columns];
            const existingColumnIndex = columns.findIndex(({ name }) => name === args.name);
            const newColumn = { name: args.name, type };
            if (existingColumnIndex > -1) {
                columns[existingColumnIndex] = newColumn;
            }
            else {
                columns.push(newColumn);
            }
            return {
                type: 'datatable',
                columns,
                rows,
            };
        },
    };
}
exports.staticColumn = staticColumn;
