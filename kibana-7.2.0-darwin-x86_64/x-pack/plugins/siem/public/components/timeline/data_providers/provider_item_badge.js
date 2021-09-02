"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fp_1 = require("lodash/fp");
const react_1 = tslib_1.__importStar(require("react"));
const provider_badge_1 = require("./provider_badge");
const provider_item_actions_1 = require("./provider_item_actions");
const timeline_context_1 = require("../timeline_context");
class ProviderItemBadge extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            isPopoverOpen: false,
        };
        this.togglePopover = () => {
            this.setState(prevState => ({
                isPopoverOpen: !prevState.isPopoverOpen,
            }));
        };
        this.closePopover = () => {
            this.setState({
                isPopoverOpen: false,
            });
        };
        this.toggleEnabledProvider = () => {
            this.props.toggleEnabledProvider();
            this.closePopover();
        };
        this.toggleExcludedProvider = () => {
            this.props.toggleExcludedProvider();
            this.closePopover();
        };
    }
    render() {
        const { andProviderId, browserFields, deleteProvider, field, kqlQuery, isEnabled, isExcluded, onDataProviderEdited, operator, providerId, timelineId, val, } = this.props;
        return (react_1.default.createElement(timeline_context_1.TimelineContext.Consumer, null, ({ isLoading }) => (react_1.default.createElement(provider_item_actions_1.ProviderItemActions, { andProviderId: andProviderId, browserFields: browserFields, button: react_1.default.createElement(provider_badge_1.ProviderBadge, { deleteProvider: !isLoading ? deleteProvider : fp_1.noop, field: field, kqlQuery: kqlQuery, isEnabled: isEnabled, isExcluded: isExcluded, providerId: providerId, togglePopover: this.togglePopover, val: val, operator: operator }), closePopover: this.closePopover, deleteProvider: deleteProvider, field: field, kqlQuery: kqlQuery, isEnabled: isEnabled, isExcluded: isExcluded, isLoading: isLoading, isOpen: this.state.isPopoverOpen, onDataProviderEdited: onDataProviderEdited, operator: operator, providerId: providerId, timelineId: timelineId, toggleEnabledProvider: this.toggleEnabledProvider, toggleExcludedProvider: this.toggleExcludedProvider, value: val }))));
    }
}
exports.ProviderItemBadge = ProviderItemBadge;
