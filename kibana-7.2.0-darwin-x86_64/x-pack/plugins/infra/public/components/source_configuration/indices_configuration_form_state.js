"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const input_fields_1 = require("./input_fields");
exports.useIndicesConfigurationFormState = ({ initialFormState = defaultFormState, }) => {
    const [formStateChanges, setFormStateChanges] = react_1.useState({});
    const resetForm = react_1.useCallback(() => setFormStateChanges({}), []);
    const formState = react_1.useMemo(() => ({
        ...initialFormState,
        ...formStateChanges,
    }), [initialFormState, formStateChanges]);
    const nameFieldProps = react_1.useMemo(() => input_fields_1.createInputFieldProps({
        errors: input_fields_1.validateInputFieldNotEmpty(formState.name),
        name: 'name',
        onChange: name => setFormStateChanges(changes => ({ ...changes, name })),
        value: formState.name,
    }), [formState.name]);
    const logAliasFieldProps = react_1.useMemo(() => input_fields_1.createInputFieldProps({
        errors: input_fields_1.validateInputFieldNotEmpty(formState.logAlias),
        name: 'logAlias',
        onChange: logAlias => setFormStateChanges(changes => ({ ...changes, logAlias })),
        value: formState.logAlias,
    }), [formState.logAlias]);
    const metricAliasFieldProps = react_1.useMemo(() => input_fields_1.createInputFieldProps({
        errors: input_fields_1.validateInputFieldNotEmpty(formState.metricAlias),
        name: 'metricAlias',
        onChange: metricAlias => setFormStateChanges(changes => ({ ...changes, metricAlias })),
        value: formState.metricAlias,
    }), [formState.metricAlias]);
    const containerFieldFieldProps = react_1.useMemo(() => input_fields_1.createInputFieldProps({
        errors: input_fields_1.validateInputFieldNotEmpty(formState.containerField),
        name: `containerField`,
        onChange: containerField => setFormStateChanges(changes => ({ ...changes, containerField })),
        value: formState.containerField,
    }), [formState.containerField]);
    const hostFieldFieldProps = react_1.useMemo(() => input_fields_1.createInputFieldProps({
        errors: input_fields_1.validateInputFieldNotEmpty(formState.hostField),
        name: `hostField`,
        onChange: hostField => setFormStateChanges(changes => ({ ...changes, hostField })),
        value: formState.hostField,
    }), [formState.hostField]);
    const podFieldFieldProps = react_1.useMemo(() => input_fields_1.createInputFieldProps({
        errors: input_fields_1.validateInputFieldNotEmpty(formState.podField),
        name: `podField`,
        onChange: podField => setFormStateChanges(changes => ({ ...changes, podField })),
        value: formState.podField,
    }), [formState.podField]);
    const tiebreakerFieldFieldProps = react_1.useMemo(() => input_fields_1.createInputFieldProps({
        errors: input_fields_1.validateInputFieldNotEmpty(formState.tiebreakerField),
        name: `tiebreakerField`,
        onChange: tiebreakerField => setFormStateChanges(changes => ({ ...changes, tiebreakerField })),
        value: formState.tiebreakerField,
    }), [formState.tiebreakerField]);
    const timestampFieldFieldProps = react_1.useMemo(() => input_fields_1.createInputFieldProps({
        errors: input_fields_1.validateInputFieldNotEmpty(formState.timestampField),
        name: `timestampField`,
        onChange: timestampField => setFormStateChanges(changes => ({ ...changes, timestampField })),
        value: formState.timestampField,
    }), [formState.timestampField]);
    const fieldProps = react_1.useMemo(() => ({
        name: nameFieldProps,
        logAlias: logAliasFieldProps,
        metricAlias: metricAliasFieldProps,
        containerField: containerFieldFieldProps,
        hostField: hostFieldFieldProps,
        podField: podFieldFieldProps,
        tiebreakerField: tiebreakerFieldFieldProps,
        timestampField: timestampFieldFieldProps,
    }), [
        nameFieldProps,
        logAliasFieldProps,
        metricAliasFieldProps,
        containerFieldFieldProps,
        hostFieldFieldProps,
        podFieldFieldProps,
        tiebreakerFieldFieldProps,
        timestampFieldFieldProps,
    ]);
    const errors = react_1.useMemo(() => Object.values(fieldProps).reduce((accumulatedErrors, { error }) => [...accumulatedErrors, ...error], []), [fieldProps]);
    const isFormValid = react_1.useMemo(() => errors.length <= 0, [errors]);
    const isFormDirty = react_1.useMemo(() => Object.keys(formStateChanges).length > 0, [formStateChanges]);
    return {
        errors,
        fieldProps,
        formState,
        formStateChanges,
        isFormDirty,
        isFormValid,
        resetForm,
    };
};
const defaultFormState = {
    name: '',
    description: '',
    logAlias: '',
    metricAlias: '',
    containerField: '',
    hostField: '',
    messageField: [],
    podField: '',
    tiebreakerField: '',
    timestampField: '',
};
