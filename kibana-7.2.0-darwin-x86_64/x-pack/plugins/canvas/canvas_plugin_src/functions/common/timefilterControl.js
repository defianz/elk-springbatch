"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("../../strings");
function timefilterControl() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().timefilterControl;
    return {
        name: 'timefilterControl',
        aliases: [],
        type: 'render',
        context: {
            types: ['null'],
        },
        help,
        args: {
            column: {
                types: ['string'],
                aliases: ['field', 'c'],
                help: argHelp.column,
            },
            compact: {
                types: ['boolean'],
                help: argHelp.compact,
                default: true,
                options: [true, false],
            },
            filterGroup: {
                types: ['string', 'null'],
                help: argHelp.filterGroup,
            },
        },
        fn: (_context, args) => {
            return {
                type: 'render',
                as: 'time_filter',
                value: args,
            };
        },
    };
}
exports.timefilterControl = timefilterControl;
