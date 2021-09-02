"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = tslib_1.__importDefault(require("react"));
const react_dom_1 = tslib_1.__importDefault(require("react-dom"));
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const Content = ({ feedbackLink, feedbackLinkText }) => (react_1.default.createElement(eui_1.EuiLink, { href: feedbackLink, target: "_blank", rel: "noopener" }, feedbackLinkText));
class HelpCenterContent extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.componentDidMount = () => {
            chrome_1.default.helpExtension.set(domElement => {
                react_dom_1.default.render(react_1.default.createElement(Content, Object.assign({}, this.props)), domElement);
                return () => {
                    react_dom_1.default.unmountComponentAtNode(domElement);
                };
            });
        };
        this.render = () => {
            return null;
        };
    }
}
exports.HelpCenterContent = HelpCenterContent;
