"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
const lodash_1 = require("lodash");
const elastic_idx_1 = require("@kbn/elastic-idx");
exports.logStacktraceTab = {
    key: 'log_stacktrace',
    label: i18n_1.i18n.translate('xpack.apm.propertiesTable.tabs.logStacktraceLabel', {
        defaultMessage: 'Log stacktrace'
    })
};
exports.exceptionStacktraceTab = {
    key: 'exception_stacktrace',
    label: i18n_1.i18n.translate('xpack.apm.propertiesTable.tabs.exceptionStacktraceLabel', {
        defaultMessage: 'Exception stacktrace'
    })
};
exports.metadataTab = {
    key: 'metadata',
    label: i18n_1.i18n.translate('xpack.apm.propertiesTable.tabs.metadataLabel', {
        defaultMessage: 'Metadata'
    })
};
function getTabs(error) {
    const hasLogStacktrace = !lodash_1.isEmpty(elastic_idx_1.idx(error, _ => _.error.log.stacktrace));
    return [
        ...(hasLogStacktrace ? [exports.logStacktraceTab] : []),
        exports.exceptionStacktraceTab,
        exports.metadataTab
    ];
}
exports.getTabs = getTabs;
