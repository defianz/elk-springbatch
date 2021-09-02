"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.alterColumnHelpText', {
        defaultMessage: 'Converts between core types (eg {examples}) and rename columns',
        values: {
            examples: ['string', 'number', 'null', 'boolean', 'date'].join(','),
        },
    }),
    args: {
        column: i18n_1.i18n.translate('xpack.canvas.functions.alterColumn.args.columnHelpText', {
            defaultMessage: 'The name of the column to alter',
        }),
        name: i18n_1.i18n.translate('xpack.canvas.functions.alterColumn.args.nameHelpText', {
            defaultMessage: 'The resultant column name. Leave blank to not rename',
        }),
        type: i18n_1.i18n.translate('xpack.canvas.functions.alterColumn.args.typeHelpText', {
            defaultMessage: 'The type to convert the column to. Leave blank to not change type',
        }),
    },
};
