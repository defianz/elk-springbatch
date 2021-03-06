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
const page_1 = require("./page");
exports.ErrorPage = ({ detailedMessage, retry, shortMessage }) => (react_2.default.createElement(page_1.FlexPage, null,
    react_2.default.createElement(eui_1.EuiPageBody, null,
        react_2.default.createElement(MinimumPageContent, { horizontalPosition: "center", verticalPosition: "center", panelPaddingSize: "none" },
            react_2.default.createElement(eui_1.EuiPageContentBody, null,
                react_2.default.createElement(eui_1.EuiCallOut, { color: "danger", iconType: "cross", title: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.errorPage.errorOccurredTitle", defaultMessage: "An error occurred" }) },
                    react_2.default.createElement(eui_1.EuiFlexGroup, null,
                        react_2.default.createElement(eui_1.EuiFlexItem, null, shortMessage),
                        retry ? (react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                            react_2.default.createElement(eui_1.EuiButton, { onClick: retry, iconType: "refresh" },
                                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.errorPage.tryAgainButtonLabel", defaultMessage: "Try again" })))) : null),
                    detailedMessage ? react_2.default.createElement("div", null, detailedMessage) : null))))));
const MinimumPageContent = eui_styled_components_1.default(eui_1.EuiPageContent) `
  min-width: 50vh;
`;
