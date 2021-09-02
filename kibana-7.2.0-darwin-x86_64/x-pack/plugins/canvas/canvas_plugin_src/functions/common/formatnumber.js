"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const numeral_1 = tslib_1.__importDefault(require("@elastic/numeral"));
const strings_1 = require("../../strings");
function formatnumber() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().formatnumber;
    return {
        name: 'formatnumber',
        type: 'string',
        help,
        context: {
            types: ['number'],
        },
        args: {
            format: {
                aliases: ['_'],
                types: ['string'],
                help: argHelp.format,
            },
        },
        fn: (context, args) => {
            if (!args.format) {
                return String(context);
            }
            return numeral_1.default(context).format(args.format);
        },
    };
}
exports.formatnumber = formatnumber;
