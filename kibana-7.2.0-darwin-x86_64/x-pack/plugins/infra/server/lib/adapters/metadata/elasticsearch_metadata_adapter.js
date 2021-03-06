"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const constants_1 = require("../../constants");
class ElasticsearchMetadataAdapter {
    constructor(framework) {
        this.framework = framework;
    }
    async getMetricMetadata(req, sourceConfiguration, nodeId, nodeType) {
        const idFieldName = getIdFieldName(sourceConfiguration, nodeType);
        const metricQuery = {
            index: sourceConfiguration.metricAlias,
            body: {
                query: {
                    bool: {
                        filter: {
                            term: { [idFieldName]: nodeId },
                        },
                    },
                },
                size: 0,
                aggs: {
                    nodeName: {
                        terms: {
                            field: constants_1.NAME_FIELDS[nodeType],
                            size: 1,
                        },
                    },
                    metrics: {
                        terms: {
                            field: 'event.dataset',
                            size: 1000,
                        },
                    },
                },
            },
        };
        const response = await this.framework.callWithRequest(req, 'search', metricQuery);
        const buckets = response.aggregations && response.aggregations.metrics
            ? response.aggregations.metrics.buckets
            : [];
        return {
            id: nodeId,
            name: lodash_1.get(response, ['aggregations', 'nodeName', 'buckets', 0, 'key'], nodeId),
            buckets,
        };
    }
    async getLogMetadata(req, sourceConfiguration, nodeId, nodeType) {
        const idFieldName = getIdFieldName(sourceConfiguration, nodeType);
        const logQuery = {
            index: sourceConfiguration.logAlias,
            body: {
                query: {
                    bool: {
                        filter: {
                            term: { [idFieldName]: nodeId },
                        },
                    },
                },
                size: 0,
                aggs: {
                    nodeName: {
                        terms: {
                            field: constants_1.NAME_FIELDS[nodeType],
                            size: 1,
                        },
                    },
                    metrics: {
                        terms: {
                            field: 'event.dataset',
                            size: 1000,
                        },
                    },
                },
            },
        };
        const response = await this.framework.callWithRequest(req, 'search', logQuery);
        const buckets = response.aggregations && response.aggregations.metrics
            ? response.aggregations.metrics.buckets
            : [];
        return {
            id: nodeId,
            name: lodash_1.get(response, ['aggregations', 'nodeName', 'buckets', 0, 'key'], nodeId),
            buckets,
        };
    }
}
exports.ElasticsearchMetadataAdapter = ElasticsearchMetadataAdapter;
const getIdFieldName = (sourceConfiguration, nodeType) => {
    switch (nodeType) {
        case 'host':
            return sourceConfiguration.fields.host;
        case 'container':
            return sourceConfiguration.fields.container;
        default:
            return sourceConfiguration.fields.pod;
    }
};
