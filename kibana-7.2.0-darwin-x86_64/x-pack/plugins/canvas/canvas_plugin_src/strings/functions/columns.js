"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.columnsHelpText', {
        defaultMessage: 'Include or exclude columns from a data table. If you specify both, this will exclude first',
    }),
    args: {
        include: i18n_1.i18n.translate('xpack.canvas.functions.columns.args.includeHelpText', {
            defaultMessage: 'A comma separated list of column names to keep in the table',
        }),
        exclude: i18n_1.i18n.translate('xpack.canvas.functions.columns.args.excludeHelpText', {
            defaultMessage: 'A comma separated list of column names to remove from the table',
        }),
    },
};
