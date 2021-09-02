"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const indices_configuration_form_state_1 = require("./indices_configuration_form_state");
const log_columns_configuration_form_state_1 = require("./log_columns_configuration_form_state");
exports.useSourceConfigurationFormState = (configuration) => {
    const indicesConfigurationFormState = indices_configuration_form_state_1.useIndicesConfigurationFormState({
        initialFormState: react_1.useMemo(() => configuration
            ? {
                name: configuration.name,
                description: configuration.description,
                logAlias: configuration.logAlias,
                metricAlias: configuration.metricAlias,
                containerField: configuration.fields.container,
                hostField: configuration.fields.host,
                messageField: configuration.fields.message,
                podField: configuration.fields.pod,
                tiebreakerField: configuration.fields.tiebreaker,
                timestampField: configuration.fields.timestamp,
            }
            : undefined, [configuration]),
    });
    const logColumnsConfigurationFormState = log_columns_configuration_form_state_1.useLogColumnsConfigurationFormState({
        initialFormState: react_1.useMemo(() => configuration
            ? {
                logColumns: configuration.logColumns,
            }
            : undefined, [configuration]),
    });
    const errors = react_1.useMemo(() => [...indicesConfigurationFormState.errors, ...logColumnsConfigurationFormState.errors], [indicesConfigurationFormState.errors, logColumnsConfigurationFormState.errors]);
    const resetForm = react_1.useCallback(() => {
        indicesConfigurationFormState.resetForm();
        logColumnsConfigurationFormState.resetForm();
    }, [indicesConfigurationFormState.resetForm, logColumnsConfigurationFormState.formState]);
    const isFormDirty = react_1.useMemo(() => indicesConfigurationFormState.isFormDirty || logColumnsConfigurationFormState.isFormDirty, [indicesConfigurationFormState.isFormDirty, logColumnsConfigurationFormState.isFormDirty]);
    const isFormValid = react_1.useMemo(() => indicesConfigurationFormState.isFormValid && logColumnsConfigurationFormState.isFormValid, [indicesConfigurationFormState.isFormValid, logColumnsConfigurationFormState.isFormValid]);
    const formState = react_1.useMemo(() => ({
        name: indicesConfigurationFormState.formState.name,
        description: indicesConfigurationFormState.formState.description,
        logAlias: indicesConfigurationFormState.formState.logAlias,
        metricAlias: indicesConfigurationFormState.formState.metricAlias,
        fields: {
            container: indicesConfigurationFormState.formState.containerField,
            host: indicesConfigurationFormState.formState.hostField,
            pod: indicesConfigurationFormState.formState.podField,
            tiebreaker: indicesConfigurationFormState.formState.tiebreakerField,
            timestamp: indicesConfigurationFormState.formState.timestampField,
        },
        logColumns: logColumnsConfigurationFormState.formState.logColumns,
    }), [indicesConfigurationFormState.formState, logColumnsConfigurationFormState.formState]);
    const formStateChanges = react_1.useMemo(() => ({
        name: indicesConfigurationFormState.formStateChanges.name,
        description: indicesConfigurationFormState.formStateChanges.description,
        logAlias: indicesConfigurationFormState.formStateChanges.logAlias,
        metricAlias: indicesConfigurationFormState.formStateChanges.metricAlias,
        fields: {
            container: indicesConfigurationFormState.formStateChanges.containerField,
            host: indicesConfigurationFormState.formStateChanges.hostField,
            pod: indicesConfigurationFormState.formStateChanges.podField,
            tiebreaker: indicesConfigurationFormState.formStateChanges.tiebreakerField,
            timestamp: indicesConfigurationFormState.formStateChanges.timestampField,
        },
        logColumns: logColumnsConfigurationFormState.formStateChanges.logColumns,
    }), [
        indicesConfigurationFormState.formStateChanges,
        logColumnsConfigurationFormState.formStateChanges,
    ]);
    return {
        addLogColumn: logColumnsConfigurationFormState.addLogColumn,
        errors,
        formState,
        formStateChanges,
        isFormDirty,
        isFormValid,
        indicesConfigurationProps: indicesConfigurationFormState.fieldProps,
        logColumnConfigurationProps: logColumnsConfigurationFormState.logColumnConfigurationProps,
        resetForm,
    };
};
