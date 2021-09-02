"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const moment_timezone_1 = tslib_1.__importDefault(require("moment-timezone"));
const React = tslib_1.__importStar(require("react"));
const react_1 = require("react");
const recompose_1 = require("recompose");
const fp_1 = require("lodash/fp");
const kibana_framework_adapter_1 = require("../../lib/adapters/framework/kibana_framework_adapter");
const empty_value_1 = require("../empty_value");
const localized_date_tooltip_1 = require("../localized_date_tooltip");
exports.PreferenceFormattedDate = recompose_1.pure(({ value }) => {
    const config = react_1.useContext(kibana_framework_adapter_1.KibanaConfigContext);
    return (React.createElement(React.Fragment, null, config.dateFormat && config.dateFormatTz && config.timezone
        ? moment_timezone_1.default
            .tz(value, config.dateFormatTz === 'Browser' ? config.timezone : config.dateFormatTz)
            .format(config.dateFormat)
        : moment_timezone_1.default.utc(value).toISOString()));
});
exports.getMaybeDate = (value) => {
    if (fp_1.isString(value) && value.trim() !== '') {
        const maybeDate = moment_timezone_1.default(new Date(value));
        if (maybeDate.isValid() || isNaN(+value)) {
            return maybeDate;
        }
        else {
            return moment_timezone_1.default(new Date(+value));
        }
    }
    else {
        return moment_timezone_1.default(new Date(value));
    }
};
/**
 * Renders the specified date value in a format determined by the user's preferences,
 * with a tooltip that renders:
 * - the name of the field
 * - a humanized relative date (e.g. 16 minutes ago)
 * - a long representation of the date that includes the day of the week (e.g. Thursday, March 21, 2019 6:47pm)
 * - the raw date value (e.g. 2019-03-22T00:47:46Z)
 */
exports.FormattedDate = recompose_1.pure(({ value, fieldName }) => {
    if (value == null) {
        return empty_value_1.getOrEmptyTagFromValue(value);
    }
    const maybeDate = exports.getMaybeDate(value);
    return maybeDate.isValid() ? (React.createElement(localized_date_tooltip_1.LocalizedDateTooltip, { date: maybeDate.toDate(), fieldName: fieldName },
        React.createElement(exports.PreferenceFormattedDate, { value: maybeDate.toDate() }))) : (empty_value_1.getOrEmptyTagFromValue(value));
});
