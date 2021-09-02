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
const breadcrumbs_1 = require("../../breadcrumbs");
const template = `<ml-nav-menu name="access-denied" /><ml-data-frame-access-denied />`;
routes_1.default.when('/data_frames/access-denied', {
    template,
    k7Breadcrumbs: breadcrumbs_1.getDataFrameBreadcrumbs,
});
