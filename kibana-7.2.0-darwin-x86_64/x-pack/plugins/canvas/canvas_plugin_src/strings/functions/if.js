"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.ifHelpText', {
        defaultMessage: 'Perform conditional logic',
    }),
    args: {
        condition: i18n_1.i18n.translate('xpack.canvas.functions.if.args.conditionHelpText', {
            defaultMessage: 'A boolean true or false, usually returned by a subexpression. If this is not ' +
                'supplied then the input context will be used',
        }),
        then: i18n_1.i18n.translate('xpack.canvas.functions.if.args.thenHelpText', {
            defaultMessage: 'The return value if true',
        }),
        else: i18n_1.i18n.translate('xpack.canvas.functions.if.args.elseHelpText', {
            defaultMessage: 'The return value if false. If else is not specified, and the condition is false ' +
                'then the input context to the function will be returned',
        }),
    },
};
