"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("../../strings");
// @ts-ignore untyped local
const url_1 = require("../../../common/lib/url");
function containerStyle() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().containerStyle;
    return {
        name: 'containerStyle',
        aliases: [],
        context: {
            types: ['null'],
        },
        type: 'containerStyle',
        help,
        args: {
            border: {
                types: ['string', 'null'],
                help: argHelp.border,
            },
            borderRadius: {
                types: ['string', 'null'],
                help: argHelp.borderRadius,
            },
            padding: {
                types: ['string', 'null'],
                help: argHelp.padding,
            },
            backgroundColor: {
                types: ['string', 'null'],
                help: argHelp.backgroundColor,
            },
            backgroundImage: {
                types: ['string', 'null'],
                help: argHelp.backgroundImage,
            },
            backgroundSize: {
                types: ['string'],
                help: argHelp.backgroundSize,
                default: 'contain',
                options: ['contain', 'cover', 'auto'],
            },
            backgroundRepeat: {
                types: ['string'],
                help: argHelp.backgroundRepeat,
                default: 'no-repeat',
                options: ['repeat-x', 'repeat', 'space', 'round', 'no-repeat', 'space'],
            },
            opacity: {
                types: ['number', 'null'],
                help: argHelp.opacity,
            },
            overflow: {
                types: ['string'],
                help: argHelp.overflow,
                options: ['visible', 'hidden', 'scroll', 'auto'],
            },
        },
        fn: (_context, args) => {
            const { backgroundImage, backgroundSize, backgroundRepeat, ...remainingArgs } = args;
            const style = {
                type: 'containerStyle',
                ...remainingArgs,
            };
            if (backgroundImage) {
                if (!url_1.isValidUrl(backgroundImage)) {
                    throw new Error('Invalid backgroundImage. Please provide an asset or a URL.');
                }
                style.backgroundImage = `url(${backgroundImage})`;
                style.backgroundSize = backgroundSize;
                style.backgroundRepeat = backgroundRepeat;
            }
            // removes keys with undefined value
            return JSON.parse(JSON.stringify(style));
        },
    };
}
exports.containerStyle = containerStyle;
