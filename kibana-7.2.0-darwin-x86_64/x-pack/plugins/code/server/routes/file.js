"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const boom_1 = tslib_1.__importDefault(require("boom"));
const file_type_1 = tslib_1.__importDefault(require("file-type"));
const git_operations_1 = require("../git_operations");
const buffer_1 = require("../utils/buffer");
const detect_language_1 = require("../utils/detect_language");
const search_1 = require("../search");
const esclient_with_request_1 = require("../utils/esclient_with_request");
const file_1 = require("../../common/file");
function fileRoute(server, gitOps) {
    async function repoExists(req, repoUri) {
        const repoObjectClient = new search_1.RepositoryObjectClient(new esclient_with_request_1.EsClientWithRequest(req));
        try {
            // Check if the repository already exists
            await repoObjectClient.getRepository(repoUri);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    server.route({
        path: '/api/code/repo/{uri*3}/tree/{ref}/{path*}',
        method: 'GET',
        async handler(req) {
            const { uri, path, ref } = req.params;
            const queries = req.query;
            const limit = queries.limit
                ? parseInt(queries.limit, 10)
                : git_operations_1.DEFAULT_TREE_CHILDREN_LIMIT;
            const skip = queries.skip ? parseInt(queries.skip, 10) : 0;
            const depth = queries.depth ? parseInt(queries.depth, 10) : 0;
            const withParents = 'parents' in queries;
            const flatten = 'flatten' in queries;
            const repoExist = await repoExists(req, uri);
            if (!repoExist) {
                return boom_1.default.notFound(`repo ${uri} not found`);
            }
            try {
                return await gitOps.fileTree(uri, path, ref, skip, limit, withParents, depth, flatten);
            }
            catch (e) {
                if (e.isBoom) {
                    return e;
                }
                else {
                    return boom_1.default.internal(e.message || e.name);
                }
            }
        },
    });
    server.route({
        path: '/api/code/repo/{uri*3}/blob/{ref}/{path*}',
        method: 'GET',
        async handler(req, h) {
            const { uri, path, ref } = req.params;
            const repoExist = await repoExists(req, uri);
            if (!repoExist) {
                return boom_1.default.notFound(`repo ${uri} not found`);
            }
            try {
                const blob = await gitOps.fileContent(uri, path, decodeURIComponent(ref));
                if (blob.isBinary()) {
                    const type = file_type_1.default(blob.content());
                    if (type && type.mime && type.mime.startsWith('image/')) {
                        const response = h.response(blob.content());
                        response.type(type.mime);
                        return response;
                    }
                    else {
                        // this api will return a empty response with http code 204
                        return h
                            .response('')
                            .type('application/octet-stream')
                            .code(204);
                    }
                }
                else {
                    const line = req.query.line;
                    if (line) {
                        const [from, to] = line.split(',');
                        let fromLine = parseInt(from, 10);
                        let toLine = to === undefined ? fromLine + 1 : parseInt(to, 10);
                        if (fromLine > toLine) {
                            [fromLine, toLine] = [toLine, fromLine];
                        }
                        const lines = buffer_1.extractLines(blob.content(), fromLine, toLine);
                        const lang = await detect_language_1.detectLanguage(path, lines);
                        return h.response(lines).type(`text/${lang || 'plain'}`);
                    }
                    else if (blob.content().length <= file_1.TEXT_FILE_LIMIT) {
                        const lang = await detect_language_1.detectLanguage(path, blob.content());
                        return h.response(blob.content()).type(`text/${lang || 'plain'}`);
                    }
                    else {
                        return h.response('').type(`text/big`);
                    }
                }
            }
            catch (e) {
                if (e.isBoom) {
                    return e;
                }
                else {
                    return boom_1.default.internal(e.message || e.name);
                }
            }
        },
    });
    server.route({
        path: '/app/code/repo/{uri*3}/raw/{ref}/{path*}',
        method: 'GET',
        async handler(req, h) {
            const { uri, path, ref } = req.params;
            const repoExist = await repoExists(req, uri);
            if (!repoExist) {
                return boom_1.default.notFound(`repo ${uri} not found`);
            }
            try {
                const blob = await gitOps.fileContent(uri, path, ref);
                if (blob.isBinary()) {
                    return h.response(blob.content()).type('application/octet-stream');
                }
                else {
                    return h.response(blob.content()).type('text/plain');
                }
            }
            catch (e) {
                if (e.isBoom) {
                    return e;
                }
                else {
                    return boom_1.default.internal(e.message || e.name);
                }
            }
        },
    });
    server.route({
        path: '/api/code/repo/{uri*3}/history/{ref}',
        method: 'GET',
        handler: historyHandler,
    });
    server.route({
        path: '/api/code/repo/{uri*3}/history/{ref}/{path*}',
        method: 'GET',
        handler: historyHandler,
    });
    async function historyHandler(req) {
        const { uri, ref, path } = req.params;
        const queries = req.query;
        const count = queries.count ? parseInt(queries.count, 10) : 10;
        const after = queries.after !== undefined;
        try {
            const repoExist = await repoExists(req, uri);
            if (!repoExist) {
                return boom_1.default.notFound(`repo ${uri} not found`);
            }
            const repository = await gitOps.openRepo(uri);
            const commit = await gitOps.getCommit(uri, decodeURIComponent(ref));
            const walk = repository.createRevWalk();
            walk.sorting(2 /* TIME */);
            walk.push(commit.id());
            let commits;
            if (path) {
                // magic number 10000: how many commits at the most to iterate in order to find the commits contains the path
                const results = await walk.fileHistoryWalk(path, count, 10000);
                commits = results.map(result => result.commit);
            }
            else {
                walk.push(commit.id());
                commits = await walk.getCommits(count);
            }
            if (after && commits.length > 0) {
                if (commits[0].id().equal(commit.id())) {
                    commits = commits.slice(1);
                }
            }
            return commits.map(git_operations_1.commitInfo);
        }
        catch (e) {
            if (e.isBoom) {
                return e;
            }
            else {
                return boom_1.default.internal(e.message || e.name);
            }
        }
    }
    server.route({
        path: '/api/code/repo/{uri*3}/references',
        method: 'GET',
        async handler(req) {
            const uri = req.params.uri;
            const repoExist = await repoExists(req, uri);
            if (!repoExist) {
                return boom_1.default.notFound(`repo ${uri} not found`);
            }
            try {
                const repository = await gitOps.openRepo(uri);
                const references = await repository.getReferences(1 /* DIRECT */);
                const referenceInfos = await Promise.all(references.map(git_operations_1.referenceInfo));
                return referenceInfos.filter(info => info !== null);
            }
            catch (e) {
                if (e.isBoom) {
                    return e;
                }
                else {
                    return boom_1.default.internal(e.message || e.name);
                }
            }
        },
    });
    server.route({
        path: '/api/code/repo/{uri*3}/diff/{revision}',
        method: 'GET',
        async handler(req) {
            const { uri, revision } = req.params;
            const repoExist = await repoExists(req, uri);
            if (!repoExist) {
                return boom_1.default.notFound(`repo ${uri} not found`);
            }
            try {
                const diff = await gitOps.getCommitDiff(uri, revision);
                return diff;
            }
            catch (e) {
                if (e.isBoom) {
                    return e;
                }
                else {
                    return boom_1.default.internal(e.message || e.name);
                }
            }
        },
    });
    server.route({
        path: '/api/code/repo/{uri*3}/blame/{revision}/{path*}',
        method: 'GET',
        async handler(req) {
            const { uri, path, revision } = req.params;
            const repoExist = await repoExists(req, uri);
            if (!repoExist) {
                return boom_1.default.notFound(`repo ${uri} not found`);
            }
            try {
                const blames = await gitOps.blame(uri, decodeURIComponent(revision), path);
                return blames;
            }
            catch (e) {
                if (e.isBoom) {
                    return e;
                }
                else {
                    return boom_1.default.internal(e.message || e.name);
                }
            }
        },
    });
}
exports.fileRoute = fileRoute;
