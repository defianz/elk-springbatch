"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.dateHelpText', {
        defaultMessage: 'Returns the current time, or a time parsed from a string, as milliseconds since epoch',
    }),
    args: {
        value: i18n_1.i18n.translate('xpack.canvas.functions.date.args.valueHelpText', {
            defaultMessage: 'An optional date string to parse into milliseconds since epoch. Can be either a valid ' +
                'Javascript Date input or a string to parse using the format argument. Must be an {iso} ' +
                'string or you must provide the format',
            values: {
                iso: 'ISO8601',
            },
        }),
        format: i18n_1.i18n.translate('xpack.canvas.functions.date.args.formatHelpText', {
            defaultMessage: 'The {moment} format for parsing the optional date string (See {url})',
            values: {
                moment: 'momentJS',
                url: 'https://momentjs.com/docs/#/displaying/',
            },
        }),
    },
};
