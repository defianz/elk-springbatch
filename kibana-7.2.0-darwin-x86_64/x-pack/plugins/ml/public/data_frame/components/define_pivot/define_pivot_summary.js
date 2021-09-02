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
const aggregation_list_1 = require("../../components/aggregation_list");
const group_by_list_1 = require("../../components/group_by_list");
const pivot_preview_1 = require("./pivot_preview");
const common_1 = require("../../common");
const defaultSearch = '*';
const emptySearch = '';
exports.DefinePivotSummary = ({ search, groupByList, aggList, }) => {
    const kibanaContext = react_1.useContext(common_1.KibanaContext);
    if (!common_1.isKibanaContext(kibanaContext)) {
        return null;
    }
    const pivotQuery = common_1.getPivotQuery(search);
    const displaySearch = search === defaultSearch ? emptySearch : search;
    return (react_1.default.createElement(eui_1.EuiFlexGroup, null,
        react_1.default.createElement(eui_1.EuiFlexItem, { grow: false, style: { minWidth: '420px' } },
            react_1.default.createElement(eui_1.EuiForm, null,
                kibanaContext.currentSavedSearch.id === undefined && typeof search === 'string' && (react_1.default.createElement(react_1.Fragment, null,
                    react_1.default.createElement(eui_1.EuiFormRow, { label: i18n_1.i18n.translate('xpack.ml.dataframe.definePivotSummary.indexPatternLabel', {
                            defaultMessage: 'Index pattern',
                        }) },
                        react_1.default.createElement("span", null, kibanaContext.currentIndexPattern.title)),
                    displaySearch !== emptySearch && (react_1.default.createElement(eui_1.EuiFormRow, { label: i18n_1.i18n.translate('xpack.ml.dataframe.definePivotSummary.queryLabel', {
                            defaultMessage: 'Query',
                        }) },
                        react_1.default.createElement("span", null, displaySearch))))),
                kibanaContext.currentSavedSearch.id !== undefined && (react_1.default.createElement(eui_1.EuiFormRow, { label: i18n_1.i18n.translate('xpack.ml.dataframe.definePivotForm.savedSearchLabel', {
                        defaultMessage: 'Saved search',
                    }) },
                    react_1.default.createElement("span", null, kibanaContext.currentSavedSearch.title))),
                react_1.default.createElement(eui_1.EuiFormRow, { label: i18n_1.i18n.translate('xpack.ml.dataframe.definePivotSummary.groupByLabel', {
                        defaultMessage: 'Group by',
                    }) },
                    react_1.default.createElement(group_by_list_1.GroupByListSummary, { list: groupByList })),
                react_1.default.createElement(eui_1.EuiFormRow, { label: i18n_1.i18n.translate('xpack.ml.dataframe.definePivotSummary.aggregationsLabel', {
                        defaultMessage: 'Aggregations',
                    }) },
                    react_1.default.createElement(aggregation_list_1.AggListSummary, { list: aggList })))),
        react_1.default.createElement(eui_1.EuiFlexItem, null,
            react_1.default.createElement(eui_1.EuiText, null,
                react_1.default.createElement(pivot_preview_1.PivotPreview, { aggs: aggList, groupBy: groupByList, query: pivotQuery })))));
};
