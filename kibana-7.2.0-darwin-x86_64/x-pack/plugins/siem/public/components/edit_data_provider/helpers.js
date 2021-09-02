"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const fp_1 = require("lodash/fp");
const source_1 = require("../../containers/source");
const data_provider_1 = require("../timeline/data_providers/data_provider");
const i18n = tslib_1.__importStar(require("./translations"));
/** The list of operators to display in the `Operator` select  */
exports.operatorLabels = [
    {
        label: i18n.IS,
    },
    {
        label: i18n.IS_NOT,
    },
    {
        label: i18n.EXISTS,
    },
    {
        label: i18n.DOES_NOT_EXIST,
    },
];
/** Returns the names of fields in a category */
exports.getFieldNames = (category) => category.fields != null && Object.keys(category.fields).length > 0
    ? Object.keys(category.fields)
    : [];
/** Returns all field names by category, for display in an `EuiComboBox`  */
exports.getCategorizedFieldNames = (browserFields) => Object.keys(browserFields)
    .sort()
    .map(categoryId => ({
    label: categoryId,
    options: exports.getFieldNames(browserFields[categoryId]).map(fieldId => ({
        label: fieldId,
    })),
}));
/** Returns true if the specified field name is valid */
exports.selectionsAreValid = ({ browserFields, selectedField, selectedOperator, }) => {
    const fieldId = selectedField.length > 0 ? selectedField[0].label : '';
    const operator = selectedOperator.length > 0 ? selectedOperator[0].label : '';
    const fieldIsValid = source_1.getAllFieldsByName(browserFields)[fieldId] != null;
    const operatorIsValid = fp_1.findIndex(o => o.label === operator, exports.operatorLabels) !== -1;
    return fieldIsValid && operatorIsValid;
};
/** Returns a `QueryOperator` based on the user's Operator selection */
exports.getQueryOperatorFromSelection = (selectedOperator) => {
    const selection = selectedOperator.length > 0 ? selectedOperator[0].label : '';
    switch (selection) {
        case i18n.IS: // fall through
        case i18n.IS_NOT:
            return data_provider_1.IS_OPERATOR;
        case i18n.EXISTS: // fall through
        case i18n.DOES_NOT_EXIST:
            return data_provider_1.EXISTS_OPERATOR;
        default:
            return data_provider_1.IS_OPERATOR;
    }
};
/**
 * Returns `true` when the search excludes results that match the specified data provider
 */
exports.getExcludedFromSelection = (selectedOperator) => {
    const selection = selectedOperator.length > 0 ? selectedOperator[0].label : '';
    switch (selection) {
        case i18n.IS_NOT: // fall through
        case i18n.DOES_NOT_EXIST:
            return true;
        default:
            return false;
    }
};
