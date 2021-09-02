"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const React = tslib_1.__importStar(require("react"));
const and_or_badge_1 = require("../../and_or_badge");
const data_provider_1 = require("./data_provider");
const provider_item_badge_1 = require("./provider_item_badge");
class ProviderItemAnd extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.deleteAndProvider = (providerId, andProviderId) => {
            this.props.onDataProviderRemoved(providerId, andProviderId);
        };
        this.toggleEnabledAndProvider = (providerId, enabled, andProviderId) => {
            this.props.onToggleDataProviderEnabled({ providerId, enabled, andProviderId });
        };
        this.toggleExcludedAndProvider = (providerId, excluded, andProviderId) => {
            this.props.onToggleDataProviderExcluded({ providerId, excluded, andProviderId });
        };
    }
    render() {
        const { browserFields, dataProvidersAnd, onDataProviderEdited, providerId, timelineId, } = this.props;
        return dataProvidersAnd.map((providerAnd, index) => (React.createElement(React.Fragment, { key: `provider-item-and-${providerId}-${providerAnd.id}` },
            React.createElement(eui_1.EuiFlexItem, null,
                React.createElement(and_or_badge_1.AndOrBadge, { type: "and" })),
            React.createElement(eui_1.EuiFlexItem, null,
                React.createElement(provider_item_badge_1.ProviderItemBadge, { andProviderId: providerAnd.id, browserFields: browserFields, deleteProvider: () => this.deleteAndProvider(providerId, providerAnd.id), field: providerAnd.queryMatch.displayField || providerAnd.queryMatch.field, kqlQuery: providerAnd.kqlQuery, isEnabled: providerAnd.enabled, isExcluded: providerAnd.excluded, onDataProviderEdited: onDataProviderEdited, operator: providerAnd.queryMatch.operator || data_provider_1.IS_OPERATOR, providerId: providerId, timelineId: timelineId, toggleEnabledProvider: () => this.toggleEnabledAndProvider(providerId, !providerAnd.enabled, providerAnd.id), toggleExcludedProvider: () => this.toggleExcludedAndProvider(providerId, !providerAnd.excluded, providerAnd.id), val: providerAnd.queryMatch.displayValue || providerAnd.queryMatch.value })))));
    }
}
exports.ProviderItemAnd = ProviderItemAnd;
