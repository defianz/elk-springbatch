"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const elasticsearch_fieldnames_1 = require("../../../common/elasticsearch_fieldnames");
const ml_job_constants_1 = require("../../../common/ml_job_constants");
const callApi_1 = require("./callApi");
async function startMLJob({ serviceName, transactionType }) {
    const indexPatternName = chrome_1.default.getInjected('apmIndexPatternTitle');
    const groups = ['apm', serviceName.toLowerCase()];
    const filter = [
        { term: { [elasticsearch_fieldnames_1.SERVICE_NAME]: serviceName } },
        { term: { [elasticsearch_fieldnames_1.PROCESSOR_EVENT]: 'transaction' } },
        { term: { [elasticsearch_fieldnames_1.TRANSACTION_TYPE]: transactionType } }
    ];
    groups.push(transactionType.toLowerCase());
    return callApi_1.callApi({
        method: 'POST',
        pathname: `/api/ml/modules/setup/apm_transaction`,
        body: JSON.stringify({
            prefix: ml_job_constants_1.getMlPrefix(serviceName, transactionType),
            groups,
            indexPatternName,
            startDatafeed: true,
            query: {
                bool: {
                    filter
                }
            }
        })
    });
}
exports.startMLJob = startMLJob;
async function getHasMLJob({ serviceName, transactionType }) {
    try {
        await callApi_1.callApi({
            method: 'GET',
            pathname: `/api/ml/anomaly_detectors/${ml_job_constants_1.getMlJobId(serviceName, transactionType)}`
        });
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.getHasMLJob = getHasMLJob;
