"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const strings_1 = require("../../strings");
function head() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().head;
    return {
        name: 'head',
        aliases: [],
        type: 'datatable',
        help,
        context: {
            types: ['datatable'],
        },
        args: {
            count: {
                aliases: ['_'],
                types: ['number'],
                help: argHelp.count,
                default: 1,
            },
        },
        fn: (context, args) => ({
            ...context,
            rows: lodash_1.take(context.rows, args.count),
        }),
    };
}
exports.head = head;
