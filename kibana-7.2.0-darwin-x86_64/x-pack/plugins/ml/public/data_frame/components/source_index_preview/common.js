"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_COLUMNS = 5;
function getFlattenedFields(obj) {
    const flatDocFields = [];
    const newDocFields = Object.keys(obj);
    newDocFields.forEach(f => {
        const fieldValue = obj[f];
        if (typeof fieldValue !== 'object' || fieldValue === null || Array.isArray(fieldValue)) {
            flatDocFields.push(f);
        }
        else {
            const innerFields = getFlattenedFields(fieldValue);
            const flattenedFields = innerFields.map(d => `${f}.${d}`);
            flatDocFields.push(...flattenedFields);
        }
    });
    return flatDocFields;
}
exports.getFlattenedFields = getFlattenedFields;
exports.getSelectableFields = (docs) => {
    if (docs.length === 0) {
        return [];
    }
    const newDocFields = getFlattenedFields(docs[0]._source);
    newDocFields.sort();
    return newDocFields;
};
exports.getDefaultSelectableFields = (docs) => {
    if (docs.length === 0) {
        return [];
    }
    const newDocFields = getFlattenedFields(docs[0]._source);
    newDocFields.sort();
    return newDocFields
        .filter(k => {
        let value = false;
        docs.forEach(row => {
            const source = row._source;
            if (source[k] !== null) {
                value = true;
            }
        });
        return value;
    })
        .slice(0, exports.MAX_COLUMNS);
};
exports.toggleSelectedField = (selectedFields, column) => {
    const index = selectedFields.indexOf(column);
    if (index === -1) {
        selectedFields.push(column);
    }
    else {
        selectedFields.splice(index, 1);
    }
    selectedFields.sort();
    return selectedFields;
};
exports.getSourceIndexDevConsoleStatement = (query, indexPatternTitle) => {
    return `GET ${indexPatternTitle}/_search\n${JSON.stringify({
        query,
    }, null, 2)}\n`;
};
