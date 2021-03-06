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
const react_2 = tslib_1.__importDefault(require("react"));
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../common/eui_styled_components"));
const header_1 = require("../components/header");
const page_1 = require("../components/page");
const DetailPageContent = eui_styled_components_1.default(page_1.PageContent) `
  overflow: auto;
  background-color: ${props => props.theme.eui.euiColorLightestShade};
`;
exports.Error = ({ message }) => {
    return (react_2.default.createElement(page_1.ColumnarPage, null,
        react_2.default.createElement(header_1.Header, null),
        react_2.default.createElement(DetailPageContent, null,
            react_2.default.createElement(exports.ErrorPageBody, { message: message }))));
};
exports.ErrorPageBody = ({ message }) => {
    return (react_2.default.createElement(eui_1.EuiPage, { style: { flex: '1 0 auto' } },
        react_2.default.createElement(eui_1.EuiPageBody, null,
            react_2.default.createElement(eui_1.EuiPageHeader, null,
                react_2.default.createElement(eui_1.EuiPageHeaderSection, null,
                    react_2.default.createElement(eui_1.EuiTitle, { size: "m" },
                        react_2.default.createElement("h1", null,
                            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.errorPage.unexpectedErrorTitle", defaultMessage: "Oops!" }))))),
            react_2.default.createElement(eui_1.EuiPageContent, null,
                react_2.default.createElement(eui_1.EuiCallOut, { color: "danger", title: message, iconType: 'alert' },
                    react_2.default.createElement("p", null,
                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.errorPage.tryAgainDescription ", defaultMessage: "Please click the back button and try again." })))))));
};
