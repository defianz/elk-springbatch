"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const line_mapper_1 = require("../../common/line_mapper");
const schema_1 = require("../indexer/schema");
const composite_source_merger_1 = require("../utils/composite_source_merger");
const abstract_search_client_1 = require("./abstract_search_client");
const HIT_MERGE_LINE_INTERVAL = 2; // Inclusive
const MAX_HIT_NUMBER = 5;
class DocumentSearchClient extends abstract_search_client_1.AbstractSearchClient {
    constructor(client, log) {
        super(client, log);
        this.client = client;
        this.log = log;
        this.HIGHLIGHT_TAG = '_@_';
        this.LINE_SEPARATOR = '\n';
    }
    async search(req) {
        const resultsPerPage = this.getResultsPerPage(req);
        const from = (req.page - 1) * resultsPerPage;
        const size = resultsPerPage;
        // The query to search qname field.
        const qnameQuery = {
            constant_score: {
                filter: {
                    match: {
                        qnames: {
                            query: req.query,
                            operator: 'OR',
                            prefix_length: 0,
                            max_expansions: 50,
                            fuzzy_transpositions: true,
                            lenient: false,
                            zero_terms_query: 'NONE',
                            boost: 1.0,
                        },
                    },
                },
                boost: 1.0,
            },
        };
        // The query to search content and path filter.
        const contentAndPathQuery = {
            simple_query_string: {
                query: req.query,
                fields: ['content^1.0', 'path^1.0'],
                default_operator: 'or',
                lenient: false,
                analyze_wildcard: false,
                boost: 1.0,
            },
        };
        // Post filters for repository
        let repositoryPostFilters = [];
        if (req.repoFilters) {
            repositoryPostFilters = req.repoFilters.map((repoUri) => {
                return {
                    term: {
                        repoUri,
                    },
                };
            });
        }
        // Post filters for language
        let languagePostFilters = [];
        if (req.langFilters) {
            languagePostFilters = req.langFilters.map((lang) => {
                return {
                    term: {
                        language: lang,
                    },
                };
            });
        }
        const index = req.repoScope
            ? schema_1.DocumentSearchIndexWithScope(req.repoScope)
            : `${schema_1.DocumentIndexNamePrefix}*`;
        const rawRes = await this.client.search({
            index,
            body: {
                from,
                size,
                query: {
                    bool: {
                        should: [qnameQuery, contentAndPathQuery],
                        disable_coord: false,
                        adjust_pure_negative: true,
                        boost: 1.0,
                    },
                },
                post_filter: {
                    bool: {
                        must: [
                            {
                                bool: {
                                    should: repositoryPostFilters,
                                    disable_coord: false,
                                    adjust_pure_negative: true,
                                    boost: 1.0,
                                },
                            },
                            {
                                bool: {
                                    should: languagePostFilters,
                                    disable_coord: false,
                                    adjust_pure_negative: true,
                                    boost: 1.0,
                                },
                            },
                        ],
                        disable_coord: false,
                        adjust_pure_negative: true,
                        boost: 1.0,
                    },
                },
                aggregations: {
                    repoUri: {
                        terms: {
                            field: 'repoUri',
                            size: 10,
                            min_doc_count: 1,
                            shard_min_doc_count: 0,
                            show_term_doc_count_error: false,
                            order: [
                                {
                                    _count: 'desc',
                                },
                                {
                                    _key: 'asc',
                                },
                            ],
                        },
                    },
                    language: {
                        terms: {
                            field: 'language',
                            size: 10,
                            min_doc_count: 1,
                            shard_min_doc_count: 0,
                            show_term_doc_count_error: false,
                            order: [
                                {
                                    _count: 'desc',
                                },
                                {
                                    _key: 'asc',
                                },
                            ],
                        },
                    },
                },
                highlight: {
                    // TODO: we might need to improve the highlighting separator.
                    pre_tags: [this.HIGHLIGHT_TAG],
                    post_tags: [this.HIGHLIGHT_TAG],
                    fields: {
                        content: {},
                        path: {},
                    },
                },
            },
        });
        const hits = rawRes.hits.hits;
        const aggregations = rawRes.aggregations;
        const results = hits.map(hit => {
            const doc = hit._source;
            const { repoUri, path, language } = doc;
            const highlight = hit.highlight;
            // Similar to https://github.com/lambdalab/lambdalab/blob/master/services/liaceservice/src/main/scala/com/lambdalab/liaceservice/LiaceServiceImpl.scala#L147
            // Might need refactoring.
            const highlightContent = highlight.content;
            let termContent = [];
            if (highlightContent) {
                highlightContent.forEach((c) => {
                    termContent = termContent.concat(this.extractKeywords(c));
                });
            }
            const hitsContent = this.termsToHits(doc.content, termContent);
            const sourceContent = this.getSourceContent(hitsContent, doc);
            const item = {
                uri: repoUri,
                filePath: path,
                language: language,
                hits: hitsContent.length,
                compositeContent: sourceContent,
            };
            return item;
        });
        const total = rawRes.hits.total.value;
        return {
            query: req.query,
            from,
            page: req.page,
            totalPage: Math.ceil(total / resultsPerPage),
            results,
            repoAggregations: aggregations.repoUri.buckets,
            langAggregations: aggregations.language.buckets,
            took: rawRes.took,
            total,
        };
    }
    async suggest(req) {
        const resultsPerPage = this.getResultsPerPage(req);
        const from = (req.page - 1) * resultsPerPage;
        const size = resultsPerPage;
        const index = req.repoScope
            ? schema_1.DocumentSearchIndexWithScope(req.repoScope)
            : `${schema_1.DocumentIndexNamePrefix}*`;
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
                                prefix: {
                                    'path.hierarchy': {
                                        value: queryStr,
                                        boost: 1.0,
                                    },
                                },
                            },
                            {
                                term: {
                                    'path.hierarchy': {
                                        value: queryStr,
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
        const hits = rawRes.hits.hits;
        const results = hits.map(hit => {
            const doc = hit._source;
            const { repoUri, path, language } = doc;
            const item = {
                uri: repoUri,
                filePath: path,
                language: language,
                hits: 0,
                compositeContent: {
                    content: '',
                    lineMapping: [],
                    ranges: [],
                },
            };
            return item;
        });
        const total = rawRes.hits.total.value;
        return {
            query: req.query,
            from,
            page: req.page,
            totalPage: Math.ceil(total / resultsPerPage),
            results,
            took: rawRes.took,
            total,
        };
    }
    getSourceContent(hitsContent, doc) {
        const docInLines = doc.content.split(this.LINE_SEPARATOR);
        let slicedRanges = [];
        if (hitsContent.length === 0) {
            // Always add a placeholder range of the first line so that for filepath
            // matching search result, we will render some file content.
            slicedRanges = [
                {
                    startLine: 0,
                    endLine: 0,
                },
            ];
        }
        else {
            const slicedHighlights = hitsContent.slice(0, MAX_HIT_NUMBER);
            slicedRanges = slicedHighlights.map(hit => ({
                startLine: hit.range.startLoc.line,
                endLine: hit.range.endLoc.line,
            }));
        }
        const expandedRanges = composite_source_merger_1.expandRanges(slicedRanges, HIT_MERGE_LINE_INTERVAL);
        const mergedRanges = composite_source_merger_1.mergeRanges(expandedRanges);
        const lineMapping = new composite_source_merger_1.LineMapping();
        const result = composite_source_merger_1.extractSourceContent(mergedRanges, docInLines, lineMapping);
        const ranges = hitsContent
            .filter(hit => lineMapping.hasLine(hit.range.startLoc.line))
            .map(hit => ({
            startColumn: hit.range.startLoc.column + 1,
            startLineNumber: lineMapping.lineNumber(hit.range.startLoc.line),
            endColumn: hit.range.endLoc.column + 1,
            endLineNumber: lineMapping.lineNumber(hit.range.endLoc.line),
        }));
        return {
            content: result.join(this.LINE_SEPARATOR),
            lineMapping: lineMapping.toStringArray(),
            ranges,
        };
    }
    termsToHits(source, terms) {
        const filteredTerms = terms.filter(t => t.trim().length > 0);
        if (filteredTerms.length === 0) {
            return [];
        }
        const lineMapper = new line_mapper_1.LineMapper(source);
        const regex = new RegExp(`(${filteredTerms.join('|')})`, 'g');
        let match;
        const hits = [];
        do {
            match = regex.exec(source);
            if (match) {
                const begin = match.index;
                const end = regex.lastIndex;
                const startLoc = lineMapper.getLocation(begin);
                const endLoc = lineMapper.getLocation(end);
                const range = {
                    startLoc,
                    endLoc,
                };
                const hit = {
                    range,
                    score: 0.0,
                    term: match[1],
                };
                hits.push(hit);
            }
        } while (match);
        return hits;
    }
    extractKeywords(text) {
        if (!text) {
            return [];
        }
        else {
            const keywordRegex = new RegExp(`${this.HIGHLIGHT_TAG}(\\w*)${this.HIGHLIGHT_TAG}`, 'g');
            const keywords = text.match(keywordRegex);
            if (keywords) {
                return keywords.map((k) => {
                    return k.replace(new RegExp(this.HIGHLIGHT_TAG, 'g'), '');
                });
            }
            else {
                return [];
            }
        }
    }
}
exports.DocumentSearchClient = DocumentSearchClient;
