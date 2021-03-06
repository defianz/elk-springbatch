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
const react_2 = tslib_1.__importDefault(require("react"));
const autocomplete_field_1 = require("../../../components/autocomplete_field");
const toolbar_1 = require("../../../components/eui/toolbar");
const source_configuration_1 = require("../../../components/source_configuration");
const waffle_group_by_controls_1 = require("../../../components/waffle/waffle_group_by_controls");
const waffle_metric_controls_1 = require("../../../components/waffle/waffle_metric_controls");
const waffle_node_type_switcher_1 = require("../../../components/waffle/waffle_node_type_switcher");
const waffle_time_controls_1 = require("../../../components/waffle/waffle_time_controls");
const with_waffle_filters_1 = require("../../../containers/waffle/with_waffle_filters");
const with_waffle_options_1 = require("../../../containers/waffle/with_waffle_options");
const with_waffle_time_1 = require("../../../containers/waffle/with_waffle_time");
const with_kuery_autocompletion_1 = require("../../../containers/with_kuery_autocompletion");
const with_source_1 = require("../../../containers/with_source");
exports.SnapshotToolbar = react_1.injectI18n(({ intl }) => (react_2.default.createElement(toolbar_1.Toolbar, null,
    react_2.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center", justifyContent: "spaceBetween", gutterSize: "m" },
        react_2.default.createElement(eui_1.EuiFlexItem, null,
            react_2.default.createElement(with_source_1.WithSource, null, ({ derivedIndexPattern }) => (react_2.default.createElement(with_kuery_autocompletion_1.WithKueryAutocompletion, { indexPattern: derivedIndexPattern }, ({ isLoadingSuggestions, loadSuggestions, suggestions }) => (react_2.default.createElement(with_waffle_filters_1.WithWaffleFilter, { indexPattern: derivedIndexPattern }, ({ applyFilterQueryFromKueryExpression, filterQueryDraft, isFilterQueryDraftValid, setFilterQueryDraftFromKueryExpression, }) => (react_2.default.createElement(autocomplete_field_1.AutocompleteField, { isLoadingSuggestions: isLoadingSuggestions, isValid: isFilterQueryDraftValid, loadSuggestions: loadSuggestions, onChange: setFilterQueryDraftFromKueryExpression, onSubmit: applyFilterQueryFromKueryExpression, placeholder: intl.formatMessage({
                    id: 'xpack.infra.homePage.toolbar.kqlSearchFieldPlaceholder',
                    defaultMessage: 'Search for infrastructure data??? (e.g. host.name:host-1)',
                }), suggestions: suggestions, value: filterQueryDraft ? filterQueryDraft.expression : '', autoFocus: true })))))))),
        react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
            react_2.default.createElement(with_waffle_time_1.WithWaffleTime, { resetOnUnmount: true }, ({ currentTime, isAutoReloading, jumpToTime, startAutoReload, stopAutoReload }) => (react_2.default.createElement(waffle_time_controls_1.WaffleTimeControls, { currentTime: currentTime, isLiveStreaming: isAutoReloading, onChangeTime: jumpToTime, startLiveStreaming: startAutoReload, stopLiveStreaming: stopAutoReload }))))),
    react_2.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center", gutterSize: "m" },
        react_2.default.createElement(with_source_1.WithSource, null, ({ derivedIndexPattern }) => (react_2.default.createElement(with_waffle_options_1.WithWaffleOptions, null, ({ changeMetric, changeNodeType, changeGroupBy, changeCustomOptions, customOptions, groupBy, metric, nodeType, }) => (react_2.default.createElement(react_2.default.Fragment, null,
            react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                react_2.default.createElement(waffle_node_type_switcher_1.WaffleNodeTypeSwitcher, { nodeType: nodeType, changeNodeType: changeNodeType, changeMetric: changeMetric, changeGroupBy: changeGroupBy })),
            react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                react_2.default.createElement(waffle_metric_controls_1.WaffleMetricControls, { metric: metric, nodeType: nodeType, onChange: changeMetric })),
            react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                react_2.default.createElement(waffle_group_by_controls_1.WaffleGroupByControls, { groupBy: groupBy, nodeType: nodeType, onChange: changeGroupBy, fields: derivedIndexPattern.fields, onChangeCustomOptions: changeCustomOptions, customOptions: customOptions })),
            react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                react_2.default.createElement(source_configuration_1.SourceConfigurationButton, null)))))))))));
