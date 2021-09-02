"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.dropdownControlHelpText', {
        defaultMessage: 'Configure a drop down filter control element',
    }),
    args: {
        filterColumn: i18n_1.i18n.translate('xpack.canvas.functions.dropdownControl.args.filterColumnHelpText', {
            defaultMessage: 'The column or field to attach the filter to',
        }),
        valueColumn: i18n_1.i18n.translate('xpack.canvas.functions.dropdownControl.args.valueColumnHelpText', {
            defaultMessage: 'The datatable column from which to extract the unique values for the drop down',
        }),
        filterGroup: i18n_1.i18n.translate('xpack.canvas.functions.dropdownControl.args.filterGroupHelpText', {
            defaultMessage: 'Group name for the filter',
        }),
    },
};
