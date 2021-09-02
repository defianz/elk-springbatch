"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.csvHelpText', {
        defaultMessage: 'Create datatable from {csv} input',
        values: {
            csv: 'CSV',
        },
    }),
    args: {
        data: i18n_1.i18n.translate('xpack.canvas.functions.csv.args.dataHelpText', {
            defaultMessage: '{csv} data to use',
            values: {
                csv: 'CSV',
            },
        }),
        delimiter: i18n_1.i18n.translate('xpack.canvas.functions.csv.args.delimeterHelpText', {
            defaultMessage: 'Data separation character',
        }),
        newline: i18n_1.i18n.translate('xpack.canvas.functions.csv.args.newlineHelpText', {
            defaultMessage: 'Row separation character',
        }),
    },
};
