"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.esdocsHelpText', {
        defaultMessage: 'Query {es} and get back raw documents. We recommend you specify the fields you want, ' +
            'especially if you are going to ask for a lot of rows',
        values: {
            es: 'elasticsearch',
        },
    }),
    args: {
        index: i18n_1.i18n.translate('xpack.canvas.functions.esdocs.args.indexHelpText', {
            defaultMessage: 'Specify an index pattern. Eg "{example}"',
            values: {
                example: 'logstash-*',
            },
        }),
        query: i18n_1.i18n.translate('xpack.canvas.functions.esdocs.args.queryHelpText', {
            defaultMessage: 'A {lucene} query string',
            values: {
                lucene: 'Lucene',
            },
        }),
        sort: i18n_1.i18n.translate('xpack.canvas.functions.esdocs.args.sortHelpText', {
            defaultMessage: 'Sort directions as "{directions}". Eg "{example1}" or "{example2}"',
            values: {
                directions: ['field', 'direction'].join(', '),
                example1: ['@timestamp', 'desc'].join(', '),
                example2: ['bytes', 'asc'].join(', '),
            },
        }),
        fields: i18n_1.i18n.translate('xpack.canvas.functions.esdocs.args.fieldsHelpText', {
            defaultMessage: 'Comma separated list of fields. Fewer fields will perform better',
        }),
        metaFields: i18n_1.i18n.translate('xpack.canvas.functions.esdocs.args.metaFieldsHelpText', {
            defaultMessage: 'Comma separated list of meta fields, eg "{example}"',
            values: {
                example: '_index,_type',
            },
        }),
        count: i18n_1.i18n.translate('xpack.canvas.functions.esdocs.args.countHelpText', {
            defaultMessage: 'The number of docs to pull back. Smaller numbers perform better',
        }),
    },
};
