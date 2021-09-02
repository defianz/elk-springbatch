"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.replaceImageHelpText', {
        defaultMessage: 'Use a regular expression to replace parts of a string',
    }),
    args: {
        pattern: i18n_1.i18n.translate('xpack.canvas.functions.replace.args.patternHelpText', {
            defaultMessage: 'The text or pattern of a {js} regular expression, eg "{example}". You can use capture groups here.',
            values: {
                js: 'JavaScript',
                example: '[aeiou]',
            },
        }),
        flags: i18n_1.i18n.translate('xpack.canvas.functions.replace.args.flagsHelpText', {
            defaultMessage: 'Specify flags. See {url} for reference.',
            values: {
                url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp',
            },
        }),
        replacement: i18n_1.i18n.translate('xpack.canvas.functions.replace.args.replacementHelpText', {
            defaultMessage: 'The replacement for the matching parts of string. Capture groups can be accessed by their index, eg {example}',
            values: {
                example: '$1',
            },
        }),
    },
};
