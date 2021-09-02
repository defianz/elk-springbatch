"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFirstLastSeenDomainQuery = ({ ip, domainName, flowTarget, defaultIndex, }) => {
    const filter = [
        { term: { [`${flowTarget}.ip`]: ip } },
        { term: { [`${flowTarget}.domain`]: domainName } },
    ];
    const dslQuery = {
        allowNoIndices: true,
        index: defaultIndex,
        ignoreUnavailable: true,
        body: {
            aggregations: {
                firstSeen: { min: { field: '@timestamp' } },
                lastSeen: { max: { field: '@timestamp' } },
            },
            query: { bool: { filter } },
            size: 0,
            track_total_hits: true,
        },
    };
    return dslQuery;
};
