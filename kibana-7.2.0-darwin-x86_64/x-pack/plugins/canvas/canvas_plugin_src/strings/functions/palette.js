"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.paletteHelpText', {
        defaultMessage: 'Create a color palette',
    }),
    args: {
        color: i18n_1.i18n.translate('xpack.canvas.functions.palette.args.colorHelpText', {
            defaultMessage: 'Palette colors, {rgba}, {hex}, or {html} color string. Pass this multiple times.',
            values: {
                rgba: 'rgba',
                hex: 'hex',
                html: 'HTML',
            },
        }),
        gradient: i18n_1.i18n.translate('xpack.canvas.functions.palette.args.gradientHelpText', {
            defaultMessage: 'Prefer to make a gradient where supported and useful?',
        }),
        reverse: i18n_1.i18n.translate('xpack.canvas.functions.palette.args.reverseHelpText', {
            defaultMessage: 'Reverse the palette',
        }),
    },
};
