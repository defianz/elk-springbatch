"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_to_regexp_1 = tslib_1.__importDefault(require("path-to-regexp"));
const routes_1 = require("../public/components/routes");
const mainRe = path_to_regexp_1.default(routes_1.MAIN);
const mainRootRe = path_to_regexp_1.default(routes_1.MAIN_ROOT);
function parseSchema(url) {
    let [schema, uri] = url.toString().split('//');
    if (!uri) {
        uri = schema;
        // @ts-ignore
        schema = undefined;
    }
    if (!uri.startsWith('/')) {
        uri = '/' + uri;
    }
    return { uri, schema };
}
exports.parseSchema = parseSchema;
function parseGoto(goto) {
    const regex = /L(\d+)(:\d+)?$/;
    const m = regex.exec(goto);
    if (m) {
        const line = parseInt(m[1], 10);
        let character = 0;
        if (m[2]) {
            character = parseInt(m[2].substring(1), 10);
        }
        return {
            line,
            character,
        };
    }
}
exports.parseGoto = parseGoto;
function parseLspUrl(url) {
    const { schema, uri } = parseSchema(url.toString());
    const mainParsed = mainRe.exec(uri);
    const mainRootParsed = mainRootRe.exec(uri);
    if (mainParsed) {
        const [resource, org, repo, pathType, revision, file, goto] = mainParsed.slice(1);
        let position;
        if (goto) {
            position = parseGoto(goto);
        }
        return {
            uri: uri.replace(goto, ''),
            repoUri: `${resource}/${org}/${repo}`,
            pathType,
            revision,
            file,
            schema,
            position,
        };
    }
    else if (mainRootParsed) {
        const [resource, org, repo, pathType, revision] = mainRootParsed.slice(1);
        return {
            uri,
            repoUri: `${resource}/${org}/${repo}`,
            pathType,
            revision,
            schema,
        };
    }
    else {
        throw new Error('invalid url ' + url);
    }
}
exports.parseLspUrl = parseLspUrl;
/*
 * From RepositoryUri to repository name.
 * e.g. github.com/elastic/elasticsearch -> elasticsearch
 */
function toRepoName(uri) {
    const segs = uri.split('/');
    if (segs.length !== 3) {
        throw new Error(`Invalid repository uri ${uri}`);
    }
    return segs[2];
}
exports.toRepoName = toRepoName;
/*
 * From RepositoryUri to repository name with organization prefix.
 * e.g. github.com/elastic/elasticsearch -> elastic/elasticsearch
 */
function toRepoNameWithOrg(uri) {
    const segs = uri.split('/');
    if (segs.length !== 3) {
        throw new Error(`Invalid repository uri ${uri}`);
    }
    return `${segs[1]}/${segs[2]}`;
}
exports.toRepoNameWithOrg = toRepoNameWithOrg;
const compiled = path_to_regexp_1.default.compile(routes_1.MAIN);
function toCanonicalUrl(lspUrl) {
    const [resource, org, repo] = lspUrl.repoUri.split('/');
    if (!lspUrl.pathType) {
        lspUrl.pathType = 'blob';
    }
    let goto;
    if (lspUrl.position) {
        goto = `!L${lspUrl.position.line + 1}:${lspUrl.position.character}`;
    }
    const data = { resource, org, repo, path: lspUrl.file, goto, ...lspUrl };
    const uri = decodeURIComponent(compiled(data));
    return lspUrl.schema ? `${lspUrl.schema}/${uri}` : uri;
}
exports.toCanonicalUrl = toCanonicalUrl;
