"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.mathHelpText', {
        defaultMessage: 'Interpret a math expression, with a number or {datatable} as context. {Datatable} ' +
            'columns are available by their column name. If you pass in a number it is available ' +
            'as "{value}" (without the quotes)',
        values: {
            datatable: 'datatable',
            Datatable: 'Datatable',
            value: 'value',
        },
    }),
    args: {
        expression: i18n_1.i18n.translate('xpack.canvas.functions.math.args.expressionHelpText', {
            defaultMessage: 'An evaluated {tinymath} expression. (See {url})',
            values: {
                tinymath: 'TinyMath',
                url: '[TinyMath Functions](https://www.elastic.co/guide/en/kibana/current/canvas-tinymath-functions.html)',
            },
        }),
    },
};
