"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.headHelpText', {
        defaultMessage: 'Get the first {n} rows from the {datatable}. Also see `{tail}`',
        values: {
            n: 'N',
            datatable: 'datatable',
            tail: 'tail',
        },
    }),
    args: {
        count: i18n_1.i18n.translate('xpack.canvas.functions.head.args.countHelpText', {
            defaultMessage: 'Return this many rows from the beginning of the {datatable}',
            values: {
                datatable: 'datatable',
            },
        }),
    },
};
