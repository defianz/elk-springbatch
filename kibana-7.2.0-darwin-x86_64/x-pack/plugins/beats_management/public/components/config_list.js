"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// @ts-ignore
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
const react_2 = tslib_1.__importDefault(require("react"));
const config_schemas_1 = require("../../common/config_schemas");
const config_schemas_translations_map_1 = require("../../common/config_schemas_translations_map");
const pagination = {
    pageSize: 5,
    hidePerPageOptions: true,
};
const ConfigListUi = props => (react_2.default.createElement(eui_1.EuiBasicTable, { items: props.configs.list || [], itemId: "id", pagination: {
        ...pagination,
        totalItemCount: props.configs.total,
        pageIndex: props.configs.page,
    }, onChange: (table = { page: { index: 0, size: 5 } }) => {
        if (props.onTableChange) {
            props.onTableChange(table.page.index, table.page.size);
        }
    }, columns: [
        {
            field: 'type',
            name: props.intl.formatMessage({
                id: 'xpack.beatsManagement.tagTable.typeColumnName',
                defaultMessage: 'Type',
            }),
            truncateText: false,
            render: (type, config) => {
                const translatedConfig = config_schemas_translations_map_1.translateConfigSchema(config_schemas_1.configBlockSchemas).find(sc => sc.id === type);
                return (react_2.default.createElement(eui_1.EuiLink, { onClick: () => props.onConfigClick('edit', config) }, translatedConfig ? translatedConfig.name : type));
            },
        },
        {
            field: 'module',
            name: props.intl.formatMessage({
                id: 'xpack.beatsManagement.tagTable.moduleColumnName',
                defaultMessage: 'Module',
            }),
            truncateText: false,
            render: (value, config) => {
                return (config.config._sub_type ||
                    props.intl.formatMessage({
                        id: 'xpack.beatsManagement.tagTable.moduleColumn.notAvailibaleLabel',
                        defaultMessage: 'N/A',
                    }));
            },
        },
        {
            field: 'description',
            name: props.intl.formatMessage({
                id: 'xpack.beatsManagement.tagTable.descriptionColumnName',
                defaultMessage: 'Description',
            }),
        },
        {
            name: props.intl.formatMessage({
                id: 'xpack.beatsManagement.tagTable.actionsColumnName',
                defaultMessage: 'Actions',
            }),
            actions: [
                {
                    name: props.intl.formatMessage({
                        id: 'xpack.beatsManagement.tagTable.actions.removeButtonAriaLabel',
                        defaultMessage: 'Remove',
                    }),
                    description: props.intl.formatMessage({
                        id: 'xpack.beatsManagement.tagTable.actions.removeTooltip',
                        defaultMessage: 'Remove this config from tag',
                    }),
                    type: 'icon',
                    icon: 'trash',
                    onClick: (item) => props.onConfigClick('delete', item),
                },
            ],
        },
    ] }));
exports.ConfigList = react_1.injectI18n(ConfigListUi);
