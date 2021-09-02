"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const authorized_user_pre_routing_1 = require("./authorized_user_pre_routing");
// @ts-ignore
const reporting_feature_pre_routing_1 = require("./reporting_feature_pre_routing");
const API_TAG = 'api';
function getRouteConfigFactoryReportingPre(server) {
    const authorizedUserPreRouting = authorized_user_pre_routing_1.authorizedUserPreRoutingFactory(server);
    const reportingFeaturePreRouting = reporting_feature_pre_routing_1.reportingFeaturePreRoutingFactory(server);
    return (getFeatureId) => {
        const preRouting = [{ method: authorizedUserPreRouting, assign: 'user' }];
        if (getFeatureId) {
            preRouting.push(reportingFeaturePreRouting(getFeatureId));
        }
        return {
            tags: [API_TAG],
            pre: preRouting,
        };
    };
}
exports.getRouteConfigFactoryReportingPre = getRouteConfigFactoryReportingPre;
function getRouteConfigFactoryManagementPre(server) {
    const authorizedUserPreRouting = authorized_user_pre_routing_1.authorizedUserPreRoutingFactory(server);
    const reportingFeaturePreRouting = reporting_feature_pre_routing_1.reportingFeaturePreRoutingFactory(server);
    const managementPreRouting = reportingFeaturePreRouting(() => 'management');
    return () => {
        return {
            pre: [
                { method: authorizedUserPreRouting, assign: 'user' },
                { method: managementPreRouting, assign: 'management' },
            ],
        };
    };
}
exports.getRouteConfigFactoryManagementPre = getRouteConfigFactoryManagementPre;
// NOTE: We're disabling range request for downloading the PDF. There's a bug in Firefox's PDF.js viewer
// (https://github.com/mozilla/pdf.js/issues/8958) where they're using a range request to retrieve the
// TOC at the end of the PDF, but it's sending multiple cookies and causing our auth to fail with a 401.
// Additionally, the range-request doesn't alleviate any performance issues on the server as the entire
// download is loaded into memory.
function getRouteConfigFactoryDownloadPre(server) {
    const getManagementRouteConfig = getRouteConfigFactoryManagementPre(server);
    return () => ({
        ...getManagementRouteConfig(),
        tags: [API_TAG],
        response: {
            ranges: false,
        },
    });
}
exports.getRouteConfigFactoryDownloadPre = getRouteConfigFactoryDownloadPre;
