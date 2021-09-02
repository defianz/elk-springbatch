"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.doHelpText', {
        defaultMessage: 'Runs multiple sub-expressions. Returns the passed in context. Nice for running ' +
            'actions producing functions.',
    }),
    args: {
        fn: i18n_1.i18n.translate('xpack.canvas.functions.do.args.fnHelpText', {
            defaultMessage: 'One or more sub-expressions. The value of these is not available in the root ' +
                'pipeline as this function simply returns the passed in context',
        }),
    },
};
