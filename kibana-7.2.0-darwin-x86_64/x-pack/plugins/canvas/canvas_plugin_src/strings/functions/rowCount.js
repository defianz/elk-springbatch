"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.rowCountHelpText', {
        defaultMessage: 'Return the number of rows. Pair with {ply} to get the count of unique column ' +
            'values, or combinations of unique column values.',
        values: {
            ply: 'ply',
        },
    }),
    args: {},
};
