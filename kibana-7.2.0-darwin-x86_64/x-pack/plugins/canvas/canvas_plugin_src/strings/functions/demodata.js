"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.demodataHelpText', {
        defaultMessage: 'A mock data set that includes project {ci} times with usernames, countries and run phases',
        values: {
            ci: 'CI',
        },
    }),
    args: {
        type: i18n_1.i18n.translate('xpack.canvas.functions.demodata.args.typeHelpText', {
            defaultMessage: 'The name of the demo data set to use',
        }),
    },
};
