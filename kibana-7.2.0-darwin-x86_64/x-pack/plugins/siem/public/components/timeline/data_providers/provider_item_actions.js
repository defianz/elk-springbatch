"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const eui_1 = require("@elastic/eui");
const react_1 = tslib_1.__importDefault(require("react"));
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const data_provider_1 = require("./data_provider");
const edit_data_provider_1 = require("../../edit_data_provider");
const i18n = tslib_1.__importStar(require("./translations"));
exports.EDIT_CLASS_NAME = 'edit-data-provider';
exports.EXCLUDE_CLASS_NAME = 'exclude-data-provider';
exports.ENABLE_CLASS_NAME = 'enable-data-provider';
exports.FILTER_FOR_FIELD_PRESENT_CLASS_NAME = 'filter-for-field-present-data-provider';
exports.DELETE_CLASS_NAME = 'delete-data-provider';
const MyEuiPopover = styled_components_1.default(eui_1.EuiPopover) `
  height: 100%;
  user-select: none;
`;
exports.getProviderActions = ({ andProviderId, browserFields, deleteItem, field, isEnabled, isExcluded, isLoading, operator, onDataProviderEdited, onFilterForFieldPresent, providerId, timelineId, toggleEnabled, toggleExcluded, value, }) => [
    {
        id: 0,
        items: [
            {
                className: exports.EDIT_CLASS_NAME,
                disabled: isLoading,
                icon: 'pencil',
                name: i18n.EDIT_MENU_ITEM,
                panel: 1,
            },
            {
                className: exports.EXCLUDE_CLASS_NAME,
                disabled: isLoading,
                icon: `${isExcluded ? 'plusInCircle' : 'minusInCircle'}`,
                name: isExcluded ? i18n.INCLUDE_DATA_PROVIDER : i18n.EXCLUDE_DATA_PROVIDER,
                onClick: toggleExcluded,
            },
            {
                className: exports.ENABLE_CLASS_NAME,
                disabled: isLoading,
                icon: `${isEnabled ? 'eyeClosed' : 'eye'}`,
                name: isEnabled ? i18n.TEMPORARILY_DISABLE_DATA_PROVIDER : i18n.RE_ENABLE_DATA_PROVIDER,
                onClick: toggleEnabled,
            },
            {
                className: exports.FILTER_FOR_FIELD_PRESENT_CLASS_NAME,
                disabled: isLoading,
                icon: 'logstashFilter',
                name: i18n.FILTER_FOR_FIELD_PRESENT,
                onClick: onFilterForFieldPresent,
            },
            {
                className: exports.DELETE_CLASS_NAME,
                disabled: isLoading,
                icon: 'trash',
                name: i18n.DELETE_DATA_PROVIDER,
                onClick: deleteItem,
            },
        ],
    },
    {
        content: browserFields != null && timelineId != null && onDataProviderEdited != null ? (react_1.default.createElement(edit_data_provider_1.StatefulEditDataProvider, { andProviderId: andProviderId, browserFields: browserFields, field: field, isExcluded: isExcluded, onDataProviderEdited: onDataProviderEdited, operator: operator, providerId: providerId, timelineId: timelineId, value: value })) : null,
        id: 1,
        title: i18n.EDIT_TITLE,
        width: 400,
    },
];
class ProviderItemActions extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.onDataProviderEdited = ({ andProviderId, excluded, field, id, operator, providerId, value, }) => {
            if (this.props.onDataProviderEdited != null) {
                this.props.onDataProviderEdited({
                    andProviderId,
                    excluded,
                    field,
                    id,
                    operator,
                    providerId,
                    value,
                });
            }
            this.props.closePopover();
        };
        this.onFilterForFieldPresent = () => {
            const { andProviderId, field, timelineId, providerId, value } = this.props;
            if (this.props.onDataProviderEdited != null) {
                this.props.onDataProviderEdited({
                    andProviderId,
                    excluded: false,
                    field,
                    id: `${timelineId}`,
                    operator: data_provider_1.EXISTS_OPERATOR,
                    providerId,
                    value,
                });
            }
            this.props.closePopover();
        };
    }
    render() {
        const { andProviderId, browserFields, button, closePopover, deleteProvider, field, isEnabled, isExcluded, isLoading, isOpen, operator, providerId, timelineId, toggleEnabledProvider, toggleExcludedProvider, value, } = this.props;
        const panelTree = exports.getProviderActions({
            andProviderId,
            browserFields,
            deleteItem: deleteProvider,
            field,
            isEnabled,
            isExcluded,
            isLoading,
            onDataProviderEdited: this.onDataProviderEdited,
            onFilterForFieldPresent: this.onFilterForFieldPresent,
            operator,
            providerId,
            timelineId,
            toggleEnabled: toggleEnabledProvider,
            toggleExcluded: toggleExcludedProvider,
            value,
        });
        return (react_1.default.createElement(MyEuiPopover, { id: `popoverFor_${providerId}-${field}-${value}`, isOpen: isOpen, closePopover: closePopover, button: button, anchorPosition: "downCenter", panelPaddingSize: "none" },
            react_1.default.createElement("div", { style: { userSelect: 'none' } },
                react_1.default.createElement(eui_1.EuiContextMenu, { initialPanelId: 0, panels: panelTree, "data-test-subj": "providerActions" }))));
    }
}
exports.ProviderItemActions = ProviderItemActions;
