"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = tslib_1.__importStar(require("react"));
exports.SectionError = ({ title, error }) => {
    const { error: errorString, cause, // wrapEsError() on the server adds a "cause" array
    message, } = error.data;
    return (react_1.default.createElement(eui_1.EuiCallOut, { title: title, color: "danger", iconType: "alert" },
        react_1.default.createElement("div", null, message || errorString),
        cause && (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement(eui_1.EuiSpacer, { size: "m" }),
            react_1.default.createElement("ul", null, cause.map((causeMsg, i) => (react_1.default.createElement("li", { key: i }, causeMsg))))))));
};
