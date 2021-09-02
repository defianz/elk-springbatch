"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const eui_1 = require("@elastic/eui");
const constants_1 = require("../../../../../../common/constants");
const components_1 = require("../../../../components");
const constants_2 = require("../../../../constants");
const index_1 = require("../../../../index");
const text_1 = require("../../../../services/text");
const ui_metric_1 = require("../../../../services/ui_metric");
const RepositoryTableUi = ({ repositories, managedRepository, reload, openRepositoryDetailsUrl, onRepositoryDeleted, history, }) => {
    const { core: { i18n }, } = index_1.useAppDependencies();
    const { FormattedMessage } = i18n;
    const { trackUiMetric } = ui_metric_1.uiMetricService;
    const [selectedItems, setSelectedItems] = react_1.useState([]);
    const columns = [
        {
            field: 'name',
            name: i18n.translate('xpack.snapshotRestore.repositoryList.table.nameColumnTitle', {
                defaultMessage: 'Name',
            }),
            truncateText: true,
            sortable: true,
            render: (name) => {
                return (react_1.default.createElement(react_1.Fragment, null,
                    react_1.default.createElement(eui_1.EuiLink, { onClick: () => trackUiMetric(constants_2.UIM_REPOSITORY_SHOW_DETAILS_CLICK), href: openRepositoryDetailsUrl(name) }, name),
                    "\u00A0\u00A0",
                    managedRepository === name ? (react_1.default.createElement(eui_1.EuiBadge, { color: "primary" },
                        react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryList.table.managedRepositoryBadgeLabel", defaultMessage: "Managed" }))) : null));
            },
        },
        {
            field: 'type',
            name: i18n.translate('xpack.snapshotRestore.repositoryList.table.typeColumnTitle', {
                defaultMessage: 'Type',
            }),
            truncateText: true,
            sortable: true,
            render: (type, repository) => {
                if (type === constants_1.REPOSITORY_TYPES.source) {
                    return text_1.textService.getRepositoryTypeName(type, repository.settings.delegateType);
                }
                return text_1.textService.getRepositoryTypeName(type);
            },
        },
        {
            name: i18n.translate('xpack.snapshotRestore.repositoryList.table.actionsColumnTitle', {
                defaultMessage: 'Actions',
            }),
            actions: [
                {
                    render: ({ name }) => {
                        const label = i18n.translate('xpack.snapshotRestore.repositoryList.table.actionEditTooltip', { defaultMessage: 'Edit' });
                        return (react_1.default.createElement(eui_1.EuiToolTip, { content: label, delay: "long" },
                            react_1.default.createElement(eui_1.EuiButtonIcon, { "aria-label": i18n.translate('xpack.snapshotRestore.repositoryList.table.actionEditAriaLabel', {
                                    defaultMessage: 'Edit repository `{name}`',
                                    values: { name },
                                }), iconType: "pencil", color: "primary", href: `#${constants_2.BASE_PATH}/edit_repository/${name}` })));
                    },
                },
                {
                    render: ({ name }) => {
                        return (react_1.default.createElement(components_1.RepositoryDeleteProvider, null, deleteRepositoryPrompt => {
                            const label = name !== managedRepository
                                ? i18n.translate('xpack.snapshotRestore.repositoryList.table.actionRemoveTooltip', { defaultMessage: 'Remove' })
                                : i18n.translate('xpack.snapshotRestore.repositoryList.table.deleteManagedRepositoryTooltip', {
                                    defaultMessage: 'You cannot delete a managed repository.',
                                });
                            return (react_1.default.createElement(eui_1.EuiToolTip, { content: label, delay: "long" },
                                react_1.default.createElement(eui_1.EuiButtonIcon, { "aria-label": i18n.translate('xpack.snapshotRestore.repositoryList.table.actionRemoveAriaLabel', {
                                        defaultMessage: 'Remove repository `{name}`',
                                        values: { name },
                                    }), iconType: "trash", color: "danger", "data-test-subj": "srRepositoryListDeleteActionButton", onClick: () => deleteRepositoryPrompt([name], onRepositoryDeleted), isDisabled: Boolean(name === managedRepository) })));
                        }));
                    },
                },
            ],
            width: '100px',
        },
    ];
    const sorting = {
        sort: {
            field: 'name',
            direction: 'asc',
        },
    };
    const pagination = {
        initialPageSize: 20,
        pageSizeOptions: [10, 20, 50],
    };
    const selection = {
        onSelectionChange: (newSelectedItems) => setSelectedItems(newSelectedItems),
        selectable: ({ name }) => Boolean(name !== managedRepository),
        selectableMessage: (selectable) => {
            if (!selectable) {
                return i18n.translate('xpack.snapshotRestore.repositoryList.table.deleteManagedRepositoryTooltip', {
                    defaultMessage: 'You cannot delete a managed repository.',
                });
            }
        },
    };
    const search = {
        toolsLeft: selectedItems.length ? (react_1.default.createElement(components_1.RepositoryDeleteProvider, null, (deleteRepositoryPrompt) => {
            return (react_1.default.createElement(eui_1.EuiButton, { onClick: () => deleteRepositoryPrompt(selectedItems.map(repository => repository.name), onRepositoryDeleted), color: "danger", "data-test-subj": "srRepositoryListBulkDeleteActionButton" }, selectedItems.length === 1 ? (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryList.table.deleteSingleRepositoryButton", defaultMessage: "Remove repository" })) : (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryList.table.deleteMultipleRepositoriesButton", defaultMessage: "Remove repositories" }))));
        })) : (undefined),
        toolsRight: (react_1.default.createElement(eui_1.EuiFlexGroup, { gutterSize: "m", justifyContent: "spaceAround" },
            react_1.default.createElement(eui_1.EuiFlexItem, null,
                react_1.default.createElement(eui_1.EuiButton, { color: "secondary", iconType: "refresh", onClick: reload },
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryList.table.reloadRepositoriesButton", defaultMessage: "Reload" }))),
            react_1.default.createElement(eui_1.EuiFlexItem, null,
                react_1.default.createElement(eui_1.EuiButton, { href: history.createHref({
                        pathname: `${constants_2.BASE_PATH}/add_repository`,
                    }), fill: true, iconType: "plusInCircle", "data-test-subj": "srRepositoriesAddButton" },
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryList.addRepositoryButtonLabel", defaultMessage: "Register a repository" }))))),
        box: {
            incremental: true,
            schema: true,
        },
        filters: [
            {
                type: 'field_value_selection',
                field: 'type',
                name: 'Type',
                multiSelect: false,
                options: Object.keys(repositories.reduce((typeMap, repository) => {
                    typeMap[repository.type] = true;
                    return typeMap;
                }, {})).map(type => {
                    return {
                        value: type,
                        view: text_1.textService.getRepositoryTypeName(type),
                    };
                }),
            },
        ],
    };
    return (react_1.default.createElement(eui_1.EuiInMemoryTable, { items: repositories, itemId: "name", columns: columns, search: search, sorting: sorting, selection: selection, pagination: pagination, isSelectable: true, rowProps: () => ({
            'data-test-subj': 'srRepositoryListTableRow',
        }), cellProps: (item, column) => ({
            'data-test-subj': `srRepositoryListTableCell-${column.field}`,
        }) }));
};
exports.RepositoryTable = react_router_dom_1.withRouter(RepositoryTableUi);
