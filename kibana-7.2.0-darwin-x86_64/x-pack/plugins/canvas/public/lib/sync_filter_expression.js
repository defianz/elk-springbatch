"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore internal untyped
const common_1 = require("@kbn/interpreter/common");
// @ts-ignore external untyped
const object_path_immutable_1 = require("object-path-immutable");
const lodash_1 = require("lodash");
function syncFilterExpression(config, filterExpression, fields = []) {
    let changed = false;
    const filterAst = common_1.fromExpression(filterExpression);
    const newAst = fields.reduce((ast, field) => {
        const val = lodash_1.get(ast, `chain[0].arguments.${field}[0]`);
        if (val !== config[field]) {
            changed = true;
            if (!config[field]) {
                // remove value if not in expression
                return object_path_immutable_1.del(ast, `chain.0.arguments.${field}`);
            }
            return object_path_immutable_1.set(ast, `chain.0.arguments.${field}.0`, config[field]);
        }
        return ast;
    }, filterAst);
    return { changed, newAst };
}
exports.syncFilterExpression = syncFilterExpression;
