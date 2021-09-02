"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fp_1 = require("lodash/fp");
const beat_schema_1 = require("../../utils/beat_schema");
const _8_0_0_1 = require("../../utils/beat_schema/8.0.0");
const reduce_fields_1 = require("../../utils/build_query/reduce_fields");
const build_query_1 = require("../../utils/build_query");
const ecs_fields_1 = require("../ecs_fields");
const query_dsl_1 = require("./query.dsl");
const query_last_event_time_dsl_1 = require("./query.last_event_time.dsl");
class ElasticsearchEventsAdapter {
    constructor(framework) {
        this.framework = framework;
    }
    async getEvents(request, options) {
        const queryOptions = fp_1.cloneDeep(options);
        queryOptions.fields = reduce_fields_1.reduceFields(options.fields, ecs_fields_1.eventFieldsMap);
        const response = await this.framework.callWithRequest(request, 'search', query_dsl_1.buildQuery(queryOptions));
        const kpiEventType = response.aggregations && response.aggregations.count_event_type
            ? response.aggregations.count_event_type.buckets.map(item => ({
                value: item.key,
                count: item.doc_count,
            }))
            : [];
        const { limit } = options.pagination;
        const totalCount = fp_1.getOr(0, 'hits.total.value', response);
        const hits = response.hits.hits;
        const eventsEdges = hits.map(hit => exports.formatEventsData(options.fields, hit, ecs_fields_1.eventFieldsMap));
        const hasNextPage = eventsEdges.length === limit + 1;
        const edges = hasNextPage ? eventsEdges.splice(0, limit) : eventsEdges;
        const lastCursor = fp_1.get('cursor', fp_1.last(edges));
        return { kpiEventType, edges, totalCount, pageInfo: { hasNextPage, endCursor: lastCursor } };
    }
    async getTimelineData(request, options) {
        const queryOptions = fp_1.cloneDeep(options);
        queryOptions.fields = fp_1.uniq([
            ...queryOptions.fieldRequested,
            ...reduce_fields_1.reduceFields(queryOptions.fields, ecs_fields_1.eventFieldsMap),
        ]);
        delete queryOptions.fieldRequested;
        const response = await this.framework.callWithRequest(request, 'search', query_dsl_1.buildQuery(queryOptions));
        const { limit } = options.pagination;
        const totalCount = fp_1.getOr(0, 'hits.total.value', response);
        const hits = response.hits.hits;
        const timelineEdges = hits.map(hit => exports.formatTimelineData(options.fieldRequested, options.fields, hit, ecs_fields_1.eventFieldsMap));
        const hasNextPage = timelineEdges.length === limit + 1;
        const edges = hasNextPage ? timelineEdges.splice(0, limit) : timelineEdges;
        const lastCursor = fp_1.get('cursor', fp_1.last(edges));
        return { edges, totalCount, pageInfo: { hasNextPage, endCursor: lastCursor } };
    }
    async getTimelineDetails(request, options) {
        const [mapResponse, searchResponse] = await Promise.all([
            this.framework.callWithRequest(request, 'indices.getMapping', {
                allowNoIndices: true,
                ignoreUnavailable: true,
                index: options.indexName,
            }),
            this.framework.callWithRequest(request, 'search', query_dsl_1.buildDetailsQuery(options.indexName, options.eventId)),
        ]);
        const sourceData = fp_1.getOr({}, 'hits.hits.0._source', searchResponse);
        const hitsData = fp_1.getOr({}, 'hits.hits.0', searchResponse);
        delete hitsData._source;
        return {
            data: getSchemaFromData({
                ...addBasicElasticSearchProperties(),
                ...fp_1.getOr({}, [options.indexName, 'mappings', 'properties'], mapResponse),
            }, getDataFromHits(fp_1.merge(sourceData, hitsData)), beat_schema_1.getIndexAlias(options.defaultIndex, options.indexName)),
        };
    }
    async getLastEventTimeData(request, options) {
        const response = await this.framework.callWithRequest(request, 'search', query_last_event_time_dsl_1.buildLastEventTimeQuery(options));
        return {
            lastSeen: fp_1.getOr(null, 'aggregations.last_seen_event.value_as_string', response),
        };
    }
}
exports.ElasticsearchEventsAdapter = ElasticsearchEventsAdapter;
exports.formatEventsData = (fields, hit, fieldMap) => fields.reduce((flattenedFields, fieldName) => {
    flattenedFields.node._id = hit._id;
    flattenedFields.node._index = hit._index;
    if (hit.sort && hit.sort.length > 1) {
        flattenedFields.cursor.value = hit.sort[0];
        flattenedFields.cursor.tiebreaker = hit.sort[1];
    }
    return build_query_1.mergeFieldsWithHit(fieldName, flattenedFields, fieldMap, hit);
}, {
    node: { _id: '' },
    cursor: {
        value: '',
        tiebreaker: null,
    },
});
exports.formatTimelineData = (dataFields, ecsFields, hit, fieldMap) => fp_1.uniq([...ecsFields, ...dataFields]).reduce((flattenedFields, fieldName) => {
    flattenedFields.node._id = hit._id;
    flattenedFields.node._index = hit._index;
    flattenedFields.node.ecs._id = hit._id;
    flattenedFields.node.ecs._index = hit._index;
    if (hit.sort && hit.sort.length > 1) {
        flattenedFields.cursor.value = hit.sort[0];
        flattenedFields.cursor.tiebreaker = hit.sort[1];
    }
    return mergeTimelineFieldsWithHit(fieldName, flattenedFields, fieldMap, hit, dataFields, ecsFields);
}, {
    node: { ecs: { _id: '' }, data: [], _id: '', _index: '' },
    cursor: {
        value: '',
        tiebreaker: null,
    },
});
const specialFields = ['_id', '_index', '_type', '_score'];
const mergeTimelineFieldsWithHit = (fieldName, flattenedFields, fieldMap, hit, dataFields, ecsFields) => {
    if (fieldMap[fieldName] != null || dataFields.includes(fieldName)) {
        const esField = dataFields.includes(fieldName) ? fieldName : fieldMap[fieldName];
        if (fp_1.has(esField, hit._source) || specialFields.includes(esField)) {
            const objectWithProperty = {
                node: {
                    ...fp_1.get('node', flattenedFields),
                    data: dataFields.includes(fieldName)
                        ? [
                            ...fp_1.get('node.data', flattenedFields),
                            {
                                field: fieldName,
                                value: specialFields.includes(esField)
                                    ? fp_1.get(esField, hit)
                                    : fp_1.get(esField, hit._source),
                            },
                        ]
                        : fp_1.get('node.data', flattenedFields),
                    ecs: ecsFields.includes(fieldName)
                        ? {
                            ...fp_1.get('node.ecs', flattenedFields),
                            ...fieldName
                                .split('.')
                                .reduceRight((obj, next) => ({ [next]: obj }), fp_1.get(esField, hit._source)),
                        }
                        : fp_1.get('node.ecs', flattenedFields),
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
const getDataFromHits = (sources, category, path) => Object.keys(sources).reduce((accumulator, source) => {
    const item = fp_1.get(source, sources);
    if (Array.isArray(item) || fp_1.isString(item) || fp_1.isNumber(item)) {
        const field = path ? `${path}.${source}` : source;
        category = field.split('.')[0];
        if (fp_1.isEmpty(category) && _8_0_0_1.baseCategoryFields.includes(category)) {
            category = 'base';
        }
        return [
            ...accumulator,
            {
                category,
                field,
                values: item,
                originalValue: item,
            },
        ];
    }
    else if (fp_1.isObject(item)) {
        return [
            ...accumulator,
            ...getDataFromHits(item, category || source, path ? `${path}.${source}` : source),
        ];
    }
    return accumulator;
}, []);
const getSchemaFromData = (properties, data, index, path) => !fp_1.isEmpty(properties)
    ? Object.keys(properties).reduce((accumulator, property) => {
        const item = fp_1.get(property, properties);
        const field = path ? `${path}.${property}` : property;
        const dataFilterItem = data.filter(dataItem => dataItem.field === field);
        if (item.properties == null && dataFilterItem.length === 1) {
            const dataItem = dataFilterItem[0];
            const dataFromMapping = {
                type: fp_1.get([property, 'type'], properties),
            };
            return [
                ...accumulator,
                {
                    ...dataItem,
                    ...(beat_schema_1.hasDocumentation(index, field)
                        ? fp_1.merge(beat_schema_1.getDocumentation(index, field), dataFromMapping)
                        : dataFromMapping),
                },
            ];
        }
        else if (item.properties != null) {
            return [...accumulator, ...getSchemaFromData(item.properties, data, index, field)];
        }
        return accumulator;
    }, [])
    : data;
const addBasicElasticSearchProperties = () => ({
    _id: {
        type: 'keyword',
    },
    _index: {
        type: 'keyword',
    },
    _type: {
        type: 'keyword',
    },
    _score: {
        type: 'long',
    },
});
