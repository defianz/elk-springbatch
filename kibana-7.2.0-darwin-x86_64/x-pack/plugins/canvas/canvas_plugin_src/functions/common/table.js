"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("../../strings");
function table() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().table;
    return {
        name: 'table',
        aliases: [],
        type: 'render',
        help,
        context: {
            types: ['datatable'],
        },
        args: {
            font: {
                types: ['style'],
                default: '{font}',
                help: argHelp.font,
            },
            paginate: {
                types: ['boolean'],
                default: true,
                help: argHelp.paginate,
                options: [true, false],
            },
            perPage: {
                types: ['number'],
                default: 10,
                help: argHelp.perPage,
            },
            showHeader: {
                types: ['boolean'],
                default: true,
                help: argHelp.showHeader,
                options: [true, false],
            },
        },
        fn: (context, args) => {
            return {
                type: 'render',
                as: 'table',
                value: {
                    datatable: context,
                    ...args,
                },
            };
        },
    };
}
exports.table = table;
