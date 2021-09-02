"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_2 = require("@kbn/i18n/react");
const i18n_1 = require("@kbn/i18n");
const eui_1 = require("@elastic/eui");
exports.Page = ({ goToKibana, retry }) => (react_1.default.createElement(eui_1.EuiPage, null,
    react_1.default.createElement(eui_1.EuiPageBody, null,
        react_1.default.createElement(eui_1.EuiPageContentHeader, null,
            react_1.default.createElement(eui_1.EuiPageContentHeaderSection, null,
                react_1.default.createElement(eui_1.EuiTitle, null,
                    react_1.default.createElement("h1", null,
                        react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.ml.dataframe.accessDeniedTitle", defaultMessage: "Access denied" }))))),
        react_1.default.createElement(eui_1.EuiPageContentBody, null,
            react_1.default.createElement(eui_1.EuiSpacer, { size: "m" }),
            react_1.default.createElement(eui_1.EuiCallOut, { title: i18n_1.i18n.translate('xpack.ml.dataframe.noPermissionToAccessMLLabel', {
                    defaultMessage: 'You need permission to access Data Frames',
                }), color: "danger", iconType: "cross" },
                react_1.default.createElement(eui_1.EuiText, { size: "s" },
                    react_1.default.createElement("p", null,
                        react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.ml.dataframe.noGrantedPrivilegesDescription", defaultMessage: "You must have the privileges granted in the {kibanaUserParam} and {dataFrameUserParam} roles.{br}Your system admin can set these roles on the Management User page.", values: {
                                kibanaUserParam: react_1.default.createElement("span", { className: "text-monospace" }, "kibana_user"),
                                dataFrameUserParam: (react_1.default.createElement("span", { className: "text-monospace" }, "data_frame_transforms_user")),
                                br: react_1.default.createElement("br", null),
                            } })))),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "m" }),
            react_1.default.createElement(eui_1.EuiFlexGroup, { gutterSize: "s", alignItems: "center" },
                react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_1.default.createElement(eui_1.EuiButton, { fill: true, onClick: goToKibana, size: "s" },
                        react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.ml.dataframe.accessDenied.backToKibanaHomeButtonLabel", defaultMessage: "Back to Kibana home" }))),
                react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_1.default.createElement(eui_1.EuiButton, { fill: true, onClick: retry, size: "s" },
                        react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.ml.dataframe.accessDenied.retryButtonLabel", defaultMessage: "Retry" }))))))));
