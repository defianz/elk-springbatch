"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// @ts-ignore no @typed def
const lodash_keyby_1 = tslib_1.__importDefault(require("lodash.keyby"));
const lodash_1 = require("lodash");
// @ts-ignore untyped local
const get_colors_from_palette_1 = require("../../../../common/lib/get_colors_from_palette");
// @ts-ignore untyped local
const get_legend_config_1 = require("../../../../common/lib/get_legend_config");
const get_flot_axis_config_1 = require("./get_flot_axis_config");
const get_font_spec_1 = require("./get_font_spec");
const series_style_to_flot_1 = require("./series_style_to_flot");
const get_tick_hash_1 = require("./get_tick_hash");
const strings_1 = require("../../../strings");
const types_1 = require("../../types");
function plot() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().plot;
    return {
        name: 'plot',
        aliases: [],
        type: 'render',
        help,
        context: {
            types: ['pointseries'],
        },
        args: {
            seriesStyle: {
                multi: true,
                types: ['seriesStyle', 'null'],
                help: argHelp.seriesStyle,
            },
            defaultStyle: {
                multi: false,
                types: ['seriesStyle'],
                help: argHelp.defaultStyle,
                default: '{seriesStyle points=5}',
            },
            palette: {
                types: ['palette'],
                help: argHelp.palette,
                default: '{palette}',
            },
            font: {
                types: ['style'],
                help: argHelp.font,
                default: '{font}',
            },
            legend: {
                types: ['string', 'boolean'],
                help: argHelp.legend,
                default: 'ne',
                options: Object.values(types_1.Legend).concat(false),
            },
            yaxis: {
                types: ['boolean', 'axisConfig'],
                help: argHelp.yaxis,
                default: true,
            },
            xaxis: {
                types: ['boolean', 'axisConfig'],
                help: argHelp.xaxis,
                default: true,
            },
        },
        fn: (context, args) => {
            const seriesStyles = lodash_keyby_1.default(args.seriesStyle || [], 'label') || {};
            const sortedRows = lodash_1.sortBy(context.rows, ['x', 'y', 'color', 'size', 'text']);
            const ticks = get_tick_hash_1.getTickHash(context.columns, sortedRows);
            const font = args.font ? get_font_spec_1.getFontSpec(args.font) : {};
            const data = lodash_1.map(lodash_1.groupBy(sortedRows, 'color'), (series, label) => {
                const seriesStyle = {
                    ...args.defaultStyle,
                    ...seriesStyles[label],
                };
                const flotStyle = seriesStyle ? series_style_to_flot_1.seriesStyleToFlot(seriesStyle) : {};
                return {
                    ...flotStyle,
                    label,
                    data: series.map(point => {
                        const attrs = {};
                        const x = lodash_1.get(context.columns, 'x.type') === 'string' ? ticks.x.hash[point.x] : point.x;
                        const y = lodash_1.get(context.columns, 'y.type') === 'string' ? ticks.y.hash[point.y] : point.y;
                        if (point.size != null) {
                            attrs.size = point.size;
                        }
                        else if (lodash_1.get(seriesStyle, 'points')) {
                            attrs.size = seriesStyle.points;
                            lodash_1.set(flotStyle, 'bubbles.size.min', seriesStyle.points);
                        }
                        if (point.text != null) {
                            attrs.text = point.text;
                        }
                        return [x, y, attrs];
                    }),
                };
            });
            const gridConfig = {
                borderWidth: 0,
                borderColor: null,
                color: 'rgba(0,0,0,0)',
                labelMargin: 30,
                margin: {
                    right: 30,
                    top: 20,
                    bottom: 0,
                    left: 0,
                },
            };
            const result = {
                type: 'render',
                as: 'plot',
                value: {
                    font: args.font,
                    data: lodash_1.sortBy(data, 'label'),
                    options: {
                        canvas: false,
                        colors: get_colors_from_palette_1.getColorsFromPalette(args.palette, data.length),
                        legend: get_legend_config_1.getLegendConfig(args.legend, data.length),
                        grid: gridConfig,
                        xaxis: get_flot_axis_config_1.getFlotAxisConfig('x', args.xaxis, {
                            columns: context.columns,
                            ticks,
                            font,
                        }),
                        yaxis: get_flot_axis_config_1.getFlotAxisConfig('y', args.yaxis, {
                            columns: context.columns,
                            ticks,
                            font,
                        }),
                        series: {
                            shadowSize: 0,
                            ...series_style_to_flot_1.seriesStyleToFlot(args.defaultStyle),
                        },
                    },
                },
            };
            // fix the issue of plot sometimes re-rendering with an empty chart
            // TODO: holy hell, why does this work?! the working theory is that some values become undefined
            // and serializing the result here causes them to be dropped off, and this makes flot react differently.
            // It's also possible that something else ends up mutating this object, but that seems less likely.
            return JSON.parse(JSON.stringify(result));
        },
    };
}
exports.plot = plot;
