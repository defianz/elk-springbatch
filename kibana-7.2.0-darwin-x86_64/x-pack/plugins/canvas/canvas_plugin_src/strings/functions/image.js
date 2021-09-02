"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
const image_1 = require("../../functions/common/image");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.imageHelpText', {
        defaultMessage: 'Display an image',
    }),
    args: {
        dataurl: i18n_1.i18n.translate('xpack.canvas.functions.image.args.dataurlHelpText', {
            defaultMessage: 'The HTTP(S) URL or base64 data of an image.',
        }),
        mode: i18n_1.i18n.translate('xpack.canvas.functions.image.args.modeHelpText', {
            defaultMessage: '`{contain}` will show the entire image, scaled to fit. ' +
                '`{cover}` will fill the container with the image, cropping from the sides or ' +
                'bottom as needed. ' +
                '`{stretch}` will resize the height and width of the image to 100% of the container',
            values: {
                contain: image_1.ImageMode.CONTAIN,
                cover: image_1.ImageMode.COVER,
                stretch: image_1.ImageMode.STRETCH,
            },
        }),
    },
};
