"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
const url_1 = tslib_1.__importDefault(require("url"));
const get_absolute_url_1 = require("../../../common/get_absolute_url");
function getSavedObjectAbsoluteUrl(job, relativeUrl, server) {
    const getAbsoluteUrl = get_absolute_url_1.getAbsoluteUrlFactory(server);
    const { pathname: path, hash, search } = url_1.default.parse(relativeUrl);
    return getAbsoluteUrl({ basePath: job.basePath, path, hash, search });
}
exports.addForceNowQuerystring = async ({ job, conditionalHeaders, logo, server, }) => {
    // if no URLS then its from PNG which should only have one so put it in the array and process as PDF does
    if (!job.urls) {
        if (!job.relativeUrl) {
            throw new Error(`Unable to generate report. Url is not defined.`);
        }
        job.urls = [getSavedObjectAbsoluteUrl(job, job.relativeUrl, server)];
    }
    const urls = job.urls.map(jobUrl => {
        if (!job.forceNow) {
            return jobUrl;
        }
        const parsed = url_1.default.parse(jobUrl, true);
        const hash = url_1.default.parse(parsed.hash.replace(/^#/, ''), true);
        const transformedHash = url_1.default.format({
            pathname: hash.pathname,
            query: {
                ...hash.query,
                forceNow: job.forceNow,
            },
        });
        return url_1.default.format({
            ...parsed,
            hash: transformedHash,
        });
    });
    return { job, conditionalHeaders, logo, urls, server };
};
