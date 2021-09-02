"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.markdownHelpText', {
        defaultMessage: 'An element for rendering {markdown} text. Great for single numbers, metrics or paragraphs of text.',
        values: {
            markdown: 'markdown',
        },
    }),
    args: {
        expression: i18n_1.i18n.translate('xpack.canvas.functions.markdown.args.expressionHelpText', {
            defaultMessage: 'A {markdown} expression. You can pass this multiple times to achieve concatenation',
            values: {
                markdown: 'markdown',
            },
        }),
        font: i18n_1.i18n.translate('xpack.canvas.functions.markdown.args.fontHelpText', {
            defaultMessage: 'Font settings. Technically, you can add other styles in here as well',
        }),
    },
};
