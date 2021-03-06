"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const boom_1 = require("boom");
const Joi = tslib_1.__importStar(require("joi"));
const converters_1 = require("./converters");
const elasticsearch_1 = require("./elasticsearch");
const latest_log_entries_1 = require("./latest_log_entries");
const schemas_1 = require("./schemas");
const INITIAL_HORIZON_OFFSET = 1000 * 60 * 60 * 24;
const MAX_HORIZON = 9999999999999;
exports.initAdjacentSearchResultsRoutes = (framework) => {
    const callWithRequest = framework.callWithRequest;
    framework.registerRoute({
        options: {
            validate: {
                payload: Joi.object().keys({
                    after: Joi.number()
                        .min(0)
                        .default(0),
                    before: Joi.number()
                        .min(0)
                        .default(0),
                    fields: schemas_1.logEntryFieldsMappingSchema.required(),
                    indices: schemas_1.indicesSchema.required(),
                    query: Joi.string().required(),
                    target: schemas_1.logEntryTimeSchema.required(),
                }),
            },
        },
        handler: async (request, h) => {
            const timings = {
                esRequestSent: Date.now(),
                esResponseProcessed: 0,
            };
            try {
                const search = (params) => callWithRequest(request, 'search', params);
                const latestTime = await latest_log_entries_1.fetchLatestTime(search, request.payload.indices, request.payload.fields.time);
                const searchResultsAfterTarget = await fetchSearchResults(search, request.payload.indices, request.payload.fields, {
                    tiebreaker: request.payload.target.tiebreaker - 1,
                    time: request.payload.target.time,
                }, request.payload.after, 'asc', request.payload.query, request.payload.target.time + INITIAL_HORIZON_OFFSET, latestTime);
                const searchResultsBeforeTarget = (await fetchSearchResults(search, request.payload.indices, request.payload.fields, request.payload.target, request.payload.before, 'desc', request.payload.query, request.payload.target.time - INITIAL_HORIZON_OFFSET)).reverse();
                timings.esResponseProcessed = Date.now();
                return {
                    results: {
                        after: searchResultsAfterTarget,
                        before: searchResultsBeforeTarget,
                    },
                    timings,
                };
            }
            catch (requestError) {
                throw boom_1.boomify(requestError);
            }
        },
        method: 'POST',
        path: '/api/logging/adjacent-search-results',
    });
};
async function fetchSearchResults(search, indices, fields, target, size, direction, query, horizon, maxHorizon = MAX_HORIZON) {
    if (size <= 0) {
        return [];
    }
    const request = {
        allowNoIndices: true,
        body: {
            _source: false,
            highlight: {
                boundary_scanner: 'word',
                fields: {
                    [fields.message]: {},
                },
                fragment_size: 1,
                number_of_fragments: 100,
                post_tags: [''],
                pre_tags: [''],
            },
            query: {
                bool: {
                    filter: [
                        {
                            query_string: {
                                default_field: fields.message,
                                default_operator: 'AND',
                                query,
                            },
                        },
                        {
                            range: {
                                [fields.time]: {
                                    [direction === 'asc' ? 'gte' : 'lte']: target.time,
                                    [direction === 'asc' ? 'lte' : 'gte']: horizon,
                                },
                            },
                        },
                    ],
                },
            },
            search_after: [target.time, target.tiebreaker],
            size,
            sort: [{ [fields.time]: direction }, { [fields.tiebreaker]: direction }],
        },
        ignoreUnavailable: true,
        index: indices,
    };
    const response = await search(request);
    const hits = response.hits.hits;
    const nextHorizon = horizon + (horizon - target.time);
    if (hits.length >= size || nextHorizon < 0 || nextHorizon > maxHorizon) {
        const filteredHits = hits.filter(elasticsearch_1.isHighlightedHit);
        return filteredHits.map(converters_1.convertHitToSearchResult(fields));
    }
    else {
        return fetchSearchResults(search, indices, fields, target, size, direction, query, nextHorizon, maxHorizon);
    }
}
exports.fetchSearchResults = fetchSearchResults;
