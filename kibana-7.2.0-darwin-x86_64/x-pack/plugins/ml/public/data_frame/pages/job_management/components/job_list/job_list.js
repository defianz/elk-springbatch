"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const eui_1 = require("@elastic/eui");
const common_1 = require("../../../../common");
const common_2 = require("./common");
const job_service_1 = require("./job_service");
const columns_1 = require("./columns");
const expanded_row_1 = require("./expanded_row");
const use_refresh_interval_1 = require("./use_refresh_interval");
function getItemIdToExpandedRowMap(itemIds, dataFrameJobs) {
    return itemIds.reduce((m, jobId) => {
        const item = dataFrameJobs.find(job => job.config.id === jobId);
        if (item !== undefined) {
            m[jobId] = react_1.default.createElement(expanded_row_1.ExpandedRow, { item: item });
        }
        return m;
    }, {});
}
const ExpandableTable = eui_1.EuiInMemoryTable;
exports.DataFrameJobList = () => {
    const [dataFrameJobs, setDataFrameJobs] = react_1.useState([]);
    const [blockRefresh, setBlockRefresh] = react_1.useState(false);
    const [expandedRowItemIds, setExpandedRowItemIds] = react_1.useState([]);
    const getJobs = job_service_1.getJobsFactory(setDataFrameJobs, blockRefresh);
    use_refresh_interval_1.useRefreshInterval(getJobs, setBlockRefresh);
    if (dataFrameJobs.length === 0) {
        return (react_1.default.createElement(eui_1.EuiEmptyPrompt, { title: react_1.default.createElement("h2", null, "No data frame jobs found"), actions: [
                react_1.default.createElement(eui_1.EuiButtonEmpty, { onClick: common_1.moveToDataFrameWizard }, "Create your first data frame job"),
            ] }));
    }
    const columns = columns_1.getColumns(getJobs, expandedRowItemIds, setExpandedRowItemIds);
    const sorting = {
        sort: {
            field: common_2.DataFrameJobListColumn.id,
            direction: eui_1.SortDirection.ASC,
        },
    };
    const itemIdToExpandedRowMap = getItemIdToExpandedRowMap(expandedRowItemIds, dataFrameJobs);
    return (react_1.default.createElement(ExpandableTable, { columns: columns, hasActions: false, isExpandable: true, isSelectable: false, items: dataFrameJobs, itemId: common_2.DataFrameJobListColumn.id, itemIdToExpandedRowMap: itemIdToExpandedRowMap, pagination: true, sorting: sorting }));
};
