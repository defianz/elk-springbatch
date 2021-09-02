"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore untyped local
const handlebars_1 = require("../../../common/lib/handlebars");
const strings_1 = require("../../strings");
function markdown() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().markdown;
    return {
        name: 'markdown',
        aliases: [],
        type: 'render',
        help,
        context: {
            types: ['datatable', 'null'],
        },
        args: {
            expression: {
                aliases: ['_'],
                types: ['string'],
                help: argHelp.expression,
                default: '""',
                multi: true,
            },
            font: {
                types: ['style'],
                help: argHelp.font,
                default: '{font}',
            },
        },
        fn: (context, args) => {
            const compileFunctions = args.expression.map(str => handlebars_1.Handlebars.compile(String(str), { knownHelpersOnly: true }));
            const ctx = {
                columns: [],
                rows: [],
                type: null,
                ...context,
            };
            return {
                type: 'render',
                as: 'markdown',
                value: {
                    content: compileFunctions.map(fn => fn(ctx)).join(''),
                    font: args.font,
                },
            };
        },
    };
}
exports.markdown = markdown;
