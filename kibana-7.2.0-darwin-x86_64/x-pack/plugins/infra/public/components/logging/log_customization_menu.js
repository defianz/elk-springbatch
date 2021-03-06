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
const React = tslib_1.__importStar(require("react"));
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../common/eui_styled_components"));
class LogCustomizationMenu extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isShown: false,
        };
        this.show = () => {
            this.setState({
                isShown: true,
            });
        };
        this.hide = () => {
            this.setState({
                isShown: false,
            });
        };
        this.toggleVisibility = () => {
            this.setState(state => ({
                isShown: !state.isShown,
            }));
        };
    }
    render() {
        const { children } = this.props;
        const { isShown } = this.state;
        const menuButton = (React.createElement(eui_1.EuiButtonEmpty, { color: "text", iconType: "eye", onClick: this.toggleVisibility, size: "xs" },
            React.createElement(react_1.FormattedMessage, { id: "xpack.infra.logs.customizeLogs.customizeButtonLabel", defaultMessage: "Customize" })));
        return (React.createElement(eui_1.EuiPopover, { id: "customizePopover", button: menuButton, closePopover: this.hide, isOpen: isShown, anchorPosition: "downRight", ownFocus: true },
            React.createElement(CustomizationMenuContent, null, children)));
    }
}
exports.LogCustomizationMenu = LogCustomizationMenu;
const CustomizationMenuContent = eui_styled_components_1.default.div `
  min-width: 200px;
`;
