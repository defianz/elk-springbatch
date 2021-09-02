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
const react_2 = tslib_1.__importStar(require("react"));
exports.MetricsExplorerGroupBy = react_1.injectI18n(({ intl, options, onChange, fields }) => {
    const handleChange = react_2.useCallback(selectedOptions => {
        const groupBy = (selectedOptions.length === 1 && selectedOptions[0].label) || null;
        onChange(groupBy);
    }, [onChange]);
    return (react_2.default.createElement(eui_1.EuiComboBox, { placeholder: intl.formatMessage({
            id: 'xpack.infra.metricsExplorer.groupByLabel',
            defaultMessage: 'Everything',
        }), fullWidth: true, singleSelection: true, selectedOptions: (options.groupBy && [{ label: options.groupBy }]) || [], options: fields
            .filter(f => f.aggregatable && f.type === 'string')
            .map(f => ({ label: f.name })), onChange: handleChange, isClearable: true }));
});
