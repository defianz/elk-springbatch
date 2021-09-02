"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const strings_1 = require("../../strings");
function sort() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().sort;
    return {
        name: 'sort',
        type: 'datatable',
        help,
        context: {
            types: ['datatable'],
        },
        args: {
            by: {
                types: ['string'],
                aliases: ['_', 'column'],
                multi: false,
                help: argHelp.by,
            },
            reverse: {
                types: ['boolean'],
                help: argHelp.reverse,
                options: [true, false],
            },
        },
        fn: (context, args) => {
            const column = args.by || context.columns[0].name;
            return {
                ...context,
                rows: args.reverse ? lodash_1.sortBy(context.rows, column).reverse() : lodash_1.sortBy(context.rows, column),
            };
        },
    };
}
exports.sort = sort;
