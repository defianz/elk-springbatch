"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
const compare_1 = require("../../functions/common/compare");
exports.help = {
    help: i18n_1.i18n.translate('xpack.canvas.functions.compareHelpText', {
        defaultMessage: 'Compare the input to something else to determine true or false. Usually used in combination with `{if}`. ' +
            'This only works with primitive types, such as {examples}.',
        values: {
            if: '{if}',
            examples: ['number', 'string', 'boolean'].join(', '),
        },
    }),
    args: {
        op: i18n_1.i18n.translate('xpack.canvas.functions.compare.args.opHelpText', {
            defaultMessage: 'The operator to use in the comparison: {eq} (equal to), {gt} (greater than), {gte} (greater than or equal to)' +
                ', {lt} (less than), {lte} (less than or equal to), {ne} (not equal to)',
            values: {
                eq: compare_1.Operation.EQ,
                gt: compare_1.Operation.GT,
                gte: compare_1.Operation.GTE,
                lt: compare_1.Operation.LT,
                lte: compare_1.Operation.LTE,
                ne: compare_1.Operation.NE,
            },
        }),
        to: i18n_1.i18n.translate('xpack.canvas.functions.compare.args.toHelpText', {
            defaultMessage: 'The value to compare the context to, usually returned by a subexpression',
        }),
    },
};
