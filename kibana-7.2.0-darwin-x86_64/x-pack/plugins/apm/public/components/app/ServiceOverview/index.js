"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const eui_2 = require("@elastic/eui");
const i18n_1 = require("@kbn/i18n");
const react_1 = tslib_1.__importStar(require("react"));
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const notify_1 = require("ui/notify");
const url_1 = tslib_1.__importDefault(require("url"));
const useFetcher_1 = require("../../../hooks/useFetcher");
const services_1 = require("../../../services/rest/apm/services");
const NoServicesMessage_1 = require("./NoServicesMessage");
const ServiceList_1 = require("./ServiceList");
const useUrlParams_1 = require("../../../hooks/useUrlParams");
const initalData = {
    items: [],
    hasHistoricalData: true,
    hasLegacyData: false
};
let hasDisplayedToast = false;
function ServiceOverview() {
    const { urlParams: { start, end }, uiFilters } = useUrlParams_1.useUrlParams();
    const { data = initalData } = useFetcher_1.useFetcher(() => {
        if (start && end) {
            return services_1.loadServiceList({ start, end, uiFilters });
        }
    }, [start, end, uiFilters]);
    react_1.useEffect(() => {
        if (data.hasLegacyData && !hasDisplayedToast) {
            hasDisplayedToast = true;
            notify_1.toastNotifications.addWarning({
                title: i18n_1.i18n.translate('xpack.apm.serviceOverview.toastTitle', {
                    defaultMessage: 'Legacy data was detected within the selected time range'
                }),
                text: (react_1.default.createElement("p", null,
                    i18n_1.i18n.translate('xpack.apm.serviceOverview.toastText', {
                        defaultMessage: "You're running Elastic Stack 7.0+ and we've detected incompatible data from a previous 6.x version. If you want to view this data in APM, you should migrate it. See more in "
                    }),
                    react_1.default.createElement(eui_2.EuiLink, { href: url_1.default.format({
                            pathname: chrome_1.default.addBasePath('/app/kibana'),
                            hash: '/management/elasticsearch/upgrade_assistant'
                        }) }, i18n_1.i18n.translate('xpack.apm.serviceOverview.upgradeAssistantLink', {
                        defaultMessage: 'the upgrade assistant'
                    }))))
            });
        }
    }, [data.hasLegacyData]);
    return (react_1.default.createElement(eui_1.EuiPanel, null,
        react_1.default.createElement(ServiceList_1.ServiceList, { items: data.items, noItemsMessage: react_1.default.createElement(NoServicesMessage_1.NoServicesMessage, { historicalDataFound: data.hasHistoricalData }) })));
}
exports.ServiceOverview = ServiceOverview;
