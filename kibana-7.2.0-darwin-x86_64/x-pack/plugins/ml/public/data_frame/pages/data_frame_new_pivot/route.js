"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const routes_1 = tslib_1.__importDefault(require("ui/routes"));
// @ts-ignore
const check_license_1 = require("../../../license/check_license");
// @ts-ignore
const check_privilege_1 = require("../../../privilege/check_privilege");
// @ts-ignore
const index_utils_1 = require("../../../util/index_utils");
// @ts-ignore
const breadcrumbs_1 = require("../../breadcrumbs");
const template = `<ml-nav-menu name="new_data_frame" /><ml-new-data-frame />`;
routes_1.default.when('/data_frames/new_job/step/pivot?', {
    template,
    k7Breadcrumbs: breadcrumbs_1.getDataFrameCreateBreadcrumbs,
    resolve: {
        CheckLicense: check_license_1.checkBasicLicense,
        privileges: check_privilege_1.checkCreateDataFrameJobsPrivilege,
        indexPattern: index_utils_1.loadCurrentIndexPattern,
        savedSearch: index_utils_1.loadCurrentSavedSearch,
    },
});
