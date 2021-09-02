"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const react_2 = require("@kbn/i18n/react");
const source_configuration_1 = require("../../utils/source_configuration");
exports.useLogColumnsConfigurationFormState = ({ initialFormState = defaultFormState, }) => {
    const [formStateChanges, setFormStateChanges] = react_1.useState({});
    const resetForm = react_1.useCallback(() => setFormStateChanges({}), []);
    const formState = react_1.useMemo(() => ({
        ...initialFormState,
        ...formStateChanges,
    }), [initialFormState, formStateChanges]);
    const logColumnConfigurationProps = react_1.useMemo(() => formState.logColumns.map((logColumn) => {
        const remove = () => setFormStateChanges(changes => ({
            ...changes,
            logColumns: formState.logColumns.filter(item => item !== logColumn),
        }));
        if (source_configuration_1.isTimestampLogColumnConfiguration(logColumn)) {
            return {
                logColumnConfiguration: logColumn.timestampColumn,
                remove,
                type: 'timestamp',
            };
        }
        else if (source_configuration_1.isMessageLogColumnConfiguration(logColumn)) {
            return {
                logColumnConfiguration: logColumn.messageColumn,
                remove,
                type: 'message',
            };
        }
        else {
            return {
                logColumnConfiguration: logColumn.fieldColumn,
                remove,
                type: 'field',
            };
        }
    }), [formState.logColumns]);
    const addLogColumn = react_1.useCallback((logColumnConfiguration) => setFormStateChanges(changes => ({
        ...changes,
        logColumns: [...formState.logColumns, logColumnConfiguration],
    })), [formState.logColumns]);
    const errors = react_1.useMemo(() => logColumnConfigurationProps.length <= 0
        ? [
            react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.infra.sourceConfiguration.logColumnListEmptyErrorMessage", defaultMessage: "The log column list must not be empty." }),
        ]
        : [], [logColumnConfigurationProps]);
    const isFormValid = react_1.useMemo(() => (errors.length <= 0 ? true : false), [errors]);
    const isFormDirty = react_1.useMemo(() => Object.keys(formStateChanges).length > 0, [formStateChanges]);
    return {
        addLogColumn,
        errors,
        logColumnConfigurationProps,
        formState,
        formStateChanges,
        isFormDirty,
        isFormValid,
        resetForm,
    };
};
const defaultFormState = {
    logColumns: [],
};
