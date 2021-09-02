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
    help: i18n_1.i18n.translate('xpack.canvas.functions.fontHelpText', {
        defaultMessage: 'Create a font style',
    }),
    args: {
        align: i18n_1.i18n.translate('xpack.canvas.functions.font.args.alignHelpText', {
            defaultMessage: 'Horizontal text alignment',
        }),
        color: i18n_1.i18n.translate('xpack.canvas.functions.font.args.colorHelpText', {
            defaultMessage: 'Text color',
        }),
        family: i18n_1.i18n.translate('xpack.canvas.functions.font.args.familyHelpText', {
            defaultMessage: 'An acceptable {css} web font string',
            values: {
                css: 'CSS',
            },
        }),
        italic: i18n_1.i18n.translate('xpack.canvas.functions.font.args.italicHelpText', {
            defaultMessage: 'Italicize, true or false',
        }),
        lHeight: i18n_1.i18n.translate('xpack.canvas.functions.font.args.lHeightHelpText', {
            defaultMessage: 'Line height ({px})',
            values: {
                px: 'px',
            },
        }),
        size: i18n_1.i18n.translate('xpack.canvas.functions.font.args.sizeHelpText', {
            defaultMessage: 'Font size ({px})',
            values: {
                px: 'px',
            },
        }),
        underline: i18n_1.i18n.translate('xpack.canvas.functions.font.args.underlineHelpText', {
            defaultMessage: 'Underline the text, true or false',
        }),
        weight: i18n_1.i18n.translate('xpack.canvas.functions.font.args.weightHelpText', {
            defaultMessage: 'Set the font weight, e.g. {examples}',
            values: {
                examples: Object.values(types_1.FontWeight).join(', '),
            },
        }),
    },
};
