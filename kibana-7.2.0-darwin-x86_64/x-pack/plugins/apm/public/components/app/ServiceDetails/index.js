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
const useFetcher_1 = require("../../../hooks/useFetcher");
const services_1 = require("../../../services/rest/apm/services");
const ApmHeader_1 = require("../../shared/ApmHeader");
const ServiceDetailTabs_1 = require("./ServiceDetailTabs");
const ServiceIntegrations_1 = require("./ServiceIntegrations");
const agent_name_1 = require("../../../../common/agent_name");
const useUrlParams_1 = require("../../../hooks/useUrlParams");
function ServiceDetails() {
    const { urlParams, uiFilters } = useUrlParams_1.useUrlParams();
    const { serviceName, start, end } = urlParams;
    const { data: serviceDetailsData } = useFetcher_1.useFetcher(() => {
        if (serviceName && start && end) {
            return services_1.loadServiceDetails({ serviceName, start, end, uiFilters });
        }
    }, [serviceName, start, end, uiFilters]);
    if (!serviceDetailsData) {
        return null;
    }
    const isRumAgent = agent_name_1.isRumAgentName(serviceDetailsData.agentName);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(ApmHeader_1.ApmHeader, null,
            react_1.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center" },
                react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_1.default.createElement(eui_1.EuiTitle, { size: "l" },
                        react_1.default.createElement("h1", null, serviceName))),
                react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_1.default.createElement(ServiceIntegrations_1.ServiceIntegrations, { transactionTypes: serviceDetailsData.types, urlParams: urlParams })))),
        react_1.default.createElement(ServiceDetailTabs_1.ServiceDetailTabs, { urlParams: urlParams, transactionTypes: serviceDetailsData.types, isRumAgent: isRumAgent, agentName: serviceDetailsData.agentName })));
}
exports.ServiceDetails = ServiceDetails;
