"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.staticColumnHelpText', {
        defaultMessage: 'Add a column with a static value',
    }),
    args: {
        name: i18n_1.i18n.translate('xpack.canvas.functions.staticColumn.args.nameHelpText', {
            defaultMessage: 'The name of the new column column',
        }),
        value: i18n_1.i18n.translate('xpack.canvas.functions.staticColumn.args.valueHelpText', {
            defaultMessage: 'The value to insert in each column. Tip: use a sub-expression to rollup ' +
                'other columns into a static value',
        }),
    },
};
