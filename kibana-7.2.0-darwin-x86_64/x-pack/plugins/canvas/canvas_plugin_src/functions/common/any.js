"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("../../strings");
function any() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().any;
    return {
        name: 'any',
        type: 'boolean',
        help,
        args: {
            condition: {
                aliases: ['_'],
                types: ['boolean', 'null'],
                required: true,
                multi: true,
                help: argHelp.condition,
            },
        },
        fn: (_context, args) => {
            const conditions = args.condition || [];
            return conditions.some(Boolean);
        },
    };
}
exports.any = any;
