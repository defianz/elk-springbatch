"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.mapColumnHelpText', {
        defaultMessage: 'Add a column calculated as the result of other columns, or not',
    }),
    args: {
        name: i18n_1.i18n.translate('xpack.canvas.functions.mapColumn.args.nameHelpText', {
            defaultMessage: 'The name of the resulting column',
        }),
        expression: i18n_1.i18n.translate('xpack.canvas.functions.mapColumn.args.expressionHelpText', {
            defaultMessage: 'A canvas expression which will be passed each row as a single row {datatable}',
            values: {
                datatable: 'datatable',
            },
        }),
    },
};
