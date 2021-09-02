"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var _a;
"use strict";
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
const react_2 = tslib_1.__importDefault(require("react"));
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../common/eui_styled_components"));
exports.MetricsSideNav = react_1.injectI18n((_a = class extends react_2.default.PureComponent {
        constructor() {
            super(...arguments);
            this.state = {
                isOpenOnMobile: false,
            };
            this.toggleOpenOnMobile = () => {
                this.setState({
                    isOpenOnMobile: !this.state.isOpenOnMobile,
                });
            };
        }
        render() {
            let content;
            let mobileContent;
            if (!this.props.loading) {
                const entries = this.props.layouts.map(item => {
                    return {
                        name: item.label,
                        id: item.id,
                        items: item.sections.map(section => ({
                            id: section.id,
                            name: section.label,
                            onClick: this.props.handleClick(section),
                        })),
                    };
                });
                content = react_2.default.createElement(eui_1.EuiSideNav, { items: entries });
                mobileContent = (react_2.default.createElement(eui_1.EuiSideNav, { items: entries, mobileTitle: this.props.nodeName, toggleOpenOnMobile: this.toggleOpenOnMobile, isOpenOnMobile: this.state.isOpenOnMobile }));
            }
            return (react_2.default.createElement(eui_1.EuiPageSideBar, null,
                react_2.default.createElement(eui_1.EuiHideFor, { sizes: ['xs', 's'] },
                    react_2.default.createElement(SideNavContainer, null, content)),
                react_2.default.createElement(eui_1.EuiShowFor, { sizes: ['xs', 's'] }, mobileContent)));
        }
    },
    _a.displayName = 'MetricsSideNav',
    _a));
const SideNavContainer = eui_styled_components_1.default.div `
  position: fixed;
  z-index: 1;
  height: 88vh;
  padding-left: 16px;
  margin-left: -16px;
  overflow-y: auto;
  overflow-x: hidden;
`;
