"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.getCellHelpText', {
        defaultMessage: 'Fetch a single cell in a table',
    }),
    args: {
        column: i18n_1.i18n.translate('xpack.canvas.functions.getCell.args.columnHelpText', {
            defaultMessage: 'The name of the column value to fetch',
        }),
        row: i18n_1.i18n.translate('xpack.canvas.functions.getCell.args.rowHelpText', {
            defaultMessage: 'The row number, starting at 0',
        }),
    },
};
