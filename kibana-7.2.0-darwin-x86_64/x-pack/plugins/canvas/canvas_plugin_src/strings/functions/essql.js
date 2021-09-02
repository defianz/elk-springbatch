"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.essqlHelpText', {
        defaultMessage: '{essql}',
        values: {
            essql: 'Elasticsearch SQL',
        },
    }),
    args: {
        query: i18n_1.i18n.translate('xpack.canvas.functions.essql.args.queryHelpText', {
            defaultMessage: '{sql} query',
            values: {
                sql: 'SQL',
            },
        }),
        count: i18n_1.i18n.translate('xpack.canvas.functions.essql.args.countHelpText', {
            defaultMessage: 'The number of docs to pull back. Smaller numbers perform better',
        }),
        timezone: i18n_1.i18n.translate('xpack.canvas.functions.essql.args.timezoneHelpText', {
            defaultMessage: 'Timezone to use for date operations, valid {iso} formats and {utc} offsets both work',
            values: {
                iso: 'ISO',
                utc: 'UTC',
            },
        }),
    },
};
