"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.tailHelpText', {
        defaultMessage: 'Get the last N rows from the end of a {datatable}. Also see `{head}`',
        values: {
            datatable: 'datatable',
            head: 'head',
        },
    }),
    args: {
        count: i18n_1.i18n.translate('xpack.canvas.functions.tail.args.countHelpText', {
            defaultMessage: 'Return this many rows from the end of the {datatable}',
            values: {
                datatable: 'datatable',
            },
        }),
    },
};
