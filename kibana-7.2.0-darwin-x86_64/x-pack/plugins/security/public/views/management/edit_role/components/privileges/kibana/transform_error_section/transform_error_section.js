"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
const react_2 = tslib_1.__importStar(require("react"));
class TransformErrorSection extends react_2.PureComponent {
    render() {
        return (react_2.default.createElement(eui_1.EuiEmptyPrompt, { color: "danger", iconType: "alert", title: react_2.default.createElement("h2", null,
                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.transformErrorSectionTitle", defaultMessage: "Malformed role" })), body: react_2.default.createElement("p", null,
                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.transformErrorSectionDescription", defaultMessage: "This role definition is invalid, and cannot be edited through this screen." })) }));
    }
}
exports.TransformErrorSection = TransformErrorSection;
