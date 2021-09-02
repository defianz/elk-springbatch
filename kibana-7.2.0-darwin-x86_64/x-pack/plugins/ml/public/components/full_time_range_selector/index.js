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
const eui_1 = require("@elastic/eui");
const full_time_range_selector_service_1 = require("./full_time_range_selector_service");
// Component for rendering a button which automatically sets the range of the time filter
// to the time range of data in the index(es) mapped to the supplied Kibana index pattern or query.
exports.FullTimeRangeSelector = ({ indexPattern, query, disabled }) => {
    return (react_1.default.createElement(eui_1.EuiButton, { fill: true, isDisabled: disabled, onClick: () => full_time_range_selector_service_1.setFullTimeRange(indexPattern, query) },
        react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.ml.fullTimeRangeSelector.useFullDataButtonLabel", defaultMessage: "Use full {indexPatternTitle} data", values: {
                indexPatternTitle: indexPattern.title,
            } })));
};
