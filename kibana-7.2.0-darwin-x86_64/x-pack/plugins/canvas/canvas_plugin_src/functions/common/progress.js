"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const fonts_1 = require("../../../common/lib/fonts");
const strings_1 = require("../../strings");
var Shape;
(function (Shape) {
    Shape["GAUGE"] = "gauge";
    Shape["HORIZONTAL_BAR"] = "horizontalBar";
    Shape["HORIZONTAL_PILL"] = "horizontalPill";
    Shape["SEMICIRCLE"] = "semicircle";
    Shape["UNICORN"] = "unicorn";
    Shape["VERTICAL_BAR"] = "verticalBar";
    Shape["VERTICAL_PILL"] = "verticalPill";
    Shape["WHEEL"] = "wheel";
})(Shape = exports.Shape || (exports.Shape = {}));
function progress() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().progress;
    return {
        name: 'progress',
        aliases: [],
        type: 'render',
        help,
        context: {
            types: ['number'],
        },
        args: {
            barColor: {
                default: `#f0f0f0`,
                help: argHelp.barColor,
                types: ['string'],
            },
            barWeight: {
                default: 20,
                help: argHelp.barWeight,
                types: ['number'],
            },
            font: {
                default: `{font size=24 family="${fonts_1.openSans.value}" color="#000000" align=center}`,
                help: argHelp.font,
                types: ['style'],
            },
            label: {
                default: true,
                help: argHelp.label,
                types: ['boolean', 'string'],
            },
            max: {
                default: 1,
                help: argHelp.max,
                types: ['number'],
            },
            shape: {
                aliases: ['_'],
                default: 'gauge',
                help: argHelp.shape,
                options: Object.values(Shape),
                types: ['string'],
            },
            valueColor: {
                default: `#1785b0`,
                help: argHelp.valueColor,
                types: ['string'],
            },
            valueWeight: {
                default: 20,
                help: argHelp.valueWeight,
                types: ['number'],
            },
        },
        fn: (value, args) => {
            if (args.max <= 0) {
                throw new Error(`Invalid max value: '${args.max}'. 'max' must be greater than 0`);
            }
            if (value > args.max || value < 0) {
                throw new Error(`Invalid value: '${value}'. Value must be between 0 and ${args.max}`);
            }
            let label = '';
            if (args.label) {
                label = typeof args.label === 'string' ? args.label : `${value}`;
            }
            let font = {};
            if (lodash_1.get(args, 'font.spec')) {
                font = { ...args.font };
                font.spec.fill = args.font.spec.color; // SVG <text> uses fill for font color
            }
            return {
                type: 'render',
                as: 'progress',
                value: {
                    value,
                    ...args,
                    label,
                    font,
                },
            };
        },
    };
}
exports.progress = progress;
