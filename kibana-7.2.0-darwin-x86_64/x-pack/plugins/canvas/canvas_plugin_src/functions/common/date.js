"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const strings_1 = require("../../strings");
function date() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().date;
    return {
        name: 'date',
        type: 'number',
        context: {
            types: ['null'],
        },
        help,
        args: {
            value: {
                aliases: ['_'],
                types: ['string', 'null'],
                help: argHelp.value,
            },
            format: {
                types: ['string'],
                help: argHelp.format,
            },
        },
        fn: (_context, args) => {
            const { value: argDate, format } = args;
            const outputDate = argDate && format
                ? moment_1.default.utc(argDate, format).toDate()
                : argDate
                    ? new Date(argDate)
                    : new Date();
            if (isNaN(outputDate.getTime())) {
                throw new Error(`Invalid date input: ${argDate}`);
            }
            return outputDate.valueOf();
        },
    };
}
exports.date = date;
