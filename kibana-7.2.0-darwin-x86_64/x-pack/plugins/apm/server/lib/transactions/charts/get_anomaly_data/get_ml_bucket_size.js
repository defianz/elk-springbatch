"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const elastic_idx_1 = require("@kbn/elastic-idx");
const ml_job_constants_1 = require("../../../../../common/ml_job_constants");
async function getMlBucketSize({ serviceName, transactionType, setup }) {
    const { client, start, end } = setup;
    const params = {
        index: ml_job_constants_1.getMlIndex(serviceName, transactionType),
        body: {
            _source: 'bucket_span',
            size: 1,
            query: {
                bool: {
                    filter: [
                        { exists: { field: 'bucket_span' } },
                        {
                            range: {
                                timestamp: {
                                    gte: start,
                                    lte: end,
                                    format: 'epoch_millis'
                                }
                            }
                        }
                    ]
                }
            }
        }
    };
    try {
        const resp = await client('search', params);
        return elastic_idx_1.idx(resp, _ => _.hits.hits[0]._source.bucket_span) || 0;
    }
    catch (err) {
        const isHttpError = 'statusCode' in err;
        if (isHttpError) {
            return 0;
        }
        throw err;
    }
}
exports.getMlBucketSize = getMlBucketSize;
