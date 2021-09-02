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
const draggables_1 = require("../../../draggables");
const helpers_1 = require("./helpers");
const host_working_dir_1 = require("./host_working_dir");
exports.UserHostWorkingDir = recompose_1.pure(({ contextId, eventId, userName, hostName, workingDirectory }) => userName != null || hostName != null || workingDirectory != null ? (React.createElement(React.Fragment, null,
    React.createElement(helpers_1.TokensFlexItem, { grow: false, component: "span" },
        React.createElement(draggables_1.DraggableBadge, { contextId: contextId, eventId: eventId, field: "user.name", value: userName, iconType: "user" })),
    hostName != null && userName != null && (React.createElement(helpers_1.TokensFlexItem, { grow: false, component: "span" }, '@')),
    React.createElement(host_working_dir_1.HostWorkingDir, { contextId: contextId, eventId: eventId, hostName: hostName, workingDirectory: workingDirectory }))) : null);
