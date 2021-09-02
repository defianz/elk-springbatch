"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("../../strings");
function switchFn() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().switch;
    return {
        name: 'switch',
        help,
        args: {
            case: {
                types: ['case'],
                aliases: ['_'],
                resolve: false,
                multi: true,
                help: argHelp.case,
            },
            default: {
                aliases: ['finally'],
                resolve: false,
                help: argHelp.default,
            },
        },
        fn: async (context, args) => {
            const cases = args.case || [];
            for (let i = 0; i < cases.length; i++) {
                const { matches, result } = await cases[i]();
                if (matches) {
                    return result;
                }
            }
            if (typeof args.default !== 'undefined') {
                return await args.default();
            }
            return context;
        },
    };
}
exports.switchFn = switchFn;
