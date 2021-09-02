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
exports.IndicesConfigurationPanel = ({ isLoading, readOnly, logAliasFieldProps, metricAliasFieldProps, }) => (react_2.default.createElement(eui_1.EuiForm, null,
    react_2.default.createElement(eui_1.EuiTitle, { size: "s" },
        react_2.default.createElement("h3", null,
            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.sourceConfiguration.indicesSectionTitle", defaultMessage: "Indices" }))),
    react_2.default.createElement(eui_1.EuiSpacer, { size: "m" }),
    react_2.default.createElement(eui_1.EuiFormRow, { error: metricAliasFieldProps.error, fullWidth: true, helpText: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.sourceConfiguration.metricIndicesDescription", defaultMessage: "Index pattern for matching indices that contain Metricbeat data. The recommended value is {defaultValue}.", values: {
                defaultValue: react_2.default.createElement(eui_1.EuiCode, null, "metricbeat-*"),
            } }), isInvalid: metricAliasFieldProps.isInvalid, label: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.sourceConfiguration.metricIndicesLabel", defaultMessage: "Metric indices" }) },
        react_2.default.createElement(eui_1.EuiFieldText, Object.assign({ "data-test-subj": "metricIndicesInput", fullWidth: true, disabled: isLoading, readOnly: readOnly, isLoading: isLoading }, metricAliasFieldProps))),
    react_2.default.createElement(eui_1.EuiFormRow, { error: logAliasFieldProps.error, fullWidth: true, helpText: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.sourceConfiguration.logIndicesDescription", defaultMessage: "Index pattern for matching indices that contain log data. The recommended value is {defaultValue}.", values: {
                defaultValue: react_2.default.createElement(eui_1.EuiCode, null, "filebeat-*"),
            } }), isInvalid: logAliasFieldProps.isInvalid, label: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.sourceConfiguration.logIndicesLabel", defaultMessage: "Log indices" }) },
        react_2.default.createElement(eui_1.EuiFieldText, Object.assign({ "data-test-subj": "logIndicesInput", fullWidth: true, disabled: isLoading, isLoading: isLoading, readOnly: readOnly }, logAliasFieldProps)))));
