"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fp_1 = require("lodash/fp");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const draggables_1 = require("../../../draggables");
const i18n = tslib_1.__importStar(require("./translations"));
exports.isNillOrEmptyString = (value) => {
    if (value == null) {
        return true;
    }
    else if (fp_1.isString(value)) {
        return value === '';
    }
    else if (fp_1.isNumber(value)) {
        return !isFinite(value);
    }
};
exports.ProcessDraggable = recompose_1.pure(({ contextId, eventId, processExecutable, processName, processPid }) => {
    if (!exports.isNillOrEmptyString(processName) ||
        (processName === '' &&
            exports.isNillOrEmptyString(processExecutable) &&
            exports.isNillOrEmptyString(processPid))) {
        return (React.createElement(draggables_1.DraggableBadge, { contextId: contextId, eventId: eventId, field: "process.name", value: processName, iconType: "console" }));
    }
    else if (!exports.isNillOrEmptyString(processExecutable) ||
        (processExecutable === '' && exports.isNillOrEmptyString(processPid))) {
        return (React.createElement(draggables_1.DraggableBadge, { contextId: contextId, eventId: eventId, field: "process.executable", value: processExecutable, iconType: "console" }));
    }
    else if (processPid != null) {
        return (React.createElement(draggables_1.DraggableBadge, { contextId: contextId, eventId: eventId, field: "process.pid", value: String(processPid), iconType: "number" }));
    }
    else {
        return null;
    }
});
exports.ProcessDraggableWithNonExistentProcess = recompose_1.pure(({ contextId, eventId, processExecutable, processName, processPid }) => {
    if (processExecutable == null && processName == null && processPid == null) {
        return React.createElement(React.Fragment, null, i18n.NON_EXISTENT);
    }
    else {
        return (React.createElement(exports.ProcessDraggable, { contextId: contextId, eventId: eventId, processExecutable: processExecutable, processName: processName, processPid: processPid }));
    }
});
