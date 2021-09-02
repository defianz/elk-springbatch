"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const fp_1 = require("lodash/fp");
const react_1 = tslib_1.__importDefault(require("react"));
const recompose_1 = require("recompose");
const eui_2 = require("@elastic/eui");
const eui_3 = require("@elastic/eui");
const stat_items_1 = require("../../../stat_items");
const i18n = tslib_1.__importStar(require("./translations"));
const euiColorVis0 = '#00B3A4';
const euiColorVis1 = '#3185FC';
const euiColorVis2 = '#DB1374';
const euiColorVis3 = '#490092';
const euiColorVis9 = '#920000';
const fieldTitleMapping = [
    {
        fields: [
            {
                key: 'hosts',
                value: null,
                color: euiColorVis1,
                icon: 'storage',
            },
        ],
        enableAreaChart: true,
        grow: 2,
        description: i18n.HOSTS,
    },
    {
        fields: [
            {
                key: 'authSuccess',
                description: i18n.AUTHENTICATION_SUCCESS,
                value: null,
                color: euiColorVis0,
                icon: 'check',
            },
            {
                key: 'authFailure',
                description: i18n.AUTHENTICATION_FAILURE,
                value: null,
                color: euiColorVis9,
                icon: 'cross',
            },
        ],
        enableAreaChart: true,
        enableBarChart: true,
        grow: 4,
        description: i18n.AUTHENTICATION,
    },
    {
        fields: [
            {
                key: 'uniqueSourceIps',
                name: i18n.UNIQUE_SOURCE_IPS_ABBREVIATION,
                description: i18n.UNIQUE_SOURCE_IPS,
                value: null,
                color: euiColorVis2,
                icon: 'visMapCoordinate',
            },
            {
                key: 'uniqueDestinationIps',
                description: i18n.UNIQUE_DESTINATION_IPS,
                value: null,
                color: euiColorVis3,
                icon: 'visMapCoordinate',
            },
        ],
        enableAreaChart: true,
        enableBarChart: true,
        grow: 4,
        description: i18n.UNIQUE_IPS,
    },
];
exports.KpiHostsComponent = recompose_1.pure(({ data, loading }) => {
    return loading ? (react_1.default.createElement(eui_1.EuiFlexGroup, { justifyContent: "center", alignItems: "center", style: { minHeight: 247 } },
        react_1.default.createElement(eui_3.EuiFlexItem, { grow: false },
            react_1.default.createElement(eui_2.EuiLoadingSpinner, { size: "xl" })))) : (react_1.default.createElement(eui_1.EuiFlexGroup, null, fieldTitleMapping.map(stat => {
        let statItemProps = {
            ...stat,
            key: `kpi-hosts-summary-${stat.description}`,
        };
        if (stat.fields != null)
            statItemProps = {
                ...statItemProps,
                fields: addValueToFields(stat.fields, data),
            };
        if (stat.enableAreaChart)
            statItemProps = {
                ...statItemProps,
                areaChart: addValueToAreaChart(stat.fields, data),
            };
        if (stat.enableBarChart != null)
            statItemProps = {
                ...statItemProps,
                barChart: addValueToBarChart(stat.fields, data),
            };
        return react_1.default.createElement(stat_items_1.StatItemsComponent, Object.assign({}, statItemProps));
    })));
});
const addValueToFields = (fields, data) => fields.map(field => ({ ...field, value: fp_1.get(field.key, data) }));
const addValueToAreaChart = (fields, data) => fields
    .filter(field => fp_1.get(`${field.key}Histogram`, data) != null)
    .map(field => ({
    ...field,
    value: fp_1.get(`${field.key}Histogram`, data),
    key: `${field.key}Histogram`,
}));
const addValueToBarChart = (fields, data) => {
    if (fields.length === 0)
        return [];
    return fields.reduce((acc, field, idx) => {
        const key = fp_1.get('key', field);
        const x = fp_1.getOr(null, key, data);
        const y = fp_1.get(`${idx}.name`, fields) || fp_1.getOr('', `${idx}.description`, fields);
        return acc.concat([
            {
                ...field,
                value: [
                    {
                        x,
                        y,
                    },
                ],
            },
        ]);
    }, []);
};
