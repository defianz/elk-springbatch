"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.filterrowsHelpText', {
        defaultMessage: 'Filter rows in a datatable based on the return value of a subexpression.',
    }),
    args: {
        fn: i18n_1.i18n.translate('xpack.canvas.functions.filterrows.args.fnHelpText', {
            defaultMessage: 'An expression to pass each rows in the datatable into. The expression should return a ' +
                'boolean. A true value will preserve the row, and a false value will remove it.',
        }),
    },
};
