"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.formatnumberHelpText', {
        defaultMessage: 'Turn a number into a string using a {numeralJS} format',
        values: {
            numeralJS: 'NumeralJS',
        },
    }),
    args: {
        format: i18n_1.i18n.translate('xpack.canvas.functions.formatnumber.args.formatHelpText', {
            defaultMessage: '{numeralJS} format string {url}',
            values: {
                numeralJS: 'NumeralJS',
                url: 'http://numeraljs.com/#format',
            },
        }),
    },
};
