"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.switchHelpText', {
        defaultMessage: 'Perform conditional logic with multiple conditions',
    }),
    args: {
        case: i18n_1.i18n.translate('xpack.canvas.functions.switch.args.caseHelpText', {
            defaultMessage: 'The list of conditions to check',
        }),
        default: i18n_1.i18n.translate('xpack.canvas.functions.switch.args.defaultHelpText', {
            defaultMessage: 'The default case if no cases match',
        }),
    },
};
