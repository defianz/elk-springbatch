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
function rounddate() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().rounddate;
    return {
        name: 'rounddate',
        type: 'number',
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
                return context;
            }
            return moment_1.default.utc(moment_1.default.utc(context).format(args.format), args.format).valueOf();
        },
    };
}
exports.rounddate = rounddate;
