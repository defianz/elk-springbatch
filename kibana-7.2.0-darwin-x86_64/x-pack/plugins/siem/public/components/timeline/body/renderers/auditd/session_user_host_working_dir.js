"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const draggables_1 = require("../../../../draggables");
const i18n = tslib_1.__importStar(require("./translations"));
const helpers_1 = require("../helpers");
const host_working_dir_1 = require("../host_working_dir");
const primary_secondary_user_info_1 = require("./primary_secondary_user_info");
exports.SessionUserHostWorkingDir = recompose_1.pure(({ eventId, contextId, hostName, userName, primary, secondary, workingDirectory, session }) => (React.createElement(React.Fragment, null,
    React.createElement(helpers_1.TokensFlexItem, { grow: false, component: "span" }, i18n.SESSION),
    React.createElement(helpers_1.TokensFlexItem, { grow: false, component: "span" },
        React.createElement(draggables_1.DraggableBadge, { contextId: contextId, eventId: eventId, field: "auditd.session", value: session, iconType: "number" })),
    React.createElement(helpers_1.TokensFlexItem, { grow: false, component: "span" },
        React.createElement(primary_secondary_user_info_1.PrimarySecondaryUserInfo, { contextId: contextId, eventId: eventId, userName: userName, primary: primary, secondary: secondary })),
    hostName != null && (React.createElement(helpers_1.TokensFlexItem, { grow: false, component: "span" }, '@')),
    React.createElement(host_working_dir_1.HostWorkingDir, { contextId: contextId, eventId: eventId, workingDirectory: workingDirectory, hostName: hostName }))));
