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
function isIntervalValid(interval, intervalType) {
    if (interval !== '' && interval !== undefined) {
        if (intervalType === common_2.PIVOT_SUPPORTED_GROUP_BY_AGGS.HISTOGRAM) {
            if (!common_2.histogramIntervalFormatRegex.test(interval)) {
                return false;
            }
            if (parseFloat(interval) === 0 && parseInt(interval, 10) === 0) {
                return false;
            }
            return true;
        }
        else if (intervalType === common_2.PIVOT_SUPPORTED_GROUP_BY_AGGS.DATE_HISTOGRAM) {
            if (!common_2.dateHistogramIntervalFormatRegex.test(interval)) {
                return false;
            }
            const timeUnitMatch = interval.match(common_2.dateHistogramIntervalFormatRegex);
            if (timeUnitMatch !== null && Array.isArray(timeUnitMatch) && timeUnitMatch.length === 2) {
                const timeUnit = timeUnitMatch[1];
                const intervalNum = parseInt(interval.replace(timeUnit, ''), 10);
                if ((timeUnit === 'w' || timeUnit === 'M' || timeUnit === 'y') && intervalNum > 1) {
                    return false;
                }
            }
            return true;
        }
    }
    return false;
}
exports.isIntervalValid = isIntervalValid;
function getDefaultInterval(defaultData) {
    if (common_2.isGroupByDateHistogram(defaultData)) {
        return defaultData.calendar_interval;
    }
    else if (common_2.isGroupByHistogram(defaultData)) {
        return defaultData.interval;
    }
    return undefined;
}
exports.PopoverForm = ({ defaultData, otherAggNames, onChange, options, }) => {
    const [agg, setAgg] = react_1.useState(defaultData.agg);
    const [aggName, setAggName] = react_1.useState(defaultData.aggName);
    const [field, setField] = react_1.useState(defaultData.field);
    const [interval, setInterval] = react_1.useState(getDefaultInterval(defaultData));
    function getUpdatedItem() {
        const updatedItem = { ...defaultData, agg, aggName, field };
        if (common_2.isGroupByHistogram(updatedItem) && interval !== undefined) {
            updatedItem.interval = interval;
        }
        else if (common_2.isGroupByDateHistogram(updatedItem) && interval !== undefined) {
            updatedItem.calendar_interval = interval;
        }
        // Casting to PivotGroupByConfig because TS would otherwise complain about the
        // PIVOT_SUPPORTED_GROUP_BY_AGGS type for `agg`.
        return updatedItem;
    }
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
        aggNameError = i18n_1.i18n.translate('xpack.ml.dataframe.groupBy.popoverForm.aggNameInvalidCharError', {
            defaultMessage: 'Invalid name. The characters "[", "]", and ">" are not allowed and the name must not start or end with a space character.',
        });
    }
    if (validAggName) {
        validAggName = !otherAggNames.includes(aggName);
        aggNameError = i18n_1.i18n.translate('xpack.ml.dataframe.groupBy.popoverForm.aggNameAlreadyUsedError', {
            defaultMessage: 'Another group by configuration already uses that name.',
        });
    }
    const validInterval = (common_2.isGroupByDateHistogram(defaultData) || common_2.isGroupByHistogram(defaultData)) &&
        isIntervalValid(interval, defaultData.agg);
    let formValid = validAggName;
    if (formValid && (common_2.isGroupByDateHistogram(defaultData) || common_2.isGroupByHistogram(defaultData))) {
        formValid = isIntervalValid(interval, defaultData.agg);
    }
    return (react_1.default.createElement(eui_1.EuiForm, { style: { width: '300px' } },
        react_1.default.createElement(eui_1.EuiFormRow, { error: !validAggName && [aggNameError], isInvalid: !validAggName, label: i18n_1.i18n.translate('xpack.ml.dataframe.groupBy.popoverForm.nameLabel', {
                defaultMessage: 'Group by name',
            }) },
            react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: aggName, isInvalid: !validAggName, onChange: e => setAggName(e.target.value) })),
        availableAggs.length > 0 && (react_1.default.createElement(eui_1.EuiFormRow, { label: i18n_1.i18n.translate('xpack.ml.dataframe.groupby.popoverForm.aggLabel', {
                defaultMessage: 'Aggregation',
            }) },
            react_1.default.createElement(eui_1.EuiSelect, { options: availableAggs, value: agg, onChange: e => setAgg(e.target.value) }))),
        availableFields.length > 0 && (react_1.default.createElement(eui_1.EuiFormRow, { label: i18n_1.i18n.translate('xpack.ml.dataframe.groupBy.popoverForm.fieldLabel', {
                defaultMessage: 'Field',
            }) },
            react_1.default.createElement(eui_1.EuiSelect, { options: availableFields, value: field, onChange: e => setField(e.target.value) }))),
        (common_2.isGroupByDateHistogram(defaultData) || common_2.isGroupByHistogram(defaultData)) && (react_1.default.createElement(eui_1.EuiFormRow, { error: !validInterval && [
                i18n_1.i18n.translate('xpack.ml.dataframe.groupBy.popoverForm.intervalError', {
                    defaultMessage: 'Invalid interval.',
                }),
            ], isInvalid: !validInterval, label: i18n_1.i18n.translate('xpack.ml.dataframe.groupBy.popoverForm.intervalLabel', {
                defaultMessage: 'Interval',
            }) },
            react_1.default.createElement(react_1.Fragment, null,
                common_2.isGroupByHistogram(defaultData) && (react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: interval, isInvalid: !validInterval, onChange: e => setInterval(e.target.value) })),
                common_2.isGroupByDateHistogram(defaultData) && (react_1.default.createElement(eui_1.EuiSelect, { options: [
                        { value: '1m', text: '1m' },
                        { value: '1h', text: '1h' },
                        { value: '1d', text: '1d' },
                        { value: '1w', text: '1w' },
                        { value: '1M', text: '1M' },
                        { value: '1q', text: '1q' },
                        { value: '1y', text: '1y' },
                    ], value: interval, onChange: e => setInterval(e.target.value) }))))),
        react_1.default.createElement(eui_1.EuiFormRow, { hasEmptyLabelSpace: true },
            react_1.default.createElement(eui_1.EuiButton, { isDisabled: !formValid, onClick: () => onChange(getUpdatedItem()) }, i18n_1.i18n.translate('xpack.ml.dataframe.groupBy.popoverForm.submitButtonLabel', {
                defaultMessage: 'Apply',
            })))));
};
