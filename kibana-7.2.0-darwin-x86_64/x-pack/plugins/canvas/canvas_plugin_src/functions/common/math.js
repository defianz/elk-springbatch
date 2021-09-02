"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore no @typed def; Elastic library
const tinymath_1 = require("tinymath");
// @ts-ignore untyped local
const pivot_object_array_1 = require("../../../common/lib/pivot_object_array");
const types_1 = require("../types");
const strings_1 = require("../../strings");
function math() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().math;
    return {
        name: 'math',
        type: 'number',
        help,
        context: {
            types: ['number', 'datatable'],
        },
        args: {
            expression: {
                aliases: ['_'],
                types: ['string'],
                help: argHelp.expression,
            },
        },
        fn: (context, args) => {
            const { expression } = args;
            if (!expression || expression.trim() === '') {
                throw new Error('Empty expression');
            }
            const mathContext = types_1.isDatatable(context)
                ? pivot_object_array_1.pivotObjectArray(context.rows, context.columns.map(col => col.name))
                : { value: context };
            try {
                const result = tinymath_1.evaluate(expression, mathContext);
                if (Array.isArray(result)) {
                    if (result.length === 1) {
                        return result[0];
                    }
                    throw new Error('Expressions must return a single number. Try wrapping your expression in mean() or sum()');
                }
                if (isNaN(result)) {
                    throw new Error('Failed to execute math expression. Check your column names');
                }
                return result;
            }
            catch (e) {
                if (types_1.isDatatable(context) && context.rows.length === 0) {
                    throw new Error('Empty datatable');
                }
                else {
                    throw e;
                }
            }
        },
    };
}
exports.math = math;
