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
const url_helpers_1 = require("../../../shared/Links/url_helpers");
const history_1 = require("../../../../utils/history");
const TransactionMetadata_1 = require("../../../shared/MetadataTable/TransactionMetadata");
const WaterfallContainer_1 = require("./WaterfallContainer");
const timelineTab = {
    key: 'timeline',
    label: i18n_1.i18n.translate('xpack.apm.propertiesTable.tabs.timelineLabel', {
        defaultMessage: 'Timeline'
    })
};
const metadataTab = {
    key: 'metadata',
    label: i18n_1.i18n.translate('xpack.apm.propertiesTable.tabs.metadataLabel', {
        defaultMessage: 'Metadata'
    })
};
function TransactionTabs({ location, transaction, urlParams, waterfall }) {
    const tabs = [timelineTab, metadataTab];
    const currentTab = urlParams.detailTab === metadataTab.key ? metadataTab : timelineTab;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(eui_1.EuiTabs, null, tabs.map(({ key, label }) => {
            return (react_1.default.createElement(eui_1.EuiTab, { onClick: () => {
                    history_1.history.replace({
                        ...location,
                        search: url_helpers_1.fromQuery({
                            ...url_helpers_1.toQuery(location.search),
                            detailTab: key
                        })
                    });
                }, isSelected: currentTab.key === key, key: key }, label));
        })),
        react_1.default.createElement(eui_1.EuiSpacer, null),
        currentTab.key === timelineTab.key ? (react_1.default.createElement(WaterfallContainer_1.WaterfallContainer, { transaction: transaction, location: location, urlParams: urlParams, waterfall: waterfall })) : (react_1.default.createElement(TransactionMetadata_1.TransactionMetadata, { transaction: transaction }))));
}
exports.TransactionTabs = TransactionTabs;
