"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
// @ts-ignore lodash.keyby imports invalid member from @types/lodash
const lodash_keyby_1 = tslib_1.__importDefault(require("lodash.keyby"));
// @ts-ignore untyped local
const get_colors_from_palette_1 = require("../../../common/lib/get_colors_from_palette");
// @ts-ignore untyped local
const get_legend_config_1 = require("../../../common/lib/get_legend_config");
const strings_1 = require("../../strings");
const types_1 = require("../types");
function pie() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().pie;
    return {
        name: 'pie',
        aliases: [],
        type: 'render',
        help,
        context: {
            types: ['pointseries'],
        },
        args: {
            palette: {
                types: ['palette', 'null'],
                help: argHelp.palette,
                default: '{palette}',
            },
            seriesStyle: {
                multi: true,
                types: ['seriesStyle', 'null'],
                help: argHelp.seriesStyle,
            },
            radius: {
                types: ['string', 'number'],
                help: argHelp.radius,
                default: 'auto',
            },
            hole: {
                types: ['number'],
                default: 0,
                help: argHelp.hole,
            },
            labels: {
                types: ['boolean'],
                default: true,
                help: argHelp.labels,
                options: [true, false],
            },
            labelRadius: {
                types: ['number'],
                default: 100,
                help: argHelp.labelRadius,
            },
            font: {
                types: ['style'],
                help: argHelp.font,
                default: '{font}',
            },
            legend: {
                types: ['string', 'boolean'],
                help: argHelp.legend,
                default: false,
                options: Object.values(types_1.Legend).concat(false),
            },
            tilt: {
                types: ['number'],
                default: 1,
                help: argHelp.tilt,
            },
        },
        fn: (context, args) => {
            const { tilt, radius, labelRadius, labels, hole, legend, palette, font, seriesStyle } = args;
            const seriesStyles = lodash_keyby_1.default(seriesStyle || [], 'label') || {};
            const data = lodash_1.map(lodash_1.groupBy(context.rows, 'color'), (series, label = '') => {
                const item = {
                    label,
                    data: series.map(point => point.size || 1),
                };
                const style = seriesStyles[label];
                // append series style, if there is a match
                if (style) {
                    item.color = lodash_1.get(style, 'color');
                }
                return item;
            });
            return {
                type: 'render',
                as: 'pie',
                value: {
                    font,
                    data,
                    options: {
                        canvas: false,
                        colors: get_colors_from_palette_1.getColorsFromPalette(palette, data.length),
                        legend: get_legend_config_1.getLegendConfig(legend, data.length),
                        grid: {
                            show: false,
                        },
                        series: {
                            pie: {
                                show: true,
                                innerRadius: Math.max(hole, 0) / 100,
                                stroke: {
                                    width: 0,
                                },
                                label: {
                                    show: labels,
                                    radius: (labelRadius >= 0 ? labelRadius : 100) / 100,
                                },
                                tilt,
                                radius,
                            },
                            bubbles: {
                                show: false,
                            },
                            shadowSize: 0,
                        },
                    },
                },
            };
        },
    };
}
exports.pie = pie;
