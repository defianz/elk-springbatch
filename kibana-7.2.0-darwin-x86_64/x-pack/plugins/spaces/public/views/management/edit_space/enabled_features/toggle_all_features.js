"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const eui_1 = require("@elastic/eui");
const i18n_1 = require("@kbn/i18n");
const react_1 = require("@kbn/i18n/react");
const react_2 = tslib_1.__importStar(require("react"));
const options = [
    {
        id: 'show',
        text: i18n_1.i18n.translate('xpack.spaces.management.showAllFeaturesText', {
            defaultMessage: 'Show all',
        }),
    },
    {
        id: 'hide',
        text: i18n_1.i18n.translate('xpack.spaces.management.hideAllFeaturesText', {
            defaultMessage: 'Hide all',
        }),
    },
];
class ToggleAllFeatures extends react_2.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isPopoverOpen: false,
        };
        this.onSelect = (selection) => {
            this.props.onChange(selection === 'show');
            this.setState({ isPopoverOpen: false });
        };
        this.onButtonClick = () => {
            this.setState({
                isPopoverOpen: !this.state.isPopoverOpen,
            });
        };
        this.closePopover = () => {
            this.setState({
                isPopoverOpen: false,
            });
        };
    }
    render() {
        const button = (react_2.default.createElement(eui_1.EuiLink, { onClick: this.onButtonClick, className: 'spcToggleAllFeatures__changeAllLink' },
            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.spaces.management.toggleAllFeaturesLink", defaultMessage: "(change all)" })));
        const items = options.map(item => {
            return (react_2.default.createElement(eui_1.EuiContextMenuItem, { "data-test-subj": `spc-toggle-all-features-${item.id}`, key: item.id, onClick: () => {
                    this.onSelect(item.id);
                }, disabled: this.props.disabled }, item.text));
        });
        return (react_2.default.createElement(eui_1.EuiPopover, { id: 'changeAllFeatureVisibilityPopover', button: button, isOpen: this.state.isPopoverOpen, closePopover: this.closePopover, panelPaddingSize: "none", anchorPosition: "downLeft" },
            react_2.default.createElement(eui_1.EuiContextMenuPanel, { items: items })));
    }
}
exports.ToggleAllFeatures = ToggleAllFeatures;
