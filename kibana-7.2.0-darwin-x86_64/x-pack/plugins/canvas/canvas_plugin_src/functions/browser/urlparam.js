"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const strings_1 = require("../../strings");
function urlparam() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().urlparam;
    return {
        name: 'urlparam',
        aliases: [],
        type: 'string',
        help,
        context: {
            types: ['null'],
        },
        args: {
            param: {
                types: ['string'],
                aliases: ['_', 'var', 'variable'],
                help: argHelp.param,
                multi: false,
            },
            default: {
                types: ['string'],
                default: '""',
                help: argHelp.default,
            },
        },
        fn: (_context, args) => {
            const query = url_1.parse(window.location.href, true).query;
            return query[args.param] || args.default;
        },
    };
}
exports.urlparam = urlparam;
