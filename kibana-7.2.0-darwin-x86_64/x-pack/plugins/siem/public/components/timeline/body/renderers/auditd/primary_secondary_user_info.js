"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const draggables_1 = require("../../../../draggables");
const i18n = tslib_1.__importStar(require("./translations"));
const helpers_1 = require("../helpers");
exports.nilOrUnSet = (value) => value == null || value.toLowerCase() === 'unset';
exports.PrimarySecondary = recompose_1.pure(({ contextId, eventId, primary, secondary }) => {
    if (exports.nilOrUnSet(primary) && exports.nilOrUnSet(secondary)) {
        return null;
    }
    else if (!exports.nilOrUnSet(primary) && exports.nilOrUnSet(secondary)) {
        return (React.createElement(draggables_1.DraggableBadge, { contextId: contextId, eventId: eventId, field: "auditd.summary.actor.primary", value: primary, iconType: "user" }));
    }
    else if (exports.nilOrUnSet(primary) && !exports.nilOrUnSet(secondary)) {
        return (React.createElement(draggables_1.DraggableBadge, { contextId: contextId, eventId: eventId, field: "auditd.summary.actor.secondary", value: secondary, iconType: "user" }));
    }
    else if (primary === secondary) {
        return (React.createElement(draggables_1.DraggableBadge, { contextId: contextId, eventId: eventId, field: "auditd.summary.actor.secondary", value: secondary, iconType: "user" }));
    }
    else {
        return (React.createElement(eui_1.EuiFlexGroup, { gutterSize: "none" },
            React.createElement(helpers_1.TokensFlexItem, { grow: false, component: "span" },
                React.createElement(draggables_1.DraggableBadge, { contextId: contextId, eventId: eventId, field: "auditd.summary.actor.primary", value: primary, iconType: "user" })),
            React.createElement(helpers_1.TokensFlexItem, { grow: false, component: "span" }, i18n.AS),
            React.createElement(helpers_1.TokensFlexItem, { grow: false, component: "span" },
                React.createElement(draggables_1.DraggableBadge, { contextId: contextId, eventId: eventId, field: "auditd.summary.actor.secondary", value: secondary, iconType: "user" }))));
    }
});
exports.PrimarySecondaryUserInfo = recompose_1.pure(({ contextId, eventId, userName, primary, secondary }) => {
    if (exports.nilOrUnSet(userName) && exports.nilOrUnSet(primary) && exports.nilOrUnSet(secondary)) {
        return null;
    }
    else if (!exports.nilOrUnSet(userName) &&
        !exports.nilOrUnSet(primary) &&
        !exports.nilOrUnSet(secondary) &&
        userName === primary &&
        userName === secondary) {
        return (React.createElement(draggables_1.DraggableBadge, { contextId: contextId, eventId: eventId, field: "user.name", value: userName, iconType: "user" }));
    }
    else if (!exports.nilOrUnSet(userName) && exports.nilOrUnSet(primary) && exports.nilOrUnSet(secondary)) {
        return (React.createElement(draggables_1.DraggableBadge, { contextId: contextId, eventId: eventId, field: "user.name", value: userName, iconType: "user" }));
    }
    else {
        return (React.createElement(exports.PrimarySecondary, { contextId: contextId, eventId: eventId, primary: primary, secondary: secondary }));
    }
});
