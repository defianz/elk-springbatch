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
const jobs_query_1 = require("../lib/jobs_query");
// @ts-ignore
const job_response_handler_1 = require("./lib/job_response_handler");
const route_config_factories_1 = require("./lib/route_config_factories");
const MAIN_ENTRY = `${constants_1.API_BASE_URL}/jobs`;
function registerJobs(server) {
    const jobsQuery = jobs_query_1.jobsQueryFactory(server);
    const getRouteConfig = route_config_factories_1.getRouteConfigFactoryManagementPre(server);
    const getRouteConfigDownload = route_config_factories_1.getRouteConfigFactoryDownloadPre(server);
    // list jobs in the queue, paginated
    server.route({
        path: `${MAIN_ENTRY}/list`,
        method: 'GET',
        config: getRouteConfig(),
        handler: (request) => {
            // @ts-ignore
            const page = parseInt(request.query.page, 10) || 0;
            // @ts-ignore
            const size = Math.min(100, parseInt(request.query.size, 10) || 10);
            // @ts-ignore
            const jobIds = request.query.ids ? request.query.ids.split(',') : null;
            const results = jobsQuery.list(request.pre.management.jobTypes, request.pre.user, page, size, jobIds);
            return results;
        },
    });
    // return the count of all jobs in the queue
    server.route({
        path: `${MAIN_ENTRY}/count`,
        method: 'GET',
        config: getRouteConfig(),
        handler: (request) => {
            const results = jobsQuery.count(request.pre.management.jobTypes, request.pre.user);
            return results;
        },
    });
    // return the raw output from a job
    server.route({
        path: `${MAIN_ENTRY}/output/{docId}`,
        method: 'GET',
        config: getRouteConfig(),
        handler: (request) => {
            const { docId } = request.params;
            return jobsQuery.get(request.pre.user, docId, { includeContent: true }).then((doc) => {
                const job = doc._source;
                if (!job) {
                    throw boom_1.default.notFound();
                }
                const { jobtype: jobType } = job;
                if (!request.pre.management.jobTypes.includes(jobType)) {
                    throw boom_1.default.unauthorized(`Sorry, you are not authorized to download ${jobType} reports`);
                }
                return job.output;
            });
        },
    });
    // return some info about the job
    server.route({
        path: `${MAIN_ENTRY}/info/{docId}`,
        method: 'GET',
        config: getRouteConfig(),
        handler: (request) => {
            const { docId } = request.params;
            return jobsQuery.get(request.pre.user, docId).then((doc) => {
                const job = doc._source;
                if (!job) {
                    throw boom_1.default.notFound();
                }
                const { jobtype: jobType, payload } = job;
                if (!request.pre.management.jobTypes.includes(jobType)) {
                    throw boom_1.default.unauthorized(`Sorry, you are not authorized to view ${jobType} info`);
                }
                return {
                    ...doc._source,
                    payload: {
                        ...payload,
                        headers: undefined,
                    },
                };
            });
        },
    });
    // trigger a download of the output from a job
    const jobResponseHandler = job_response_handler_1.jobResponseHandlerFactory(server);
    server.route({
        path: `${MAIN_ENTRY}/download/{docId}`,
        method: 'GET',
        config: getRouteConfigDownload(),
        handler: async (request, h) => {
            const { docId } = request.params;
            let response = await jobResponseHandler(request.pre.management.jobTypes, request.pre.user, h, { docId });
            const { statusCode } = response;
            if (statusCode !== 200) {
                const logLevel = statusCode === 500 ? 'error' : 'debug';
                server.log([logLevel, 'reporting', 'download'], `Report ${docId} has non-OK status: [${statusCode}] Reason: [${JSON.stringify(response.source)}]`);
            }
            if (!response.isBoom) {
                response = response.header('accept-ranges', 'none');
            }
            return response;
        },
    });
}
exports.registerJobs = registerJobs;
