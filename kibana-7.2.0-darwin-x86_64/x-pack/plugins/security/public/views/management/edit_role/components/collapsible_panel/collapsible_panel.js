"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
const react_2 = tslib_1.__importStar(require("react"));
class CollapsiblePanel extends react_2.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
        this.getTitle = () => {
            return (
            // @ts-ignore
            react_2.default.createElement(eui_1.EuiFlexGroup, { alignItems: 'baseline', gutterSize: "s", responsive: false },
                react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_2.default.createElement(eui_1.EuiTitle, null,
                        react_2.default.createElement("h2", null,
                            this.props.iconType && (react_2.default.createElement(react_2.Fragment, null,
                                react_2.default.createElement(eui_1.EuiIcon, { type: this.props.iconType, size: 'xl', className: 'collapsiblePanel__logo' }),
                                ' ')),
                            this.props.title))),
                react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_2.default.createElement(eui_1.EuiLink, { onClick: this.toggleCollapsed }, this.state.collapsed ? (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.collapsiblePanel.showLinkText", defaultMessage: "show" })) : (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.collapsiblePanel.hideLinkText", defaultMessage: "hide" }))))));
        };
        this.getForm = () => {
            if (this.state.collapsed) {
                return null;
            }
            return (react_2.default.createElement(react_2.Fragment, null,
                react_2.default.createElement(eui_1.EuiSpacer, null),
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
        return (react_2.default.createElement(eui_1.EuiPanel, null,
            this.getTitle(),
            this.getForm()));
    }
}
exports.CollapsiblePanel = CollapsiblePanel;
