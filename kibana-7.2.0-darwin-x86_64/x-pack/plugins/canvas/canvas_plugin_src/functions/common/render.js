"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("../../strings");
function render() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().render;
    return {
        name: 'render',
        aliases: [],
        type: 'render',
        help,
        context: {
            types: ['render'],
        },
        args: {
            as: {
                types: ['string', 'null'],
                help: argHelp.as,
                options: ['debug', 'error', 'image', 'pie', 'plot', 'shape', 'table', 'text'],
            },
            css: {
                types: ['string', 'null'],
                default: '"* > * {}"',
                help: argHelp.css,
            },
            containerStyle: {
                types: ['containerStyle', 'null'],
                help: argHelp.containerStyle,
            },
        },
        fn: (context, args) => {
            return {
                ...context,
                as: args.as || context.as,
                css: args.css,
                containerStyle: args.containerStyle,
            };
        },
    };
}
exports.render = render;
