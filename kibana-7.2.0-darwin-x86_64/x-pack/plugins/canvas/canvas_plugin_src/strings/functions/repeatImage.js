"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.repeatImageHelpText', {
        defaultMessage: 'Configure a repeating image element',
    }),
    args: {
        image: i18n_1.i18n.translate('xpack.canvas.functions.repeatImage.args.imageHelpText', {
            defaultMessage: 'The image to repeat. Usually a {dataurl} or an asset',
            values: {
                dataurl: 'dataURL',
            },
        }),
        size: i18n_1.i18n.translate('xpack.canvas.functions.repeatImage.args.sizeHelpText', {
            defaultMessage: 'The maximum height or width of the image, in pixels. Eg, if you images is taller ' +
                'than it is wide, this will limit its height',
        }),
        max: i18n_1.i18n.translate('xpack.canvas.functions.repeatImage.args.maxHelpText', {
            defaultMessage: 'Maximum number of times the image may repeat',
        }),
        emptyImage: i18n_1.i18n.translate('xpack.canvas.functions.repeatImage.args.emptyImageHelpText', {
            defaultMessage: 'Fill the difference between the input and the `{max}` parameter with this image',
            values: {
                max: 'max=',
            },
        }),
    },
};
