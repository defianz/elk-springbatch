"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.gtHelpText', {
        defaultMessage: 'Return if the context is greater than the argument',
    }),
    args: {
        value: i18n_1.i18n.translate('xpack.canvas.functions.gt.args.valueHelpText', {
            defaultMessage: 'The value to compare the context to',
        }),
    },
};
