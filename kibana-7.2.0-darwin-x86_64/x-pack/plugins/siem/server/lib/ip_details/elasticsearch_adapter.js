"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fp_1 = require("lodash/fp");
const query_domains_dsl_1 = require("./query_domains.dsl");
const query_last_first_seen_domain_dsl_1 = require("./query_last_first_seen_domain.dsl");
const query_overview_dsl_1 = require("./query_overview.dsl");
const query_tls_dsl_1 = require("./query_tls.dsl");
const query_users_dsl_1 = require("./query_users.dsl");
class ElasticsearchIpOverviewAdapter {
    constructor(framework) {
        this.framework = framework;
    }
    async getIpDetails(request, options) {
        const response = await this.framework.callWithRequest(request, 'search', query_overview_dsl_1.buildOverviewQuery(options));
        return {
            ...exports.getIpOverviewAgg('source', fp_1.getOr({}, 'aggregations.source', response)),
            ...exports.getIpOverviewAgg('destination', fp_1.getOr({}, 'aggregations.destination', response)),
            ...exports.getIpOverviewHostAgg(fp_1.getOr({}, 'aggregations.host', response)),
        };
    }
    async getDomains(request, options) {
        const response = await this.framework.callWithRequest(request, 'search', query_domains_dsl_1.buildDomainsQuery(options));
        const { cursor, limit } = options.pagination;
        const totalCount = fp_1.getOr(0, 'aggregations.domain_count.value', response);
        const domainsEdges = getDomainsEdges(response, options);
        const hasNextPage = domainsEdges.length > limit;
        const beginning = cursor != null ? parseInt(cursor, 10) : 0;
        const edges = domainsEdges.splice(beginning, limit - beginning);
        return {
            edges,
            totalCount,
            pageInfo: {
                hasNextPage,
                endCursor: {
                    value: String(limit),
                    tiebreaker: null,
                },
            },
        };
    }
    async getTls(request, options) {
        const response = await this.framework.callWithRequest(request, 'search', query_tls_dsl_1.buildTlsQuery(options));
        const { cursor, limit } = options.pagination;
        const totalCount = fp_1.getOr(0, 'aggregations.count.value', response);
        const tlsEdges = getTlsEdges(response, options);
        const hasNextPage = tlsEdges.length > limit;
        const beginning = cursor != null ? parseInt(cursor, 10) : 0;
        const edges = tlsEdges.splice(beginning, limit - beginning);
        return {
            edges,
            totalCount,
            pageInfo: {
                hasNextPage,
                endCursor: {
                    value: String(limit),
                    tiebreaker: null,
                },
            },
        };
    }
    async getDomainsFirstLastSeen(request, options) {
        const response = await this.framework.callWithRequest(request, 'search', query_last_first_seen_domain_dsl_1.buildFirstLastSeenDomainQuery(options));
        const aggregations = fp_1.get('aggregations', response) || {};
        return {
            firstSeen: fp_1.get('firstSeen.value_as_string', aggregations),
            lastSeen: fp_1.get('lastSeen.value_as_string', aggregations),
        };
    }
    async getUsers(request, options) {
        const response = await this.framework.callWithRequest(request, 'search', query_users_dsl_1.buildUsersQuery(options));
        const { cursor, limit } = options.pagination;
        const totalCount = fp_1.getOr(0, 'aggregations.user_count.value', response);
        const usersEdges = exports.getUsersEdges(response);
        const hasNextPage = usersEdges.length > limit;
        const beginning = cursor != null ? parseInt(cursor, 10) : 0;
        const edges = usersEdges.splice(beginning, limit - beginning);
        return {
            edges,
            totalCount,
            pageInfo: {
                endCursor: {
                    value: String(limit),
                    tiebreaker: null,
                },
                hasNextPage,
            },
        };
    }
}
exports.ElasticsearchIpOverviewAdapter = ElasticsearchIpOverviewAdapter;
exports.getIpOverviewAgg = (type, overviewHit) => {
    const firstSeen = fp_1.getOr(null, `firstSeen.value_as_string`, overviewHit);
    const lastSeen = fp_1.getOr(null, `lastSeen.value_as_string`, overviewHit);
    const autonomousSystem = fp_1.getOr(null, `autonomousSystem.results.hits.hits[0]._source.autonomous_system`, overviewHit);
    const geoFields = fp_1.getOr(null, `geo.results.hits.hits[0]._source.${type}.geo`, overviewHit);
    return {
        [type]: {
            firstSeen,
            lastSeen,
            autonomousSystem: {
                ...autonomousSystem,
            },
            geo: {
                ...geoFields,
            },
        },
    };
};
exports.getIpOverviewHostAgg = (overviewHostHit) => {
    const hostFields = fp_1.getOr(null, `host.results.hits.hits[0]._source.host`, overviewHostHit);
    return {
        host: {
            ...hostFields,
        },
    };
};
const getDomainsEdges = (response, options) => {
    return exports.formatDomainsEdges(fp_1.getOr([], `aggregations.${options.flowTarget}_domains.buckets`, response), options.flowTarget);
};
exports.formatDomainsEdges = (buckets, flowTarget) => buckets.map((bucket) => ({
    node: {
        _id: bucket.key,
        [flowTarget]: {
            uniqueIpCount: getOrNumber('uniqueIpCount.value', bucket),
            domainName: bucket.key,
            firstSeen: fp_1.get('firstSeen.value_as_string', bucket),
            lastSeen: fp_1.get('lastSeen.value_as_string', bucket),
        },
        network: {
            bytes: getOrNumber('bytes.value', bucket),
            packets: getOrNumber('packets.value', bucket),
            direction: bucket.direction.buckets.map(bucketDir => bucketDir.key),
        },
    },
    cursor: {
        value: bucket.key,
        tiebreaker: null,
    },
}));
const getTlsEdges = (response, options) => {
    return exports.formatTlsEdges(fp_1.getOr([], 'aggregations.sha1.buckets', response));
};
exports.formatTlsEdges = (buckets) => {
    return buckets.map((bucket) => {
        const edge = {
            node: {
                _id: bucket.key,
                alternativeNames: bucket.alternative_names.buckets.map(({ key }) => key),
                commonNames: bucket.common_names.buckets.map(({ key }) => key),
                ja3: bucket.ja3.buckets.map(({ key }) => key),
                issuerNames: bucket.issuer_names.buckets.map(({ key }) => key),
                // eslint-disable-next-line @typescript-eslint/camelcase
                notAfter: bucket.not_after.buckets.map(({ key_as_string }) => key_as_string),
            },
            cursor: {
                value: bucket.key,
                tiebreaker: null,
            },
        };
        return edge;
    });
};
const getOrNumber = (path, bucket) => {
    const numb = fp_1.get(path, bucket);
    if (numb == null) {
        return null;
    }
    return numb;
};
exports.getUsersEdges = (response) => fp_1.getOr([], `aggregations.users.buckets`, response).map((bucket) => ({
    node: {
        _id: bucket.key,
        user: {
            id: fp_1.getOr([], 'id.buckets', bucket).map((id) => id.key),
            name: bucket.key,
            groupId: fp_1.getOr([], 'groupId.buckets', bucket).map((groupId) => groupId.key),
            groupName: fp_1.getOr([], 'groupName.buckets', bucket).map((groupName) => groupName.key),
            count: fp_1.get('doc_count', bucket),
        },
    },
    cursor: {
        value: bucket.key,
        tiebreaker: null,
    },
}));
