"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const elasticsearch_fieldnames_1 = require("../../../../common/elasticsearch_fieldnames");
// returns true if 6.x data is found
async function getLegacyDataStatus(setup) {
    const { client, config } = setup;
    const params = {
        includeLegacyData: true,
        terminateAfter: 1,
        index: [config.get('apm_oss.transactionIndices')],
        body: {
            size: 0,
            query: {
                bool: {
                    filter: [
                        { terms: { [elasticsearch_fieldnames_1.PROCESSOR_EVENT]: ['transaction'] } },
                        { range: { [elasticsearch_fieldnames_1.OBSERVER_VERSION_MAJOR]: { lt: 7 } } }
                    ]
                }
            }
        }
    };
    const resp = await client('search', params);
    const hasLegacyData = resp.hits.total > 0;
    return hasLegacyData;
}
exports.getLegacyDataStatus = getLegacyDataStatus;
