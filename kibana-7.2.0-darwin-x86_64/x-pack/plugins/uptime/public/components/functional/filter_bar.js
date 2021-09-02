"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// @ts-ignore No typings for EuiSearchBar
const eui_1 = require("@elastic/eui");
const i18n_1 = require("@kbn/i18n");
const react_1 = tslib_1.__importDefault(require("react"));
const higher_order_1 = require("../higher_order");
const queries_1 = require("../../queries");
const filter_bar_loading_1 = require("./filter_bar_loading");
const search_schema_1 = require("./search_schema");
const SEARCH_THRESHOLD = 2;
exports.FilterBarComponent = ({ currentQuery, data, updateQuery }) => {
    if (!data || !data.filterBar) {
        return react_1.default.createElement(filter_bar_loading_1.FilterBarLoading, null);
    }
    const { filterBar: { ids, locations, names, ports, schemes }, } = data;
    // TODO: add a factory function + type for these filter options
    const filters = [
        {
            type: 'field_value_toggle_group',
            field: 'monitor.status',
            items: [
                {
                    value: 'up',
                    name: i18n_1.i18n.translate('xpack.uptime.filterBar.filterUpLabel', {
                        defaultMessage: 'Up',
                    }),
                },
                {
                    value: 'down',
                    name: i18n_1.i18n.translate('xpack.uptime.filterBar.filterDownLabel', {
                        defaultMessage: 'Down',
                    }),
                },
            ],
        },
        {
            type: 'field_value_selection',
            field: 'observer.geo.name',
            name: i18n_1.i18n.translate('xpack.uptime.filterBar.options.location.name', {
                defaultMessage: 'Location',
                description: 'A label applied to a button that lets users filter monitors by their location.',
            }),
            options: locations ? locations.map(location => ({ value: location, view: location })) : [],
        },
        {
            type: 'field_value_selection',
            field: 'monitor.id',
            name: i18n_1.i18n.translate('xpack.uptime.filterBar.options.idLabel', {
                defaultMessage: 'ID',
            }),
            multiSelect: false,
            options: ids
                ? ids.map(({ key }) => ({
                    value: key,
                    view: key,
                }))
                : [],
            searchThreshold: SEARCH_THRESHOLD,
        },
        {
            type: 'field_value_selection',
            field: 'monitor.name',
            name: i18n_1.i18n.translate('xpack.uptime.filterBar.options.nameLabel', {
                defaultMessage: 'Name',
            }),
            multiSelect: false,
            options: names
                ? names.map((nameValue) => ({ value: nameValue, view: nameValue }))
                : [],
            searchThreshold: SEARCH_THRESHOLD,
        },
        {
            type: 'field_value_selection',
            field: 'url.full',
            name: i18n_1.i18n.translate('xpack.uptime.filterBar.options.urlLabel', {
                defaultMessage: 'URL',
            }),
            multiSelect: false,
            options: ids ? ids.map(({ url }) => ({ value: url, view: url })) : [],
            searchThreshold: SEARCH_THRESHOLD,
        },
        {
            type: 'field_value_selection',
            field: 'url.port',
            name: i18n_1.i18n.translate('xpack.uptime.filterBar.options.portLabel', {
                defaultMessage: 'Port',
            }),
            multiSelect: false,
            options: ports
                ? ports.map((portValue) => ({
                    value: portValue,
                    view: portValue,
                }))
                : [],
            searchThreshold: SEARCH_THRESHOLD,
        },
        {
            type: 'field_value_selection',
            field: 'monitor.type',
            name: i18n_1.i18n.translate('xpack.uptime.filterBar.options.schemeLabel', {
                defaultMessage: 'Scheme',
            }),
            multiSelect: false,
            options: schemes
                ? schemes.map((schemeValue) => ({
                    value: schemeValue,
                    view: schemeValue,
                }))
                : [],
            searchThreshold: SEARCH_THRESHOLD,
        },
    ];
    return (react_1.default.createElement("div", { "data-test-subj": "xpack.uptime.filterBar" },
        react_1.default.createElement(eui_1.EuiSearchBar, { box: { incremental: false }, className: "euiFlexGroup--gutterSmall", onChange: updateQuery, filters: filters, query: currentQuery, schema: search_schema_1.filterBarSearchSchema })));
};
exports.FilterBar = higher_order_1.withUptimeGraphQL(exports.FilterBarComponent, queries_1.filterBarQuery);
