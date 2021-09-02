"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
function getDefaultGroupByConfig(aggName, dropDownName, fieldName, groupByAgg) {
    switch (groupByAgg) {
        case common_1.PIVOT_SUPPORTED_GROUP_BY_AGGS.TERMS:
            return {
                agg: groupByAgg,
                aggName,
                dropDownName,
                field: fieldName,
            };
        case common_1.PIVOT_SUPPORTED_GROUP_BY_AGGS.HISTOGRAM:
            return {
                agg: groupByAgg,
                aggName,
                dropDownName,
                field: fieldName,
                interval: '10',
            };
        case common_1.PIVOT_SUPPORTED_GROUP_BY_AGGS.DATE_HISTOGRAM:
            return {
                agg: groupByAgg,
                aggName,
                dropDownName,
                field: fieldName,
                calendar_interval: '1m',
            };
    }
}
const illegalEsAggNameChars = /[[\]>]/g;
function getPivotDropdownOptions(indexPattern) {
    // The available group by options
    const groupByOptions = [];
    const groupByOptionsData = {};
    // The available aggregations
    const aggOptions = [];
    const aggOptionsData = {};
    const ignoreFieldNames = ['_id', '_index', '_type'];
    const fields = indexPattern.fields
        .filter(field => field.aggregatable === true && !ignoreFieldNames.includes(field.name))
        .map((field) => ({ name: field.name, type: field.type }));
    fields.forEach(field => {
        // Group by
        const availableGroupByAggs = common_1.pivotGroupByFieldSupport[field.type];
        if (availableGroupByAggs !== undefined) {
            availableGroupByAggs.forEach(groupByAgg => {
                // Aggregation name for the group-by is the plain field name. Illegal characters will be removed.
                const aggName = field.name.replace(illegalEsAggNameChars, '').trim();
                // Option name in the dropdown for the group-by is in the form of `sum(fieldname)`.
                const dropDownName = `${groupByAgg}(${field.name})`;
                const groupByOption = { label: dropDownName };
                groupByOptions.push(groupByOption);
                groupByOptionsData[dropDownName] = getDefaultGroupByConfig(aggName, dropDownName, field.name, groupByAgg);
            });
        }
        // Aggregations
        const aggOption = { label: field.name, options: [] };
        const availableAggs = common_1.pivotAggsFieldSupport[field.type];
        if (availableAggs !== undefined) {
            availableAggs.forEach(agg => {
                // Aggregation name is formatted like `fieldname.sum`. Illegal characters will be removed.
                const aggName = `${field.name.replace(illegalEsAggNameChars, '').trim()}.${agg}`;
                // Option name in the dropdown for the aggregation is in the form of `sum(fieldname)`.
                const dropDownName = `${agg}(${field.name})`;
                aggOption.options.push({ label: dropDownName });
                aggOptionsData[dropDownName] = { agg, field: field.name, aggName, dropDownName };
            });
        }
        aggOptions.push(aggOption);
    });
    return {
        groupByOptions,
        groupByOptionsData,
        aggOptions,
        aggOptionsData,
    };
}
exports.getPivotDropdownOptions = getPivotDropdownOptions;
exports.getPivotPreviewDevConsoleStatement = (request) => {
    return `POST _data_frame/transforms/_preview\n${JSON.stringify(request, null, 2)}\n`;
};
