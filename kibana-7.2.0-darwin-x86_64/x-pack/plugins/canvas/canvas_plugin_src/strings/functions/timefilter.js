"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.timefilterHelpText', {
        defaultMessage: 'Create a {timefilter} for querying a source',
        values: {
            timefilter: 'timefilter',
        },
    }),
    args: {
        column: i18n_1.i18n.translate('xpack.canvas.functions.timefilter.args.columnHelpText', {
            defaultMessage: 'The column or field to attach the filter to',
        }),
        from: i18n_1.i18n.translate('xpack.canvas.functions.timefilter.args.fromHelpText', {
            defaultMessage: 'Beginning of the range, in {iso} or {es} {dm} format',
            values: {
                iso: 'ISO8601',
                es: 'Elasticsearch',
                dm: 'datemath',
            },
        }),
        to: i18n_1.i18n.translate('xpack.canvas.functions.timefilter.args.toHelpText', {
            defaultMessage: 'End of the range, in {iso} or {es} {dm} format',
            values: {
                iso: 'ISO8601',
                es: 'Elasticsearch',
                dm: 'datemath',
            },
        }),
        filterGroup: i18n_1.i18n.translate('xpack.canvas.functions.dropdownControl.args.filterGroupHelpText', {
            defaultMessage: 'Group name for the filter',
        }),
    },
};
