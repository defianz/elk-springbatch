"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const fp_1 = require("lodash/fp");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const draggables_1 = require("../../draggables");
exports.PROCESS_NAME_FIELD_NAME = 'process.name';
exports.USER_NAME_FIELD_NAME = 'user.name';
/**
 * Renders a column of draggable badges containing:
 * - `user.name`
 * - `process.name`
 */
exports.UserProcess = recompose_1.pure(({ contextId, eventId, processName, userName }) => (React.createElement(eui_1.EuiFlexGroup, { alignItems: "flexStart", "data-test-subj": "user-process", direction: "column", justifyContent: "center", gutterSize: "none" },
    userName != null
        ? fp_1.uniq(userName).map(user => (React.createElement(eui_1.EuiFlexItem, { grow: false, key: user },
            React.createElement(draggables_1.DraggableBadge, { contextId: contextId, "data-test-subj": "user-name", eventId: eventId, field: exports.USER_NAME_FIELD_NAME, value: user, iconType: "user" }))))
        : null,
    processName != null
        ? fp_1.uniq(processName).map(process => (React.createElement(eui_1.EuiFlexItem, { grow: false, key: process },
            React.createElement(draggables_1.DraggableBadge, { contextId: contextId, "data-test-subj": "process-name", eventId: eventId, field: exports.PROCESS_NAME_FIELD_NAME, value: process, iconType: "console" }))))
        : null)));
