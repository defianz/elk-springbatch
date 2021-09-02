"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fp_1 = require("lodash/fp");
exports.getFields = (data, fields = [], postFields = []) => {
    if (data.kind === 'Field' && data.selectionSet && !fp_1.isEmpty(data.selectionSet.selections)) {
        return exports.getFields(data.selectionSet, fields);
    }
    else if (data.kind === 'SelectionSet') {
        return data.selections.reduce((res, item) => {
            if (item.kind === 'Field') {
                const field = item;
                if (field.name.kind === 'Name' && field.name.value.includes('kpi')) {
                    return [...res, field.name.value];
                }
                else if (field.selectionSet && !fp_1.isEmpty(field.selectionSet.selections)) {
                    return exports.getFields(field.selectionSet, res, postFields.concat(field.name.value));
                }
                return [...res, [...postFields, field.name.value].join('.')];
            }
            return res;
        }, fields);
    }
    return fields;
};
