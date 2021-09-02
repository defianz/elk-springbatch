"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const i18n_1 = require("@kbn/i18n");
const react_1 = tslib_1.__importDefault(require("react"));
function TransactionSelect({ transactionTypes, onChange, selectedTransactionType }) {
    return (react_1.default.createElement(eui_1.EuiFormRow, { label: i18n_1.i18n.translate('xpack.apm.serviceDetails.enableAnomalyDetectionPanel.selectTransactionTypeLabel', {
            defaultMessage: 'Select a transaction type for this job'
        }) },
        react_1.default.createElement(eui_1.EuiSuperSelect, { valueOfSelected: selectedTransactionType, onChange: onChange, options: transactionTypes.map(transactionType => {
                return {
                    value: transactionType,
                    inputDisplay: transactionType,
                    dropdownDisplay: (react_1.default.createElement(eui_1.EuiFlexGroup, { justifyContent: "spaceBetween" },
                        react_1.default.createElement(eui_1.EuiFlexItem, null,
                            react_1.default.createElement(eui_1.EuiText, null, transactionType))))
                };
            }) })));
}
exports.TransactionSelect = TransactionSelect;
