"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.plyHelpText', {
        defaultMessage: 'Subdivide a {datatable} and pass the resulting tables into an expression, then merge the output',
        values: {
            datatable: 'datatable',
        },
    }),
    args: {
        by: i18n_1.i18n.translate('xpack.canvas.functions.ply.args.byHelpText', {
            defaultMessage: 'The column to subdivide on',
        }),
        expression: i18n_1.i18n.translate('xpack.canvas.functions.ply.args.expressionHelpText', {
            defaultMessage: 'An expression to pass each resulting {datatable} into. Tips: \n' +
                ' Expressions must return a {datatable}. Use `as` to turn literals into {datatable}.\n' +
                ' Multiple expressions must return the same number of rows.' +
                ' If you need to return a differing row count, pipe into another instance of {ply}.\n' +
                ' If multiple expressions return the same columns, the last one wins.',
            values: {
                datatable: 'datatable',
                ply: 'ply',
            },
        }),
    },
};
