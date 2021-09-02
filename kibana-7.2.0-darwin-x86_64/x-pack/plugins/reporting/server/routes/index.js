"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const boom_1 = tslib_1.__importDefault(require("boom"));
const constants_1 = require("../../common/constants");
// @ts-ignore
const enqueue_job_1 = require("../lib/enqueue_job");
const generate_1 = require("./generate");
const jobs_1 = require("./jobs");
const legacy_1 = require("./legacy");
function registerRoutes(server) {
    const config = server.config();
    const DOWNLOAD_BASE_URL = config.get('server.basePath') + `${constants_1.API_BASE_URL}/jobs/download`;
    const { errors: esErrors } = server.plugins.elasticsearch.getCluster('admin');
    const enqueueJob = enqueue_job_1.enqueueJobFactory(server);
    async function handler(exportTypeId, jobParams, request, h) {
        // @ts-ignore
        const user = request.pre.user;
        const headers = request.headers;
        const job = await enqueueJob(exportTypeId, jobParams, user, headers, request);
        // return the queue's job information
        const jobJson = job.toJSON();
        return h
            .response({
            path: `${DOWNLOAD_BASE_URL}/${jobJson.id}`,
            job: jobJson,
        })
            .type('application/json');
    }
    function handleError(exportType, err) {
        if (err instanceof esErrors['401']) {
            return boom_1.default.unauthorized(`Sorry, you aren't authenticated`);
        }
        if (err instanceof esErrors['403']) {
            return boom_1.default.forbidden(`Sorry, you are not authorized to create ${exportType} reports`);
        }
        if (err instanceof esErrors['404']) {
            return boom_1.default.boomify(err, { statusCode: 404 });
        }
        return err;
    }
    generate_1.registerGenerate(server, handler, handleError);
    legacy_1.registerLegacy(server, handler, handleError);
    jobs_1.registerJobs(server);
}
exports.registerRoutes = registerRoutes;
