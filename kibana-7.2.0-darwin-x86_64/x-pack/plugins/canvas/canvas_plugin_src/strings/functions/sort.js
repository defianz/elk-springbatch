"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.sortHelpText', {
        defaultMessage: 'Sorts a datatable on a column',
    }),
    args: {
        by: i18n_1.i18n.translate('xpack.canvas.functions.sort.args.byHelpText', {
            defaultMessage: 'The column to sort on. If column is not specified, the {datatable} ' +
                'will be sorted on the first column.',
            values: {
                datatable: 'datatable',
            },
        }),
        reverse: i18n_1.i18n.translate('xpack.canvas.functions.sort.args.reverseHelpText', {
            defaultMessage: 'Reverse the sort order. If reverse is not specified, the {datatable} ' +
                'will be sorted in ascending order.',
            values: {
                datatable: 'datatable',
            },
        }),
    },
};
