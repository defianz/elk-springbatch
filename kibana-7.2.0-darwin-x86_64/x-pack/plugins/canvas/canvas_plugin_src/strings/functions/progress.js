"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
const progress_1 = require("../../functions/common/progress");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.progressHelpText', {
        defaultMessage: 'Configure a progress element',
    }),
    args: {
        barColor: i18n_1.i18n.translate('xpack.canvas.functions.progress.args.barColorHelpText', {
            defaultMessage: 'Color of the background bar',
        }),
        barWeight: i18n_1.i18n.translate('xpack.canvas.functions.progress.args.barWeightHelpText', {
            defaultMessage: 'Thickness of the background bar',
        }),
        font: i18n_1.i18n.translate('xpack.canvas.functions.progress.args.fontHelpText', {
            defaultMessage: 'Font settings for the label. Technically you can stick other styles in here too!',
        }),
        label: i18n_1.i18n.translate('xpack.canvas.functions.progress.args.labelHelpText', {
            defaultMessage: `Set {true}/{false} to show/hide label or provide a string to display as the label`,
            values: {
                true: 'true',
                false: 'false',
            },
        }),
        max: i18n_1.i18n.translate('xpack.canvas.functions.progress.args.maxHelpText', {
            defaultMessage: 'Maximum value of the progress element',
        }),
        shape: i18n_1.i18n.translate('xpack.canvas.functions.progress.args.shapeHelpText', {
            defaultMessage: `Select {list}, or {end}`,
            values: {
                list: Object.values(progress_1.Shape)
                    .slice(0, -1)
                    .join(', '),
                end: Object.values(progress_1.Shape).slice(-1)[0],
            },
        }),
        valueColor: i18n_1.i18n.translate('xpack.canvas.functions.progress.args.valueColorHelpText', {
            defaultMessage: 'Color of the progress bar',
        }),
        valueWeight: i18n_1.i18n.translate('xpack.canvas.functions.progress.args.valueWeightHelpText', {
            defaultMessage: 'Thickness of the progress bar',
        }),
    },
};
