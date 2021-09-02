"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// @ts-ignore no @typed def
const inline_style_1 = tslib_1.__importDefault(require("inline-style"));
const fonts_1 = require("../../../common/lib/fonts");
const strings_1 = require("../../strings");
const types_1 = require("../types");
function font() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().font;
    return {
        name: 'font',
        aliases: [],
        type: 'style',
        help,
        context: {
            types: ['null'],
        },
        args: {
            align: {
                default: 'left',
                help: argHelp.align,
                options: types_1.TEXT_ALIGNMENTS,
                types: ['string'],
            },
            color: {
                help: argHelp.color,
                types: ['string', 'null'],
            },
            family: {
                default: `"${fonts_1.openSans.value}"`,
                help: argHelp.family,
                types: ['string'],
            },
            italic: {
                default: false,
                help: argHelp.italic,
                options: [true, false],
                types: ['boolean'],
            },
            lHeight: {
                aliases: ['lineHeight'],
                help: argHelp.lHeight,
                types: ['number'],
            },
            size: {
                default: 14,
                help: argHelp.size,
                types: ['number'],
            },
            underline: {
                default: false,
                help: argHelp.underline,
                options: [true, false],
                types: ['boolean'],
            },
            weight: {
                default: 'normal',
                help: argHelp.weight,
                options: Object.values(types_1.FontWeight),
                types: ['string'],
            },
        },
        fn: (_context, args) => {
            if (!Object.values(types_1.FontWeight).includes(args.weight)) {
                throw new Error(`Invalid font weight: '${args.weight}'`);
            }
            if (!types_1.TEXT_ALIGNMENTS.includes(args.align)) {
                throw new Error(`Invalid text alignment: '${args.align}'`);
            }
            // the line height shouldn't ever be lower than the size, and apply as a
            // pixel setting
            const lineHeight = args.lHeight ? `${args.lHeight}px` : 1;
            const spec = {
                fontFamily: args.family,
                fontWeight: args.weight,
                fontStyle: args.italic ? 'italic' : 'normal',
                textDecoration: args.underline ? 'underline' : 'none',
                textAlign: args.align,
                fontSize: `${args.size}px`,
                lineHeight,
            };
            // conditionally apply styles based on input
            if (args.color) {
                spec.color = args.color;
            }
            return {
                type: 'style',
                spec,
                css: inline_style_1.default(spec),
            };
        },
    };
}
exports.font = font;
