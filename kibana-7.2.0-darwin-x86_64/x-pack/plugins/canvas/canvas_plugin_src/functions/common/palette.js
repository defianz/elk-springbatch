"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore untyped local
const palettes_1 = require("../../../common/lib/palettes");
const strings_1 = require("../../strings");
function palette() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().palette;
    return {
        name: 'palette',
        aliases: [],
        type: 'palette',
        help,
        context: {
            types: ['null'],
        },
        args: {
            color: {
                aliases: ['_'],
                multi: true,
                types: ['string'],
                help: argHelp.color,
            },
            gradient: {
                types: ['boolean'],
                default: false,
                help: argHelp.gradient,
                options: [true, false],
            },
            reverse: {
                types: ['boolean'],
                default: false,
                help: argHelp.reverse,
                options: [true, false],
            },
        },
        fn: (_context, args) => {
            const { color, reverse, gradient } = args;
            const colors = [].concat(color || palettes_1.palettes.paul_tor_14.colors);
            return {
                type: 'palette',
                colors: reverse ? colors.reverse() : colors,
                gradient,
            };
        },
    };
}
exports.palette = palette;
