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
const ApmHeader_1 = require("../../shared/ApmHeader");
const HistoryTabs_1 = require("../../shared/HistoryTabs");
const SetupInstructionsLink_1 = require("../../shared/Links/SetupInstructionsLink");
const ServiceOverview_1 = require("../ServiceOverview");
const TraceOverview_1 = require("../TraceOverview");
const homeTabs = [
    {
        path: '/services',
        name: i18n_1.i18n.translate('xpack.apm.home.servicesTabLabel', {
            defaultMessage: 'Services'
        }),
        render: () => react_1.default.createElement(ServiceOverview_1.ServiceOverview, null)
    },
    {
        path: '/traces',
        name: i18n_1.i18n.translate('xpack.apm.home.tracesTabLabel', {
            defaultMessage: 'Traces'
        }),
        render: () => react_1.default.createElement(TraceOverview_1.TraceOverview, null)
    }
];
function Home() {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(ApmHeader_1.ApmHeader, null,
            react_1.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center" },
                react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_1.default.createElement(eui_1.EuiTitle, { size: "l" },
                        react_1.default.createElement("h1", null, "APM"))),
                react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_1.default.createElement(SetupInstructionsLink_1.SetupInstructionsLink, null)))),
        react_1.default.createElement(HistoryTabs_1.HistoryTabs, { tabs: homeTabs })));
}
exports.Home = Home;
