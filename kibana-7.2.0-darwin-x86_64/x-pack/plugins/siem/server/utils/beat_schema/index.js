"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fp_1 = require("lodash/fp");
const _8_0_0_1 = require("./8.0.0");
exports.baseCategoryFields = _8_0_0_1.baseCategoryFields;
exports.convertSchemaToAssociativeArray = (schema) => schema.reduce((accumulator, item) => {
    if (item.fields != null && !fp_1.isEmpty(item.fields)) {
        return {
            ...accumulator,
            ...convertFieldsToAssociativeArray(item),
        };
    }
    return accumulator;
}, {});
const paramsToPick = ['description', 'example', 'name', 'type'];
const onlyStringOrNumber = (fields) => Object.keys(fields).reduce((acc, item) => {
    const value = fp_1.get(item, fields);
    return {
        ...acc,
        [item]: fp_1.isString(value) || fp_1.isNumber(value) ? value : JSON.stringify(value),
    };
}, {});
const convertFieldsToAssociativeArray = (schemaFields, path = '') => schemaFields.fields && fp_1.isArray(schemaFields.fields)
    ? schemaFields.fields.reduce((accumulator, item) => {
        if (item.name) {
            const attr = fp_1.isEmpty(path) ? item.name : `${path}.${item.name}`;
            if (!fp_1.isEmpty(item.fields) && fp_1.isEmpty(path)) {
                return {
                    ...accumulator,
                    [attr]: {
                        ...onlyStringOrNumber(fp_1.pick(paramsToPick, item)),
                        fields: {
                            ...convertFieldsToAssociativeArray(item, attr),
                        },
                    },
                };
            }
            else if (!fp_1.isEmpty(item.fields) && !fp_1.isEmpty(path)) {
                return {
                    ...accumulator,
                    [attr]: onlyStringOrNumber(fp_1.pick(paramsToPick, item)),
                    ...convertFieldsToAssociativeArray(item, attr),
                };
            }
            else {
                return {
                    ...accumulator,
                    [attr]: onlyStringOrNumber(fp_1.pick(paramsToPick, item)),
                };
            }
        }
        return accumulator;
    }, {})
    : {};
exports.getIndexAlias = (defaultIndex, indexName) => {
    const found = defaultIndex.find(index => indexName.match(index) != null);
    if (found != null) {
        return found;
    }
    else {
        return 'unknown';
    }
};
exports.getIndexSchemaDoc = fp_1.memoize((index) => {
    if (index.match('auditbeat') != null) {
        return {
            ..._8_0_0_1.extraSchemaField,
            ...exports.convertSchemaToAssociativeArray(_8_0_0_1.auditbeatSchema),
        };
    }
    else if (index.match('filebeat') != null) {
        return {
            ..._8_0_0_1.extraSchemaField,
            ...exports.convertSchemaToAssociativeArray(_8_0_0_1.filebeatSchema),
        };
    }
    else if (index.match('packetbeat') != null) {
        return {
            ..._8_0_0_1.extraSchemaField,
            ...exports.convertSchemaToAssociativeArray(_8_0_0_1.packetbeatSchema),
        };
    }
    else if (index.match('winlogbeat') != null) {
        return {
            ..._8_0_0_1.extraSchemaField,
            ...exports.convertSchemaToAssociativeArray(_8_0_0_1.winlogbeatSchema),
        };
    }
    else if (index.match('ecs') != null) {
        return {
            ..._8_0_0_1.extraSchemaField,
            ..._8_0_0_1.ecsSchema,
        };
    }
    return {};
});
exports.hasDocumentation = (index, path) => {
    if (index === 'unknown') {
        return false;
    }
    const splitPath = path.split('.');
    const category = splitPath.length > 0 ? splitPath[0] : null;
    if (category === null) {
        return false;
    }
    if (splitPath.length > 1) {
        return fp_1.has([category, 'fields', path], exports.getIndexSchemaDoc(index));
    }
    return fp_1.has(category, exports.getIndexSchemaDoc(index));
};
exports.getDocumentation = (index, path) => {
    if (index === 'unknown') {
        return '';
    }
    const splitPath = path.split('.');
    const category = splitPath.length > 0 ? splitPath[0] : null;
    if (category === null) {
        return '';
    }
    if (splitPath.length > 1) {
        return fp_1.get([category, 'fields', path], exports.getIndexSchemaDoc(index)) || '';
    }
    return fp_1.get(category, exports.getIndexSchemaDoc(index)) || '';
};
