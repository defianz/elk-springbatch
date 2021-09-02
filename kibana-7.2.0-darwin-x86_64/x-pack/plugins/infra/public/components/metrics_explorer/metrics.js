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
const color_palette_1 = require("../../../common/color_palette");
const types_1 = require("../../../server/routes/metrics_explorer/types");
exports.MetricsExplorerMetrics = react_1.injectI18n(({ intl, options, onChange, fields, autoFocus = false }) => {
    const colors = Object.keys(color_palette_1.MetricsExplorerColor);
    const [inputRef, setInputRef] = react_2.useState(null);
    const [focusOnce, setFocusState] = react_2.useState(false);
    react_2.useEffect(() => {
        if (inputRef && autoFocus && !focusOnce) {
            inputRef.focus();
            setFocusState(true);
        }
    }, [inputRef]);
    // I tried to use useRef originally but the EUIComboBox component's type definition
    // would only accept an actual input element or a callback function (with the same type).
    // This effectivly does the same thing but is compatible with EuiComboBox.
    const handleInputRef = (ref) => {
        if (ref) {
            setInputRef(ref);
        }
    };
    const handleChange = react_2.useCallback(selectedOptions => {
        onChange(selectedOptions.map((opt, index) => ({
            aggregation: options.aggregation,
            field: opt.value,
            color: colors[index],
        })));
    }, [options, onChange]);
    const comboOptions = fields.map(field => ({ label: field.name, value: field.name }));
    const selectedOptions = options.metrics
        .filter(m => m.aggregation !== types_1.MetricsExplorerAggregation.count)
        .map(metric => ({
        label: metric.field || '',
        value: metric.field || '',
        color: color_palette_1.colorTransformer(metric.color || color_palette_1.MetricsExplorerColor.color0),
    }));
    const placeholderText = intl.formatMessage({
        id: 'xpack.infra.metricsExplorer.metricComboBoxPlaceholder',
        defaultMessage: 'choose a metric to plot',
    });
    return (react_2.default.createElement(eui_1.EuiComboBox, { isDisabled: options.aggregation === types_1.MetricsExplorerAggregation.count, placeholder: placeholderText, fullWidth: true, options: comboOptions, selectedOptions: selectedOptions, onChange: handleChange, isClearable: false, inputRef: handleInputRef }));
});
