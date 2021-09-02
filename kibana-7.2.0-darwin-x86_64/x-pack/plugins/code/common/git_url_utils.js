"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const git_url_parse_1 = tslib_1.__importDefault(require("git-url-parse"));
// return true if the git url is valid, otherwise throw Error with
// exact reasons.
function validateGitUrl(url, hostWhitelist, protocolWhitelist) {
    const repo = git_url_parse_1.default(url);
    if (hostWhitelist && hostWhitelist.length > 0) {
        const hostSet = new Set(hostWhitelist);
        if (!hostSet.has(repo.source)) {
            throw new Error('Git url host is not whitelisted.');
        }
    }
    if (protocolWhitelist && protocolWhitelist.length > 0) {
        const protocolSet = new Set(protocolWhitelist);
        if (!protocolSet.has(repo.protocol)) {
            throw new Error('Git url protocol is not whitelisted.');
        }
    }
    return true;
}
exports.validateGitUrl = validateGitUrl;
