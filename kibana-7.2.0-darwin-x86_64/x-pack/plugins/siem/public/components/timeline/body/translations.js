"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.NOTES_TOOLTIP = i18n_1.i18n.translate('xpack.siem.timeline.body.notes.addOrViewNotesForThisEventTooltip', {
    defaultMessage: 'Add or view notes for this event',
});
exports.COPY_TO_CLIPBOARD = i18n_1.i18n.translate('xpack.siem.timeline.body.copyToClipboardButtonLabel', {
    defaultMessage: 'Copy to Clipboard',
});
exports.UNPINNED = i18n_1.i18n.translate('xpack.siem.timeline.body.pinning.unpinnedTooltip', {
    defaultMessage: 'This is event is NOT persisted with the timeline',
});
exports.PINNED = i18n_1.i18n.translate('xpack.siem.timeline.body.pinning.pinnedTooltip', {
    defaultMessage: 'This event is persisted with the timeline',
});
exports.PINNED_WITH_NOTES = i18n_1.i18n.translate('xpack.siem.timeline.body.pinning.pinnnedWithNotesTooltip', {
    defaultMessage: 'This event cannot be unpinned because it has notes',
});
exports.EXPAND = i18n_1.i18n.translate('xpack.siem.timeline.body.actions.expandAriaLabel', {
    defaultMessage: 'Expand',
});
exports.COLLAPSE = i18n_1.i18n.translate('xpack.siem.timeline.body.actions.collapseAriaLabel', {
    defaultMessage: 'Collapse',
});
