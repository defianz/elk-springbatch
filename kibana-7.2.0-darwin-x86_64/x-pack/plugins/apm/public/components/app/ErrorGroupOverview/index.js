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
const error_groups_1 = require("../../../services/rest/apm/error_groups");
const UrlParamsContext_1 = require("../../../context/UrlParamsContext");
const Distribution_1 = require("../ErrorGroupDetails/Distribution");
const List_1 = require("./List");
const ErrorGroupOverview = ({ urlParams, location }) => {
    const { serviceName, start, end, sortField, sortDirection } = urlParams;
    const uiFilters = UrlParamsContext_1.useUiFilters(urlParams);
    const { data: errorDistributionData } = useFetcher_1.useFetcher(() => {
        if (serviceName && start && end) {
            return error_groups_1.loadErrorDistribution({
                serviceName,
                start,
                end,
                uiFilters
            });
        }
    }, [serviceName, start, end, uiFilters]);
    const { data: errorGroupListData } = useFetcher_1.useFetcher(() => {
        if (serviceName && start && end) {
            return error_groups_1.loadErrorGroupList({
                serviceName,
                start,
                end,
                sortField,
                sortDirection,
                uiFilters
            });
        }
    }, [serviceName, start, end, sortField, sortDirection, uiFilters]);
    if (!errorDistributionData || !errorGroupListData) {
        return null;
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(eui_1.EuiFlexGroup, null,
            react_1.default.createElement(eui_1.EuiFlexItem, null,
                react_1.default.createElement(eui_1.EuiPanel, null,
                    react_1.default.createElement(Distribution_1.ErrorDistribution, { distribution: errorDistributionData, title: i18n_1.i18n.translate('xpack.apm.serviceDetails.metrics.errorOccurrencesChartTitle', {
                            defaultMessage: 'Error occurrences'
                        }) })))),
        react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
        react_1.default.createElement(eui_1.EuiPanel, null,
            react_1.default.createElement(eui_1.EuiTitle, { size: "xs" },
                react_1.default.createElement("h3", null, "Errors")),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
            react_1.default.createElement(List_1.ErrorGroupList, { urlParams: urlParams, items: errorGroupListData, location: location }))));
};
exports.ErrorGroupOverview = ErrorGroupOverview;
