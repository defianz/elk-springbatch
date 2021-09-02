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
const useFetcher_1 = require("../../../hooks/useFetcher");
const ui_filters_1 = require("../../../services/rest/apm/ui_filters");
const useLocation_1 = require("../../../hooks/useLocation");
const useUrlParams_1 = require("../../../hooks/useUrlParams");
const history_1 = require("../../../utils/history");
const url_helpers_1 = require("../Links/url_helpers");
const environment_filter_values_1 = require("../../../../common/environment_filter_values");
function updateEnvironmentUrl(location, environment) {
    const nextEnvironmentQueryParam = environment !== environment_filter_values_1.ENVIRONMENT_ALL ? environment : undefined;
    history_1.history.push({
        ...location,
        search: url_helpers_1.fromQuery({
            ...url_helpers_1.toQuery(location.search),
            environment: nextEnvironmentQueryParam
        })
    });
}
const ALL_OPTION = {
    value: environment_filter_values_1.ENVIRONMENT_ALL,
    text: i18n_1.i18n.translate('xpack.apm.filter.environment.allLabel', {
        defaultMessage: 'All'
    })
};
const NOT_DEFINED_OPTION = {
    value: environment_filter_values_1.ENVIRONMENT_NOT_DEFINED,
    text: i18n_1.i18n.translate('xpack.apm.filter.environment.notDefinedLabel', {
        defaultMessage: 'Not defined'
    })
};
const SEPARATOR_OPTION = {
    text: `- ${i18n_1.i18n.translate('xpack.apm.filter.environment.selectEnvironmentLabel', { defaultMessage: 'Select environment' })} -`,
    disabled: true
};
function getOptions(environments) {
    const environmentOptions = environments
        .filter(env => env !== environment_filter_values_1.ENVIRONMENT_NOT_DEFINED)
        .map(environment => ({
        value: environment,
        text: environment
    }));
    return [
        ALL_OPTION,
        ...(environments.includes(environment_filter_values_1.ENVIRONMENT_NOT_DEFINED)
            ? [NOT_DEFINED_OPTION]
            : []),
        ...(environmentOptions.length > 0 ? [SEPARATOR_OPTION] : []),
        ...environmentOptions
    ];
}
exports.EnvironmentFilter = () => {
    const location = useLocation_1.useLocation();
    const { urlParams, uiFilters } = useUrlParams_1.useUrlParams();
    const { start, end, serviceName } = urlParams;
    const { environment } = uiFilters;
    const { data: environments = [], status = 'loading' } = useFetcher_1.useFetcher(() => {
        if (start && end) {
            return ui_filters_1.loadEnvironmentsFilter({
                start,
                end,
                serviceName
            });
        }
    }, [start, end, serviceName]);
    return (react_1.default.createElement(eui_1.EuiSelect, { prepend: react_1.default.createElement(eui_1.EuiFormLabel, null, i18n_1.i18n.translate('xpack.apm.filter.environment.label', {
            defaultMessage: 'environment'
        })), options: getOptions(environments), value: environment || environment_filter_values_1.ENVIRONMENT_ALL, onChange: event => {
            updateEnvironmentUrl(location, event.target.value);
        }, isLoading: status === 'loading' }));
};
