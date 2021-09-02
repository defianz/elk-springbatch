"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.timefilterControlHelpText', {
        defaultMessage: 'Configure a {timefilter} control element',
        values: {
            timefilter: 'timefilter',
        },
    }),
    args: {
        column: i18n_1.i18n.translate('xpack.canvas.functions.timefilterControl.args.columnHelpText', {
            defaultMessage: 'The column or field to attach the filter to',
        }),
        compact: i18n_1.i18n.translate('xpack.canvas.functions.timefilterControl.args.compactHelpText', {
            defaultMessage: 'Show the time filter as a button that triggers a popover',
        }),
        filterGroup: i18n_1.i18n.translate('xpack.canvas.functions.dropdownControl.args.filterGroupHelpText', {
            defaultMessage: 'Group name for the filter',
        }),
    },
};
