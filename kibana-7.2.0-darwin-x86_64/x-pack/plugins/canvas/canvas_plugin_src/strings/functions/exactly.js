"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.exactlyHelpText', {
        defaultMessage: 'Create a filter that matches a given column for a perfectly exact value',
    }),
    args: {
        column: i18n_1.i18n.translate('xpack.canvas.functions.exactly.args.columnHelpText', {
            defaultMessage: 'The column or field to attach the filter to',
        }),
        value: i18n_1.i18n.translate('xpack.canvas.functions.exactly.args.valueHelpText', {
            defaultMessage: 'The value to match exactly, including white space and capitalization',
        }),
        filterGroup: i18n_1.i18n.translate('xpack.canvas.functions.dropdownControl.args.filterGroupHelpText', {
            defaultMessage: 'Group name for the filter',
        }),
    },
};
