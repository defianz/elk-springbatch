"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const boom_1 = tslib_1.__importDefault(require("boom"));
const search_1 = require("../search");
const esclient_with_request_1 = require("../utils/esclient_with_request");
function repositorySearchRoute(server, log) {
    server.route({
        path: '/api/code/search/repo',
        method: 'GET',
        async handler(req) {
            let page = 1;
            const { p, q, repoScope } = req.query;
            if (p) {
                page = parseInt(p, 10);
            }
            let scope = [];
            if (typeof repoScope === 'string') {
                scope = repoScope.split(',');
            }
            const searchReq = {
                query: q,
                page,
                repoScope: scope,
            };
            try {
                const repoSearchClient = new search_1.RepositorySearchClient(new esclient_with_request_1.EsClientWithRequest(req), log);
                const res = await repoSearchClient.search(searchReq);
                return res;
            }
            catch (error) {
                return boom_1.default.internal(`Search Exception`);
            }
        },
    });
    server.route({
        path: '/api/code/suggestions/repo',
        method: 'GET',
        async handler(req) {
            let page = 1;
            const { p, q, repoScope } = req.query;
            if (p) {
                page = parseInt(p, 10);
            }
            let scope = [];
            if (typeof repoScope === 'string') {
                scope = repoScope.split(',');
            }
            const searchReq = {
                query: q,
                page,
                repoScope: scope,
            };
            try {
                const repoSearchClient = new search_1.RepositorySearchClient(new esclient_with_request_1.EsClientWithRequest(req), log);
                const res = await repoSearchClient.suggest(searchReq);
                return res;
            }
            catch (error) {
                return boom_1.default.internal(`Search Exception`);
            }
        },
    });
}
exports.repositorySearchRoute = repositorySearchRoute;
function documentSearchRoute(server, log) {
    server.route({
        path: '/api/code/search/doc',
        method: 'GET',
        async handler(req) {
            let page = 1;
            const { p, q, langs, repos, repoScope } = req.query;
            if (p) {
                page = parseInt(p, 10);
            }
            let scope = [];
            if (typeof repoScope === 'string') {
                scope = repoScope.split(',');
            }
            const searchReq = {
                query: q,
                page,
                langFilters: langs ? langs.split(',') : [],
                repoFilters: repos ? decodeURIComponent(repos).split(',') : [],
                repoScope: scope,
            };
            try {
                const docSearchClient = new search_1.DocumentSearchClient(new esclient_with_request_1.EsClientWithRequest(req), log);
                const res = await docSearchClient.search(searchReq);
                return res;
            }
            catch (error) {
                return boom_1.default.internal(`Search Exception`);
            }
        },
    });
    server.route({
        path: '/api/code/suggestions/doc',
        method: 'GET',
        async handler(req) {
            let page = 1;
            const { p, q, repoScope } = req.query;
            if (p) {
                page = parseInt(p, 10);
            }
            let scope = [];
            if (typeof repoScope === 'string') {
                scope = repoScope.split(',');
            }
            const searchReq = {
                query: q,
                page,
                repoScope: scope,
            };
            try {
                const docSearchClient = new search_1.DocumentSearchClient(new esclient_with_request_1.EsClientWithRequest(req), log);
                const res = await docSearchClient.suggest(searchReq);
                return res;
            }
            catch (error) {
                return boom_1.default.internal(`Search Exception`);
            }
        },
    });
}
exports.documentSearchRoute = documentSearchRoute;
function symbolSearchRoute(server, log) {
    const symbolSearchHandler = async (req) => {
        let page = 1;
        const { p, q, repoScope } = req.query;
        if (p) {
            page = parseInt(p, 10);
        }
        let scope = [];
        if (typeof repoScope === 'string') {
            scope = repoScope.split(',');
        }
        const searchReq = {
            query: q,
            page,
            repoScope: scope,
        };
        try {
            const symbolSearchClient = new search_1.SymbolSearchClient(new esclient_with_request_1.EsClientWithRequest(req), log);
            const res = await symbolSearchClient.suggest(searchReq);
            return res;
        }
        catch (error) {
            return boom_1.default.internal(`Search Exception`);
        }
    };
    // Currently these 2 are the same.
    server.route({
        path: '/api/code/suggestions/symbol',
        method: 'GET',
        handler: symbolSearchHandler,
    });
    server.route({
        path: '/api/code/search/symbol',
        method: 'GET',
        handler: symbolSearchHandler,
    });
}
exports.symbolSearchRoute = symbolSearchRoute;
