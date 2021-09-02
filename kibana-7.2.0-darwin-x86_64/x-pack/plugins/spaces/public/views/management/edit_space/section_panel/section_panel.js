"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = tslib_1.__importStar(require("react"));
class SectionPanel extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
        this.getTitle = () => {
            const showLinkText = this.props.intl.formatMessage({
                id: 'xpack.spaces.management.collapsiblePanel.showLinkText',
                defaultMessage: 'show',
            });
            const hideLinkText = this.props.intl.formatMessage({
                id: 'xpack.spaces.management.collapsiblePanel.hideLinkText',
                defaultMessage: 'hide',
            });
            const showLinkDescription = this.props.intl.formatMessage({
                id: 'xpack.spaces.management.collapsiblePanel.showLinkDescription',
                defaultMessage: 'show {title}',
            }, {
                title: this.props.description,
            });
            const hideLinkDescription = this.props.intl.formatMessage({
                id: 'xpack.spaces.management.collapsiblePanel.hideLinkDescription',
                defaultMessage: 'hide {title}',
            }, {
                title: this.props.description,
            });
            return (
            // @ts-ignore
            react_1.default.createElement(eui_1.EuiFlexGroup, { alignItems: 'baseline', gutterSize: "s", responsive: false },
                react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_1.default.createElement(eui_1.EuiTitle, { size: "m" },
                        react_1.default.createElement("h3", null,
                            this.props.iconType && (react_1.default.createElement(react_1.Fragment, null,
                                react_1.default.createElement(eui_1.EuiIcon, { type: this.props.iconType, size: 'xl', className: 'collapsiblePanel__logo' }),
                                ' ')),
                            this.props.title))),
                this.props.collapsible && (react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_1.default.createElement(eui_1.EuiLink, { "data-test-subj": "show-hide-section-link", onClick: this.toggleCollapsed, "aria-label": this.state.collapsed ? showLinkDescription : hideLinkDescription }, this.state.collapsed ? showLinkText : hideLinkText)))));
        };
        this.getForm = () => {
            if (this.state.collapsed) {
                return null;
            }
            return (react_1.default.createElement(react_1.Fragment, null,
                react_1.default.createElement(eui_1.EuiSpacer, null),
                this.props.children));
        };
        this.toggleCollapsed = () => {
            this.setState({
                collapsed: !this.state.collapsed,
            });
        };
        this.state = {
            collapsed: props.initiallyCollapsed || false,
        };
    }
    render() {
        return (react_1.default.createElement(eui_1.EuiPanel, null,
            this.getTitle(),
            this.getForm()));
    }
}
exports.SectionPanel = SectionPanel;
