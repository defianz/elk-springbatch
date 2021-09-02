"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore untyped Elastic library
const common_1 = require("@kbn/interpreter/common");
const strings_1 = require("../../strings");
function asFn() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().as;
    return {
        name: 'as',
        type: 'datatable',
        context: {
            types: ['string', 'boolean', 'number', 'null'],
        },
        help,
        args: {
            name: {
                types: ['string'],
                aliases: ['_'],
                help: argHelp.name,
                default: 'value',
            },
        },
        fn: (context, args) => {
            return {
                type: 'datatable',
                columns: [
                    {
                        name: args.name,
                        type: common_1.getType(context),
                    },
                ],
                rows: [
                    {
                        [args.name]: context,
                    },
                ],
            };
        },
    };
}
exports.asFn = asFn;
