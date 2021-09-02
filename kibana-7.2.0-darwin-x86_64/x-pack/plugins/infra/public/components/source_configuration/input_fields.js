"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_2 = require("@kbn/i18n/react");
exports.createInputFieldProps = ({ errors, name, onChange, value, }) => ({
    error: errors,
    isInvalid: errors.length > 0,
    name,
    onChange: (evt) => onChange(evt.currentTarget.value),
    value,
});
exports.validateInputFieldNotEmpty = (value) => value === ''
    ? [
        react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.infra.sourceConfiguration.fieldEmptyErrorMessage", defaultMessage: "The field must not be empty" }),
    ]
    : [];
