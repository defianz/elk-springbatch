"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const react_2 = tslib_1.__importStar(require("react"));
class ChangeAllPrivilegesControl extends react_2.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isPopoverOpen: false,
        };
        this.onSelectPrivilege = (privilege) => {
            this.props.onChange(privilege);
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
        const button = (react_2.default.createElement(eui_1.EuiLink, { onClick: this.onButtonClick, className: 'secPrivilegeFeatureChangeAllLink' },
            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.changeAllPrivilegesLink", defaultMessage: "(change all)" })));
        const items = this.props.privileges.map(privilege => {
            return (react_2.default.createElement(eui_1.EuiContextMenuItem, { key: privilege, onClick: () => {
                    this.onSelectPrivilege(privilege);
                }, disabled: this.props.disabled }, lodash_1.default.capitalize(privilege)));
        });
        return (react_2.default.createElement(eui_1.EuiPopover, { id: 'changeAllFeaturePrivilegesPopover', button: button, isOpen: this.state.isPopoverOpen, closePopover: this.closePopover, panelPaddingSize: "none", anchorPosition: "downLeft" },
            react_2.default.createElement(eui_1.EuiContextMenuPanel, { items: items })));
    }
}
exports.ChangeAllPrivilegesControl = ChangeAllPrivilegesControl;
