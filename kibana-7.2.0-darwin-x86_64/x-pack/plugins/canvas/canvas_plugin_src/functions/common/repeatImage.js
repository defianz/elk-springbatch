"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore untyped local
const resolve_dataurl_1 = require("../../../common/lib/resolve_dataurl");
// @ts-ignore .png file
const elastic_outline_1 = require("../../lib/elastic_outline");
const strings_1 = require("../../strings");
function repeatImage() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().repeatImage;
    return {
        name: 'repeatImage',
        aliases: [],
        type: 'render',
        help,
        context: {
            types: ['number'],
        },
        args: {
            image: {
                types: ['string', 'null'],
                help: argHelp.image,
                default: elastic_outline_1.elasticOutline,
            },
            size: {
                types: ['number'],
                default: 100,
                help: argHelp.size,
            },
            max: {
                types: ['number', 'null'],
                help: argHelp.max,
                default: 1000,
            },
            emptyImage: {
                types: ['string', 'null'],
                help: argHelp.emptyImage,
                default: null,
            },
        },
        fn: (count, args) => {
            return {
                type: 'render',
                as: 'repeatImage',
                value: {
                    count: Math.floor(count),
                    ...args,
                    image: resolve_dataurl_1.resolveWithMissingImage(args.image, elastic_outline_1.elasticOutline),
                    emptyImage: resolve_dataurl_1.resolveWithMissingImage(args.emptyImage),
                },
            };
        },
    };
}
exports.repeatImage = repeatImage;
