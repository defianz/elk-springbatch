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
var Origin;
(function (Origin) {
    Origin["TOP"] = "top";
    Origin["LEFT"] = "left";
    Origin["BOTTOM"] = "bottom";
    Origin["RIGHT"] = "right";
})(Origin = exports.Origin || (exports.Origin = {}));
function revealImage() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().revealImage;
    return {
        name: 'revealImage',
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
            emptyImage: {
                types: ['string', 'null'],
                help: argHelp.emptyImage,
                default: null,
            },
            origin: {
                types: ['string'],
                help: argHelp.origin,
                default: 'bottom',
                options: Object.values(Origin),
            },
        },
        fn: (percent, args) => {
            if (percent > 1 || percent < 0) {
                throw new Error(`Invalid value: '${percent}'. Percentage must be between 0 and 1`);
            }
            return {
                type: 'render',
                as: 'revealImage',
                value: {
                    percent,
                    ...args,
                    image: resolve_dataurl_1.resolveWithMissingImage(args.image, elastic_outline_1.elasticOutline),
                    emptyImage: resolve_dataurl_1.resolveWithMissingImage(args.emptyImage),
                },
            };
        },
    };
}
exports.revealImage = revealImage;
