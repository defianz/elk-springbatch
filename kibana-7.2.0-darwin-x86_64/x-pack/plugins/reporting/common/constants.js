"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLUGIN_ID = 'reporting';
exports.JOB_COMPLETION_NOTIFICATIONS_SESSION_KEY = 'xpack.reporting.jobCompletionNotifications';
exports.API_BASE_URL = '/api/reporting';
exports.WHITELISTED_JOB_CONTENT_TYPES = [
    'application/json',
    'application/pdf',
    'text/csv',
    'image/png',
];
exports.KBN_SCREENSHOT_HEADER_BLACKLIST = [
    'accept-encoding',
    'content-length',
    'content-type',
    'host',
    'referer',
    // `Transfer-Encoding` is hop-by-hop header that is meaningful
    // only for a single transport-level connection, and shouldn't
    // be stored by caches or forwarded by proxies.
    'transfer-encoding',
];
exports.UI_SETTINGS_CUSTOM_PDF_LOGO = 'xpackReporting:customPdfLogo';
/**
 * The type name used within the Monitoring index to publish reporting stats.
 * @type {string}
 */
exports.KIBANA_REPORTING_TYPE = 'reporting';
exports.PDF_JOB_TYPE = 'printable_pdf';
exports.PNG_JOB_TYPE = 'PNG';
exports.CSV_JOB_TYPE = 'csv';
exports.USES_HEADLESS_JOB_TYPES = [exports.PDF_JOB_TYPE, exports.PNG_JOB_TYPE];
