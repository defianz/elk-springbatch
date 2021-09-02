"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
const route_pre_check_license_1 = require("../../../../lib/route_pre_check_license");
const get_1 = require("./get");
function initPrivilegesApi(server) {
    const routePreCheckLicenseFn = route_pre_check_license_1.routePreCheckLicense(server);
    get_1.initGetPrivilegesApi(server, routePreCheckLicenseFn);
}
exports.initPrivilegesApi = initPrivilegesApi;
