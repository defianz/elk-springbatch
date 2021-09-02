"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const constants_1 = require("../../../../common/constants");
const host_details_1 = require("../../../pages/hosts/host_details");
const ip_details_1 = require("../../../pages/network/ip_details");
const link_to_1 = require("../../link_to");
const i18n = tslib_1.__importStar(require("../translations"));
exports.setBreadcrumbs = (pathname) => {
    const breadcrumbs = exports.getBreadcrumbsForRoute(pathname);
    if (breadcrumbs) {
        chrome_1.default.breadcrumbs.set(breadcrumbs);
    }
};
exports.siemRootBreadcrumb = [
    {
        text: constants_1.APP_NAME,
        href: link_to_1.getOverviewUrl(),
    },
];
exports.rootBreadcrumbs = {
    overview: exports.siemRootBreadcrumb,
    hosts: [
        ...exports.siemRootBreadcrumb,
        {
            text: i18n.HOSTS,
            href: link_to_1.getHostsUrl(),
        },
    ],
    network: [
        ...exports.siemRootBreadcrumb,
        {
            text: i18n.NETWORK,
            href: link_to_1.getNetworkUrl(),
        },
    ],
    timelines: [
        ...exports.siemRootBreadcrumb,
        {
            text: i18n.TIMELINES,
            href: link_to_1.getTimelinesUrl(),
        },
    ],
};
exports.getBreadcrumbsForRoute = (pathname) => {
    const trailingPath = pathname.match(/([^\/]+$)/);
    if (trailingPath !== null) {
        if (Object.keys(exports.rootBreadcrumbs).includes(trailingPath[0])) {
            return exports.rootBreadcrumbs[trailingPath[0]];
        }
        if (pathname.match(/hosts\/.*?/)) {
            return [...exports.siemRootBreadcrumb, ...host_details_1.getBreadcrumbs(trailingPath[0])];
        }
        else if (pathname.match(/network\/ip\/.*?/)) {
            return [...exports.siemRootBreadcrumb, ...ip_details_1.getBreadcrumbs(trailingPath[0])];
        }
    }
    return null;
};
