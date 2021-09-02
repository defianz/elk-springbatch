"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.urlparamHelpText', {
        defaultMessage: 'Access {url} parameters and use them in expressions. Eg {example}. This will always return a string',
        values: {
            url: 'URL',
            example: 'https://localhost:5601/app/canvas?myVar=20',
        },
    }),
    args: {
        param: i18n_1.i18n.translate('xpack.canvas.functions.urlparam.args.paramHelpText', {
            defaultMessage: 'The {url} hash parameter to access',
            values: {
                url: 'URL',
            },
        }),
        default: i18n_1.i18n.translate('xpack.canvas.functions.urlparam.args.defaultHelpText', {
            defaultMessage: 'Return this string if the {url} parameter is not defined',
            values: {
                url: 'url',
            },
        }),
    },
};
