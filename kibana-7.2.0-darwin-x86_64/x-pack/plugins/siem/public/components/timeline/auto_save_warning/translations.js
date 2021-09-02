"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.TITLE = i18n_1.i18n.translate('xpack.siem.timeline.autosave.warning.title', {
    defaultMessage: 'Auto-save disabled until refresh',
});
exports.DESCRIPTION = i18n_1.i18n.translate('xpack.siem.timeline.autosave.warning.description', {
    defaultMessage: 'Another user has made changes to this timeline. Any changes you make will not be auto-saved until you have refreshed this timeline to absorb those changes.',
});
exports.REFRESH_TIMELINE = i18n_1.i18n.translate('xpack.siem.timeline.autosave.warning.refresh.title', {
    defaultMessage: 'Refresh timeline',
});
