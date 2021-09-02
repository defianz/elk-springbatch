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
function formatdate() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().formatdate;
    return {
        name: 'formatdate',
        type: 'string',
        help,
        context: {
            types: ['number', 'string'],
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
                return moment_1.default.utc(new Date(context)).toISOString();
            }
            return moment_1.default.utc(new Date(context)).format(args.format);
        },
    };
}
exports.formatdate = formatdate;
