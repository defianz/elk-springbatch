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
exports.FieldsConfigurationPanel = ({ containerFieldProps, hostFieldProps, isLoading, readOnly, podFieldProps, tiebreakerFieldProps, timestampFieldProps, }) => (react_2.default.createElement(eui_1.EuiForm, null,
    react_2.default.createElement(eui_1.EuiTitle, { size: "s" },
        react_2.default.createElement("h3", null,
            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.sourceConfiguration.fieldsSectionTitle", defaultMessage: "Fields" }))),
    react_2.default.createElement(eui_1.EuiSpacer, { size: "m" }),
    react_2.default.createElement(eui_1.EuiFormRow, { error: timestampFieldProps.error, fullWidth: true, helpText: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.sourceConfiguration.timestampFieldDescription", defaultMessage: "Timestamp used to sort log entries. The recommended value is {defaultValue}.", values: {
                defaultValue: react_2.default.createElement(eui_1.EuiCode, null, "@timestamp"),
            } }), isInvalid: timestampFieldProps.isInvalid, label: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.sourceConfiguration.timestampFieldLabel", defaultMessage: "Timestamp" }) },
        react_2.default.createElement(eui_1.EuiFieldText, Object.assign({ fullWidth: true, disabled: isLoading, readOnly: readOnly, isLoading: isLoading }, timestampFieldProps))),
    react_2.default.createElement(eui_1.EuiFormRow, { error: tiebreakerFieldProps.error, fullWidth: true, helpText: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.sourceConfiguration.tiebreakerFieldDescription", defaultMessage: "Field used to break ties between two entries with the same timestamp. The recommended value is {defaultValue}.", values: {
                defaultValue: react_2.default.createElement(eui_1.EuiCode, null, "_doc"),
            } }), isInvalid: tiebreakerFieldProps.isInvalid, label: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.sourceConfiguration.tiebreakerFieldLabel", defaultMessage: "Tiebreaker" }) },
        react_2.default.createElement(eui_1.EuiFieldText, Object.assign({ fullWidth: true, disabled: isLoading, readOnly: readOnly, isLoading: isLoading }, tiebreakerFieldProps))),
    react_2.default.createElement(eui_1.EuiFormRow, { error: containerFieldProps.error, fullWidth: true, helpText: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.sourceConfiguration.containerFieldDescription", defaultMessage: "Field used to identify Docker containers. The recommended value is {defaultValue}.", values: {
                defaultValue: react_2.default.createElement(eui_1.EuiCode, null, "container.id"),
            } }), isInvalid: containerFieldProps.isInvalid, label: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.sourceConfiguration.containerFieldLabel", defaultMessage: "Container ID" }) },
        react_2.default.createElement(eui_1.EuiFieldText, Object.assign({ fullWidth: true, disabled: isLoading, readOnly: readOnly, isLoading: isLoading }, containerFieldProps))),
    react_2.default.createElement(eui_1.EuiFormRow, { error: hostFieldProps.error, fullWidth: true, helpText: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.sourceConfiguration.hostFieldDescription", defaultMessage: "Field used to identify hosts. The recommended value is {defaultValue}.", values: {
                defaultValue: react_2.default.createElement(eui_1.EuiCode, null, "host.name"),
            } }), isInvalid: hostFieldProps.isInvalid, label: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.sourceConfiguration.hostFieldLabel", defaultMessage: "Host name" }) },
        react_2.default.createElement(eui_1.EuiFieldText, Object.assign({ fullWidth: true, disabled: isLoading, readOnly: readOnly, isLoading: isLoading }, hostFieldProps))),
    react_2.default.createElement(eui_1.EuiFormRow, { error: podFieldProps.error, fullWidth: true, helpText: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.sourceConfiguration.podFieldDescription", defaultMessage: "Field used to identify Kubernetes pods. The recommended value is {defaultValue}.", values: {
                defaultValue: react_2.default.createElement(eui_1.EuiCode, null, "kubernetes.pod.uid"),
            } }), isInvalid: podFieldProps.isInvalid, label: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.sourceConfiguration.podFieldLabel", defaultMessage: "Pod ID" }) },
        react_2.default.createElement(eui_1.EuiFieldText, Object.assign({ fullWidth: true, disabled: isLoading, readOnly: readOnly, isLoading: isLoading }, podFieldProps)))));
