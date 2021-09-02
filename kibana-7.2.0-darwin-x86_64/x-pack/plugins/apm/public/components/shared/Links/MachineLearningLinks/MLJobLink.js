"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const ml_job_constants_1 = require("../../../../../common/ml_job_constants");
const MLLink_1 = require("./MLLink");
exports.MLJobLink = ({ serviceName, transactionType, children }) => {
    const jobId = ml_job_constants_1.getMlJobId(serviceName, transactionType);
    const query = {
        ml: { jobIds: [jobId] }
    };
    return (react_1.default.createElement(MLLink_1.MLLink, { children: children, query: query, path: "/timeseriesexplorer" }));
};
