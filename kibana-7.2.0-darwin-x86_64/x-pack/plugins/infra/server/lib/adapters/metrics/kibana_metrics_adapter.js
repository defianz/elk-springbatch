"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
const lodash_1 = require("lodash");
const types_1 = require("../../../graphql/types");
const check_valid_node_1 = require("./lib/check_valid_node");
const errors_1 = require("./lib/errors");
const models_1 = require("./models");
class KibanaMetricsAdapter {
    constructor(framework) {
        this.framework = framework;
    }
    async getMetrics(req, options) {
        const fields = {
            [types_1.InfraNodeType.host]: options.sourceConfiguration.fields.host,
            [types_1.InfraNodeType.container]: options.sourceConfiguration.fields.container,
            [types_1.InfraNodeType.pod]: options.sourceConfiguration.fields.pod,
        };
        const indexPattern = `${options.sourceConfiguration.metricAlias},${options.sourceConfiguration.logAlias}`;
        const timeField = options.sourceConfiguration.fields.timestamp;
        const interval = options.timerange.interval;
        const nodeField = fields[options.nodeType];
        const timerange = {
            min: options.timerange.from,
            max: options.timerange.to,
        };
        const search = (searchOptions) => this.framework.callWithRequest(req, 'search', searchOptions);
        const validNode = await check_valid_node_1.checkValidNode(search, indexPattern, nodeField, options.nodeId);
        if (!validNode) {
            throw new errors_1.InvalidNodeError(i18n_1.i18n.translate('xpack.infra.kibanaMetrics.nodeDoesNotExistErrorMessage', {
                defaultMessage: '{nodeId} does not exist.',
                values: {
                    nodeId: options.nodeId,
                },
            }));
        }
        const requests = options.metrics.map(metricId => {
            const model = models_1.metricModels[metricId](timeField, indexPattern, interval);
            const filters = [{ match: { [nodeField]: options.nodeId } }];
            return this.framework.makeTSVBRequest(req, model, timerange, filters);
        });
        return Promise.all(requests)
            .then(results => {
            return results.map(result => {
                const metricIds = Object.keys(result).filter(k => !['type', 'uiRestrictions'].includes(k));
                return metricIds.map((id) => {
                    const infraMetricId = types_1.InfraMetric[id];
                    if (!infraMetricId) {
                        throw new Error(i18n_1.i18n.translate('xpack.infra.kibanaMetrics.invalidInfraMetricErrorMessage', {
                            defaultMessage: '{id} is not a valid InfraMetric',
                            values: {
                                id,
                            },
                        }));
                    }
                    const panel = result[infraMetricId];
                    return {
                        id: infraMetricId,
                        series: panel.series.map(series => {
                            return {
                                id: series.id,
                                data: series.data.map(point => ({ timestamp: point[0], value: point[1] })),
                            };
                        }),
                    };
                });
            });
        })
            .then(result => lodash_1.flatten(result));
    }
}
exports.KibanaMetricsAdapter = KibanaMetricsAdapter;
