"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("../indexer/schema");
const abstract_search_client_1 = require("./abstract_search_client");
class SymbolSearchClient extends abstract_search_client_1.AbstractSearchClient {
    constructor(client, log) {
        super(client, log);
        this.client = client;
        this.log = log;
    }
    async findByQname(qname) {
        const [from, size] = [0, 1];
        const rawRes = await this.client.search({
            index: `${schema_1.SymbolIndexNamePrefix}*`,
            body: {
                from,
                size,
                query: {
                    term: {
                        qname,
                    },
                },
            },
        });
        return this.handleResults(rawRes);
    }
    async suggest(req) {
        const resultsPerPage = this.getResultsPerPage(req);
        const from = (req.page - 1) * resultsPerPage;
        const size = resultsPerPage;
        const index = req.repoScope
            ? schema_1.SymbolSearchIndexWithScope(req.repoScope)
            : `${schema_1.SymbolIndexNamePrefix}*`;
        const rawRes = await this.client.search({
            index,
            body: {
                from,
                size,
                query: {
                    bool: {
                        should: [
                            // Boost more for case sensitive prefix query.
                            {
                                prefix: {
                                    qname: {
                                        value: req.query,
                                        boost: 2.0,
                                    },
                                },
                            },
                            // Boost less for lowercased prefix query.
                            {
                                prefix: {
                                    'qname.lowercased': {
                                        // prefix query does not apply analyzer for query. so manually lowercase the query in here.
                                        value: req.query.toLowerCase(),
                                        boost: 1.0,
                                    },
                                },
                            },
                            // Boost the exact match with case sensitive query the most.
                            {
                                term: {
                                    qname: {
                                        value: req.query,
                                        boost: 20.0,
                                    },
                                },
                            },
                            {
                                term: {
                                    'qname.lowercased': {
                                        // term query does not apply analyzer for query either. so manually lowercase the query in here.
                                        value: req.query.toLowerCase(),
                                        boost: 10.0,
                                    },
                                },
                            },
                            // The same applies for `symbolInformation.name` feild.
                            {
                                prefix: {
                                    'symbolInformation.name': {
                                        value: req.query,
                                        boost: 2.0,
                                    },
                                },
                            },
                            {
                                prefix: {
                                    'symbolInformation.name.lowercased': {
                                        value: req.query.toLowerCase(),
                                        boost: 1.0,
                                    },
                                },
                            },
                            {
                                term: {
                                    'symbolInformation.name': {
                                        value: req.query,
                                        boost: 20.0,
                                    },
                                },
                            },
                            {
                                term: {
                                    'symbolInformation.name.lowercased': {
                                        value: req.query.toLowerCase(),
                                        boost: 10.0,
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
        return this.handleResults(rawRes);
    }
    handleResults(rawRes) {
        const hits = rawRes.hits.hits;
        const symbols = hits.map(hit => {
            const symbol = hit._source;
            return symbol;
        });
        const result = {
            symbols,
            took: rawRes.took,
            total: rawRes.hits.total.value,
        };
        return result;
    }
}
exports.SymbolSearchClient = SymbolSearchClient;
