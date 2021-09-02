"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.pointseriesHelpText', {
        defaultMessage: 'Turn a {datatable} into a point series model. Currently we differentiate measure ' +
            'from dimensions by looking for a {url}. If you enter a {tinymath} expression in your ' +
            'argument, we treat that argument as a measure, otherwise it is a dimension. Dimensions ' +
            'are combined to create unique keys. Measures are then deduplicated by those keys using ' +
            'the specified {tinymath} function',
        values: {
            datatable: 'datatable',
            url: '[TinyMath function](https://www.elastic.co/guide/en/kibana/current/canvas-tinymath-functions.html)',
            tinymath: 'TinyMath',
        },
    }),
    args: {
        x: i18n_1.i18n.translate('xpack.canvas.functions.pointseries.args.xHelpText', {
            defaultMessage: 'The values along the x-axis',
        }),
        y: i18n_1.i18n.translate('xpack.canvas.functions.pointseries.args.yHelpText', {
            defaultMessage: 'The values along the y-axis',
        }),
        color: i18n_1.i18n.translate('xpack.canvas.functions.pointseries.args.colorHelpText', {
            defaultMessage: "An expression to use in determining the mark's color",
        }),
        size: i18n_1.i18n.translate('xpack.canvas.functions.pointseries.args.sizeHelpText', {
            defaultMessage: 'For elements that support it, the size of the marks',
        }),
        text: i18n_1.i18n.translate('xpack.canvas.functions.pointseries.args.textHelpText', {
            defaultMessage: 'For use in charts that support it, the text to show in the mark',
        }),
    },
};
