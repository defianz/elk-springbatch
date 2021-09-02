"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const datemath_1 = tslib_1.__importDefault(require("@elastic/datemath"));
const strings_1 = require("../../strings");
function timefilter() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().timefilter;
    return {
        name: 'timefilter',
        aliases: [],
        type: 'filter',
        context: {
            types: ['filter'],
        },
        help,
        args: {
            column: {
                types: ['string'],
                aliases: ['field', 'c'],
                default: '@timestamp',
                help: argHelp.column,
            },
            from: {
                types: ['string', 'null'],
                aliases: ['f', 'start'],
                help: argHelp.from,
            },
            to: {
                types: ['string', 'null'],
                aliases: ['t', 'end'],
                help: argHelp.to,
            },
            filterGroup: {
                types: ['string', 'null'],
                help: 'Group name for the filter',
            },
        },
        fn: (context, args) => {
            if (!args.from && !args.to) {
                return context;
            }
            const { from, to, column } = args;
            const filter = {
                type: 'time',
                column,
                and: [],
            };
            function parseAndValidate(str) {
                const moment = datemath_1.default.parse(str);
                if (!moment || !moment.isValid()) {
                    throw new Error(`Invalid date/time string: '${str}'`);
                }
                return moment.toISOString();
            }
            if (!!to) {
                filter.to = parseAndValidate(to);
            }
            if (!!from) {
                filter.from = parseAndValidate(from);
            }
            return { ...context, and: [...context.and, filter] };
        },
    };
}
exports.timefilter = timefilter;
