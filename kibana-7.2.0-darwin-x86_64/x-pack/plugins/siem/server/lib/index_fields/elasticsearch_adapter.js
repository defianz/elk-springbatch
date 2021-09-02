"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fp_1 = require("lodash/fp");
const beat_schema_1 = require("../../utils/beat_schema");
class ElasticsearchIndexFieldAdapter {
    constructor(framework) {
        this.framework = framework;
    }
    async getIndexFields(request, indices) {
        const indexPatternsService = this.framework.getIndexPatternsService(request);
        const indexesAliasIndices = indices.reduce((accumulator, indice) => {
            const key = beat_schema_1.getIndexAlias(request.payload.variables.defaultIndex, indice);
            if (fp_1.get(key, accumulator)) {
                accumulator[key] = [...accumulator[key], indice];
            }
            else {
                accumulator[key] = [indice];
            }
            return accumulator;
        }, {});
        const responsesIndexFields = await Promise.all(Object.values(indexesAliasIndices).map(indicesByGroup => indexPatternsService.getFieldsForWildcard({
            pattern: indicesByGroup,
        })));
        return exports.formatIndexFields(responsesIndexFields, Object.keys(indexesAliasIndices));
    }
}
exports.ElasticsearchIndexFieldAdapter = ElasticsearchIndexFieldAdapter;
exports.formatIndexFields = (responsesIndexFields, indexesAlias) => responsesIndexFields
    .reduce((accumulator, indexFields, indexesAliasIdx) => [
    ...accumulator,
    ...indexFields.reduce((itemAccumulator, index) => {
        const alias = indexesAlias[indexesAliasIdx];
        const splitName = index.name.split('.');
        const category = beat_schema_1.baseCategoryFields.includes(splitName[0]) ? 'base' : splitName[0];
        return [
            ...itemAccumulator,
            {
                ...(beat_schema_1.hasDocumentation(alias, index.name) ? beat_schema_1.getDocumentation(alias, index.name) : {}),
                ...index,
                category,
                indexes: [alias],
            },
        ];
    }, []),
], [])
    .reduce((accumulator, indexfield) => {
    const alreadyExistingIndexField = accumulator.findIndex(acc => acc.name === indexfield.name);
    if (alreadyExistingIndexField > -1) {
        const existingIndexField = accumulator[alreadyExistingIndexField];
        return [
            ...accumulator.slice(0, alreadyExistingIndexField),
            {
                ...existingIndexField,
                indexes: [...existingIndexField.indexes, ...indexfield.indexes],
            },
            ...accumulator.slice(alreadyExistingIndexField + 1),
        ];
    }
    return [...accumulator, indexfield];
}, []);
