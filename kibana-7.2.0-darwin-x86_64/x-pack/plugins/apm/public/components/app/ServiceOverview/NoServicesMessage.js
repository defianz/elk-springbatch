"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const i18n_1 = require("@kbn/i18n");
const react_1 = tslib_1.__importDefault(require("react"));
const KibanaLink_1 = require("../../shared/Links/KibanaLink");
const SetupInstructionsLink_1 = require("../../shared/Links/SetupInstructionsLink");
function NoServicesMessage({ historicalDataFound }) {
    if (historicalDataFound) {
        return (react_1.default.createElement(eui_1.EuiEmptyPrompt, { title: react_1.default.createElement("div", null, i18n_1.i18n.translate('xpack.apm.servicesTable.notFoundLabel', {
                defaultMessage: 'No services found'
            })), titleSize: "s" }));
    }
    else {
        return (react_1.default.createElement(eui_1.EuiEmptyPrompt, { title: react_1.default.createElement("div", null, i18n_1.i18n.translate('xpack.apm.servicesTable.noServicesLabel', {
                defaultMessage: `Looks like you don't have any APM services installed. Let's add some!`
            })), titleSize: "s", body: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("p", null, i18n_1.i18n.translate('xpack.apm.servicesTable.7xUpgradeServerMessage', {
                    defaultMessage: `Upgrading from a pre-7.x version? Make sure you've also upgraded
              your APM server instance(s) to at least 7.0.`
                })),
                react_1.default.createElement("p", null,
                    i18n_1.i18n.translate('xpack.apm.servicesTable.7xOldDataMessage', {
                        defaultMessage: 'You may also have old data that needs to be migrated.'
                    }),
                    ' ',
                    react_1.default.createElement(KibanaLink_1.KibanaLink, { path: "/management/elasticsearch/upgrade_assistant" }, i18n_1.i18n.translate('xpack.apm.servicesTable.UpgradeAssistantLink', {
                        defaultMessage: 'Learn more by visiting the Kibana Upgrade Assistant'
                    })),
                    ".")), actions: react_1.default.createElement(SetupInstructionsLink_1.SetupInstructionsLink, { buttonFill: true }) }));
    }
}
exports.NoServicesMessage = NoServicesMessage;
