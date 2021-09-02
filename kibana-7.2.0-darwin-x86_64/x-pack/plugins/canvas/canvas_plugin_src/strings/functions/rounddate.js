"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.rounddateHelpText', {
        defaultMessage: 'Round {ms} since epoch using a {moment} formatting string. Returns {ms} since epoch',
        values: {
            ms: 'ms',
            moment: 'MomentJS',
        },
    }),
    args: {
        format: i18n_1.i18n.translate('xpack.canvas.functions.rounddate.args.formatHelpText', {
            defaultMessage: '{moment} format with which to bucket (See {url}). For example "{example}" would round to the month',
            values: {
                moment: 'MomentJS',
                url: 'https://momentjs.com/docs/#/displaying/',
                example: 'YYYY-MM',
            },
        }),
    },
};
