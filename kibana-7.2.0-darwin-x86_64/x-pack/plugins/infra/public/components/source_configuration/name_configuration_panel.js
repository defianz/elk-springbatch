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
const react_2 = tslib_1.__importDefault(require("react"));
exports.NameConfigurationPanel = ({ isLoading, readOnly, nameFieldProps, }) => (react_2.default.createElement(eui_1.EuiForm, null,
    react_2.default.createElement(eui_1.EuiTitle, { size: "s", "data-test-subj": "sourceConfigurationNameSectionTitle" },
        react_2.default.createElement("h3", null,
            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.sourceConfiguration.nameSectionTitle", defaultMessage: "Name" }))),
    react_2.default.createElement(eui_1.EuiSpacer, { size: "m" }),
    react_2.default.createElement(eui_1.EuiFormRow, { error: nameFieldProps.error, fullWidth: true, isInvalid: nameFieldProps.isInvalid, label: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.sourceConfiguration.nameLabel", defaultMessage: "Name" }) },
        react_2.default.createElement(eui_1.EuiFieldText, Object.assign({ "data-test-subj": "nameInput", fullWidth: true, disabled: isLoading, readOnly: readOnly, isLoading: isLoading }, nameFieldProps)))));
