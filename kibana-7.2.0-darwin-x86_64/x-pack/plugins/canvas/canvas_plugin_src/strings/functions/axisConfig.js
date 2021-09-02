"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
const types_1 = require("../../functions/types");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.axisConfigHelpText', {
        defaultMessage: 'Configure axis of a visualization',
    }),
    args: {
        max: i18n_1.i18n.translate('xpack.canvas.functions.axisConfig.args.maxHelpText', {
            defaultMessage: 'Maximum value displayed in the axis. Must be a number or a date in {ms} or {iso} string',
            values: {
                ms: 'ms',
                iso: 'ISO8601',
            },
        }),
        min: i18n_1.i18n.translate('xpack.canvas.functions.axisConfig.args.minHelpText', {
            defaultMessage: 'Minimum value displayed in the axis. Must be a number or a date in {ms} or {iso} string',
            values: {
                ms: 'ms',
                iso: 'ISO8601',
            },
        }),
        position: i18n_1.i18n.translate('xpack.canvas.functions.axisConfig.args.positionHelpText', {
            defaultMessage: 'Position of the axis labels: {examples}',
            values: {
                examples: Object.values(types_1.Position).join(', '),
            },
        }),
        show: i18n_1.i18n.translate('xpack.canvas.functions.axisConfig.args.showHelpText', {
            defaultMessage: 'Show the axis labels?',
        }),
        tickSize: i18n_1.i18n.translate('xpack.canvas.functions.axisConfig.args.tickSizeHelpText', {
            defaultMessage: 'Increment size between each tick. Use for number axes only',
        }),
    },
};
