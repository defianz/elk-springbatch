"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const i18n_1 = require("@kbn/i18n");
const eui_1 = require("@elastic/eui");
const common_1 = require("../../../../common/types/common");
const common_2 = require("../../common");
exports.PopoverForm = ({ defaultData, otherAggNames, onChange, options, }) => {
    const [aggName, setAggName] = react_1.useState(defaultData.aggName);
    const [agg, setAgg] = react_1.useState(defaultData.agg);
    const [field, setField] = react_1.useState(defaultData.field);
    const optionsArr = common_1.dictionaryToArray(options);
    const availableFields = optionsArr
        .filter(o => o.agg === defaultData.agg)
        .map(o => {
        return { text: o.field };
    });
    const availableAggs = optionsArr
        .filter(o => o.field === defaultData.field)
        .map(o => {
        return { text: o.agg };
    });
    let aggNameError = '';
    let validAggName = common_2.isAggName(aggName);
    if (!validAggName) {
        aggNameError = i18n_1.i18n.translate('xpack.ml.dataframe.agg.popoverForm.aggNameInvalidCharError', {
            defaultMessage: 'Invalid name. The characters "[", "]", and ">" are not allowed and the name must not start or end with a space character.',
        });
    }
    if (validAggName) {
        validAggName = !otherAggNames.includes(aggName);
        aggNameError = i18n_1.i18n.translate('xpack.ml.dataframe.agg.popoverForm.aggNameAlreadyUsedError', {
            defaultMessage: 'Another aggregation already uses that name.',
        });
    }
    const formValid = validAggName;
    return (react_1.default.createElement(eui_1.EuiForm, { style: { width: '300px' } },
        react_1.default.createElement(eui_1.EuiFormRow, { error: !validAggName && [aggNameError], isInvalid: !validAggName, label: i18n_1.i18n.translate('xpack.ml.dataframe.agg.popoverForm.nameLabel', {
                defaultMessage: 'Aggregation name',
            }) },
            react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: aggName, isInvalid: !validAggName, onChange: e => setAggName(e.target.value) })),
        availableAggs.length > 0 && (react_1.default.createElement(eui_1.EuiFormRow, { label: i18n_1.i18n.translate('xpack.ml.dataframe.agg.popoverForm.aggLabel', {
                defaultMessage: 'Aggregation',
            }) },
            react_1.default.createElement(eui_1.EuiSelect, { options: availableAggs, value: agg, onChange: e => setAgg(e.target.value) }))),
        availableFields.length > 0 && (react_1.default.createElement(eui_1.EuiFormRow, { label: i18n_1.i18n.translate('xpack.ml.dataframe.agg.popoverForm.fieldLabel', {
                defaultMessage: 'Field',
            }) },
            react_1.default.createElement(eui_1.EuiSelect, { options: availableFields, value: field, onChange: e => setField(e.target.value) }))),
        react_1.default.createElement(eui_1.EuiFormRow, { hasEmptyLabelSpace: true },
            react_1.default.createElement(eui_1.EuiButton, { isDisabled: !formValid, onClick: () => onChange({ ...defaultData, aggName, agg, field }) }, i18n_1.i18n.translate('xpack.ml.dataframe.agg.popoverForm.submitButtonLabel', {
                defaultMessage: 'Apply',
            })))));
};
