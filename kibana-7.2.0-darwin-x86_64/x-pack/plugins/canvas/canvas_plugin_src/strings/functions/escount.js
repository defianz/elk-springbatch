"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.escountHelpText', {
        defaultMessage: 'Query {es} for a count of the number of hits matching a query',
        values: {
            es: 'elasticsearch',
        },
    }),
    args: {
        index: i18n_1.i18n.translate('xpack.canvas.functions.escount.args.indexHelpText', {
            defaultMessage: 'Specify an index pattern. Eg "{example}"',
            values: {
                example: 'logstash-*',
            },
        }),
        query: i18n_1.i18n.translate('xpack.canvas.functions.escount.args.queryHelpText', {
            defaultMessage: 'A {lucene} query string',
            values: {
                lucene: 'Lucene',
            },
        }),
    },
};
