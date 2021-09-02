"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const eui_1 = require("@elastic/eui");
const constants_1 = require("../../../../constants");
const index_1 = require("../../../../index");
const text_1 = require("../../../../services/text");
const navigation_1 = require("../../../../services/navigation");
const ui_metric_1 = require("../../../../services/ui_metric");
const components_1 = require("../../../../components");
exports.SnapshotTable = ({ snapshots, repositories, reload, openSnapshotDetailsUrl, repositoryFilter, }) => {
    const { core: { i18n }, } = index_1.useAppDependencies();
    const { FormattedMessage } = i18n;
    const { trackUiMetric } = ui_metric_1.uiMetricService;
    const columns = [
        {
            field: 'snapshot',
            name: i18n.translate('xpack.snapshotRestore.snapshotList.table.snapshotColumnTitle', {
                defaultMessage: 'Snapshot',
            }),
            truncateText: true,
            sortable: true,
            render: (snapshotId, snapshot) => (react_1.default.createElement(eui_1.EuiLink, { onClick: () => trackUiMetric(constants_1.UIM_SNAPSHOT_SHOW_DETAILS_CLICK), href: openSnapshotDetailsUrl(snapshot.repository, snapshotId) }, snapshotId)),
        },
        {
            field: 'repository',
            name: i18n.translate('xpack.snapshotRestore.snapshotList.table.repositoryColumnTitle', {
                defaultMessage: 'Repository',
            }),
            truncateText: true,
            sortable: true,
            render: (repositoryName) => (react_1.default.createElement(eui_1.EuiLink, { href: navigation_1.linkToRepository(repositoryName) }, repositoryName)),
        },
        {
            field: 'startTimeInMillis',
            name: i18n.translate('xpack.snapshotRestore.snapshotList.table.startTimeColumnTitle', {
                defaultMessage: 'Date created',
            }),
            truncateText: true,
            sortable: true,
            render: (startTimeInMillis) => (react_1.default.createElement(components_1.DataPlaceholder, { data: startTimeInMillis }, text_1.formatDate(startTimeInMillis))),
        },
        {
            field: 'durationInMillis',
            name: i18n.translate('xpack.snapshotRestore.snapshotList.table.durationColumnTitle', {
                defaultMessage: 'Duration',
            }),
            truncateText: true,
            sortable: true,
            width: '100px',
            render: (durationInMillis, { state }) => {
                if (state === constants_1.SNAPSHOT_STATE.IN_PROGRESS) {
                    return react_1.default.createElement(eui_1.EuiLoadingSpinner, { size: "m" });
                }
                return (react_1.default.createElement(components_1.DataPlaceholder, { data: durationInMillis },
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.snapshotList.table.durationColumnValueLabel", defaultMessage: "{seconds}s", values: { seconds: Math.ceil(durationInMillis / 1000) } })));
            },
        },
        {
            field: 'indices',
            name: i18n.translate('xpack.snapshotRestore.snapshotList.table.indicesColumnTitle', {
                defaultMessage: 'Indices',
            }),
            truncateText: true,
            sortable: true,
            width: '100px',
            render: (indices) => indices.length,
        },
        {
            field: 'shards.total',
            name: i18n.translate('xpack.snapshotRestore.snapshotList.table.shardsColumnTitle', {
                defaultMessage: 'Shards',
            }),
            truncateText: true,
            sortable: true,
            width: '100px',
            render: (totalShards) => totalShards,
        },
        {
            field: 'shards.failed',
            name: i18n.translate('xpack.snapshotRestore.snapshotList.table.failedShardsColumnTitle', {
                defaultMessage: 'Failed shards',
            }),
            truncateText: true,
            sortable: true,
            width: '100px',
            render: (failedShards) => failedShards,
        },
    ];
    // By default, we'll display the most recent snapshots at the top of the table.
    const sorting = {
        sort: {
            field: 'startTimeInMillis',
            direction: 'desc',
        },
    };
    const pagination = {
        initialPageSize: 20,
        pageSizeOptions: [10, 20, 50],
    };
    const searchSchema = {
        fields: {
            repository: {
                type: 'string',
            },
        },
    };
    const search = {
        toolsRight: (react_1.default.createElement(eui_1.EuiButton, { color: "secondary", iconType: "refresh", onClick: reload },
            react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.snapshotList.table.reloadSnapshotsButton", defaultMessage: "Reload" }))),
        box: {
            incremental: true,
            schema: searchSchema,
        },
        filters: [
            {
                type: 'field_value_selection',
                field: 'repository',
                name: 'Repository',
                multiSelect: false,
                options: repositories.map(repository => ({
                    value: repository,
                    view: repository,
                })),
            },
        ],
        defaultQuery: repositoryFilter
            ? eui_1.Query.parse(`repository:'${repositoryFilter}'`, {
                schema: {
                    ...searchSchema,
                    strict: true,
                },
            })
            : '',
    };
    return (react_1.default.createElement(eui_1.EuiInMemoryTable, { items: snapshots, itemId: "name", columns: columns, search: search, sorting: sorting, pagination: pagination, rowProps: () => ({
            'data-test-subj': 'srSnapshotListTableRow',
        }), cellProps: (item, column) => ({
            'data-test-subj': `srSnapshotListTableCell-${column.field}`,
        }) }));
};
