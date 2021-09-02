"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fp_1 = require("lodash/fp");
exports.mergeFieldsWithHit = (fieldName, flattenedFields, fieldMap, hit) => {
    if (fieldMap[fieldName] != null) {
        const esField = fieldMap[fieldName];
        if (fp_1.has(esField, hit._source)) {
            const objectWithProperty = {
                node: {
                    ...fp_1.get('node', flattenedFields),
                    ...fieldName
                        .split('.')
                        .reduceRight((obj, next) => ({ [next]: obj }), fp_1.get(esField, hit._source)),
                },
            };
            return fp_1.merge(flattenedFields, objectWithProperty);
        }
        else {
            return flattenedFields;
        }
    }
    else {
        return flattenedFields;
    }
};
