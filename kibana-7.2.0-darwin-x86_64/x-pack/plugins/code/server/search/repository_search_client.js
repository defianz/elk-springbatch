"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("../indexer/schema");
const abstract_search_client_1 = require("./abstract_search_client");
class RepositorySearchClient extends abstract_search_client_1.AbstractSearchClient {
    constructor(client, log) {
        super(client, log);
        this.client = client;
        this.log = log;
    }
    async search(req) {
        const resultsPerPage = this.getResultsPerPage(req);
        const from = (req.page - 1) * resultsPerPage;
        const size = resultsPerPage;
        const index = req.repoScope
            ? schema_1.RepositorySearchIndexWithScope(req.repoScope)
            : `${schema_1.RepositoryIndexNamePrefix}*`;
        const queryStr = req.query.toLowerCase();
        const rawRes = await this.client.search({
            index,
            body: {
                from,
                size,
                query: {
                    bool: {
                        should: [
                            {
                                simple_query_string: {
                                    query: queryStr,
                                    fields: [
                                        `${schema_1.RepositoryReservedField}.name^1.0`,
                                        `${schema_1.RepositoryReservedField}.org^1.0`,
                                    ],
                                    default_operator: 'or',
                                    lenient: false,
                                    analyze_wildcard: false,
                                    boost: 1.0,
                                },
                            },
                            // This prefix query is mostly for typeahead search.
                            {
                                prefix: {
                                    [`${schema_1.RepositoryReservedField}.name`]: {
                                        value: queryStr,
                                        boost: 100.0,
                                    },
                                },
                            },
                        ],
                        disable_coord: false,
                        adjust_pure_negative: true,
                        boost: 1.0,
                    },
                },
            },
        });
        const hits = rawRes.hits.hits;
        const repos = hits
            .filter(hit => hit._source[schema_1.RepositoryReservedField])
            .map(hit => {
            const repo = hit._source[schema_1.RepositoryReservedField];
            return repo;
        });
        const total = rawRes.hits.total.value;
        return {
            repositories: repos,
            took: rawRes.took,
            total,
            from,
            page: req.page,
            totalPage: Math.ceil(total / resultsPerPage),
        };
    }
}
exports.RepositorySearchClient = RepositorySearchClient;
