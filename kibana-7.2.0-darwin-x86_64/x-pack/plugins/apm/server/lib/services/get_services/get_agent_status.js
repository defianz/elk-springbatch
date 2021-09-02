"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const elasticsearch_fieldnames_1 = require("../../../../common/elasticsearch_fieldnames");
// Note: this logic is duplicated in tutorials/apm/envs/on_prem
async function getAgentStatus(setup) {
    const { client, config } = setup;
    const params = {
        terminateAfter: 1,
        index: [
            config.get('apm_oss.errorIndices'),
            config.get('apm_oss.metricsIndices'),
            config.get('apm_oss.sourcemapIndices'),
            config.get('apm_oss.transactionIndices')
        ],
        body: {
            size: 0,
            query: {
                bool: {
                    filter: [
                        {
                            terms: {
                                [elasticsearch_fieldnames_1.PROCESSOR_EVENT]: [
                                    'error',
                                    'metric',
                                    'sourcemap',
                                    'transaction'
                                ]
                            }
                        }
                    ]
                }
            }
        }
    };
    const resp = await client('search', params);
    const hasHistorialAgentData = resp.hits.total > 0;
    return hasHistorialAgentData;
}
exports.getAgentStatus = getAgentStatus;
