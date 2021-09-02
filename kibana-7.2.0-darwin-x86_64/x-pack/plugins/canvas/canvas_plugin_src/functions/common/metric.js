"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fonts_1 = require("../../../common/lib/fonts");
const strings_1 = require("../../strings");
function metric() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().metric;
    return {
        name: 'metric',
        aliases: [],
        type: 'render',
        help,
        context: {
            types: ['string', 'null'],
        },
        args: {
            label: {
                types: ['string'],
                aliases: ['_', 'text', 'description'],
                help: argHelp.label,
                default: '""',
            },
            metricFont: {
                types: ['style'],
                help: argHelp.metricFont,
                default: `{font size=48 family="${fonts_1.openSans.value}" color="#000000" align=center lHeight=48}`,
            },
            labelFont: {
                types: ['style'],
                help: argHelp.labelFont,
                default: `{font size=14 family="${fonts_1.openSans.value}" color="#000000" align=center}`,
            },
        },
        fn: (context, { label, metricFont, labelFont }) => {
            return {
                type: 'render',
                as: 'metric',
                value: {
                    metric: context === null ? '?' : context,
                    label,
                    metricFont,
                    labelFont,
                },
            };
        },
    };
}
exports.metric = metric;
