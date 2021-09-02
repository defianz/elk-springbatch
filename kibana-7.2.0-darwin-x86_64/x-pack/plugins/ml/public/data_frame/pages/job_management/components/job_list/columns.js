"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const i18n_1 = require("@kbn/i18n");
const eui_1 = require("@elastic/eui");
const common_1 = require("./common");
const actions_1 = require("./actions");
exports.getColumns = (getJobs, expandedRowItemIds, setExpandedRowItemIds) => {
    const actions = actions_1.getActions(getJobs);
    function toggleDetails(item) {
        const index = expandedRowItemIds.indexOf(item.config.id);
        if (index !== -1) {
            expandedRowItemIds.splice(index, 1);
            setExpandedRowItemIds([...expandedRowItemIds]);
        }
        else {
            expandedRowItemIds.push(item.config.id);
        }
        // spread to a new array otherwise the component wouldn't re-render
        setExpandedRowItemIds([...expandedRowItemIds]);
    }
    return [
        {
            align: eui_1.RIGHT_ALIGNMENT,
            width: '40px',
            isExpander: true,
            render: (item) => (react_1.default.createElement(eui_1.EuiButtonIcon, { onClick: () => toggleDetails(item), "aria-label": expandedRowItemIds.includes(item.config.id)
                    ? i18n_1.i18n.translate('xpack.ml.dataframe.jobsList.rowCollapse', {
                        defaultMessage: 'Hide details for {jobId}',
                        values: { jobId: item.config.id },
                    })
                    : i18n_1.i18n.translate('xpack.ml.dataframe.jobsList.rowExpand', {
                        defaultMessage: 'Show details for {jobId}',
                        values: { jobId: item.config.id },
                    }), iconType: expandedRowItemIds.includes(item.config.id) ? 'arrowUp' : 'arrowDown' })),
        },
        {
            field: common_1.DataFrameJobListColumn.id,
            name: 'ID',
            sortable: true,
            truncateText: true,
        },
        {
            field: common_1.DataFrameJobListColumn.configSourceIndex,
            name: i18n_1.i18n.translate('xpack.ml.dataframe.sourceIndex', { defaultMessage: 'Source index' }),
            sortable: true,
            truncateText: true,
        },
        {
            field: common_1.DataFrameJobListColumn.configDestIndex,
            name: i18n_1.i18n.translate('xpack.ml.dataframe.targetIndex', { defaultMessage: 'Target index' }),
            sortable: true,
            truncateText: true,
        },
        {
            name: i18n_1.i18n.translate('xpack.ml.dataframe.status', { defaultMessage: 'Status' }),
            sortable: true,
            truncateText: true,
            render(item) {
                const color = item.state.task_state === 'started' ? 'primary' : 'hollow';
                return react_1.default.createElement(eui_1.EuiBadge, { color: color }, item.state.task_state);
            },
        },
        {
            name: i18n_1.i18n.translate('xpack.ml.dataframe.progress', { defaultMessage: 'Progress' }),
            sortable: true,
            truncateText: true,
            render(item) {
                let progress = 0;
                if (item.state.progress !== undefined) {
                    progress = Math.round(item.state.progress.percent_complete);
                }
                return (react_1.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center", gutterSize: "xs" },
                    react_1.default.createElement(eui_1.EuiFlexItem, null,
                        react_1.default.createElement(eui_1.EuiProgress, { value: progress, max: 100, color: "primary", size: "m" },
                            progress,
                            "%")),
                    react_1.default.createElement(eui_1.EuiFlexItem, null,
                        react_1.default.createElement(eui_1.EuiText, { size: "xs" }, `${progress}%`))));
            },
        },
        {
            name: i18n_1.i18n.translate('xpack.ml.dataframe.tableActionLabel', { defaultMessage: 'Actions' }),
            actions,
        },
    ];
};
