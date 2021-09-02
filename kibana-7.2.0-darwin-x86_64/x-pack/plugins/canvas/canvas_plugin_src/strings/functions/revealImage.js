"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
const types_1 = require("../../functions/types");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.revealImageHelpText', {
        defaultMessage: 'Configure an image reveal element',
    }),
    args: {
        image: i18n_1.i18n.translate('xpack.canvas.functions.revealImage.args.imageHelpText', {
            defaultMessage: 'The image to reveal',
        }),
        emptyImage: i18n_1.i18n.translate('xpack.canvas.functions.revealImage.args.emptyImageHelpText', {
            defaultMessage: 'An optional background image to reveal over',
        }),
        origin: i18n_1.i18n.translate('xpack.canvas.functions.revealImage.args.originHelpText', {
            defaultMessage: 'Where to start from, eg {position}',
            values: {
                position: Object.values(types_1.Position).join(', '),
            },
        }),
    },
};
