"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const rison_node_1 = tslib_1.__importDefault(require("rison-node"));
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
function moveToDataFrameWizard() {
    window.location.href = '#/data_frames/new_job';
}
exports.moveToDataFrameWizard = moveToDataFrameWizard;
function moveToDataFrameJobsList() {
    window.location.href = '#/data_frames';
}
exports.moveToDataFrameJobsList = moveToDataFrameJobsList;
function moveToDiscover(indexPatternId, kbnBaseUrl) {
    const _g = rison_node_1.default.encode({});
    // Add the index pattern ID to the appState part of the URL.
    const _a = rison_node_1.default.encode({
        index: indexPatternId,
    });
    const baseUrl = chrome_1.default.addBasePath(kbnBaseUrl);
    const hash = `#/discover?_g=${_g}&_a=${_a}`;
    window.location.href = `${baseUrl}${hash}`;
}
exports.moveToDiscover = moveToDiscover;
