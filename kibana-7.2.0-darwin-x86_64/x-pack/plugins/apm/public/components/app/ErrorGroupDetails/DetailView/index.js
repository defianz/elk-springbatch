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
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const lodash_1 = require("lodash");
const elastic_idx_1 = require("@kbn/elastic-idx");
const variables_1 = require("../../../../style/variables");
const DiscoverErrorLink_1 = require("../../../shared/Links/DiscoverLinks/DiscoverErrorLink");
const url_helpers_1 = require("../../../shared/Links/url_helpers");
const history_1 = require("../../../../utils/history");
const ErrorMetadata_1 = require("../../../shared/MetadataTable/ErrorMetadata");
const Stacktrace_1 = require("../../../shared/Stacktrace");
const ErrorTabs_1 = require("./ErrorTabs");
const StickyErrorProperties_1 = require("./StickyErrorProperties");
const HeaderContainer = styled_components_1.default.div `
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${variables_1.px(variables_1.unit)};
`;
// TODO: Move query-string-based tabs into a re-usable component?
function getCurrentTab(tabs = [], currentTabKey) {
    const selectedTab = tabs.find(({ key }) => key === currentTabKey);
    return selectedTab ? selectedTab : lodash_1.first(tabs) || {};
}
function DetailView({ errorGroup, urlParams, location }) {
    const { transaction, error, occurrencesCount } = errorGroup;
    if (!error) {
        return null;
    }
    const tabs = ErrorTabs_1.getTabs(error);
    const currentTab = getCurrentTab(tabs, urlParams.detailTab);
    return (react_1.default.createElement(eui_1.EuiPanel, null,
        react_1.default.createElement(HeaderContainer, null,
            react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null, i18n_1.i18n.translate('xpack.apm.errorGroupDetails.errorOccurrenceTitle', {
                    defaultMessage: 'Error occurrence'
                }))),
            react_1.default.createElement(DiscoverErrorLink_1.DiscoverErrorLink, { error: error, kuery: urlParams.kuery },
                react_1.default.createElement(eui_1.EuiButtonEmpty, { iconType: "discoverApp" }, i18n_1.i18n.translate('xpack.apm.errorGroupDetails.viewOccurrencesInDiscoverButtonLabel', {
                    defaultMessage: 'View {occurrencesCount} occurrences in Discover',
                    values: { occurrencesCount }
                })))),
        react_1.default.createElement(StickyErrorProperties_1.StickyErrorProperties, { error: error, transaction: transaction }),
        react_1.default.createElement(eui_1.EuiSpacer, null),
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
        react_1.default.createElement(TabContent, { error: error, currentTab: currentTab })));
}
exports.DetailView = DetailView;
function TabContent({ error, currentTab }) {
    const codeLanguage = error.service.name;
    const excStackframes = elastic_idx_1.idx(error, _ => _.error.exception[0].stacktrace);
    const logStackframes = elastic_idx_1.idx(error, _ => _.error.exception[0].stacktrace);
    switch (currentTab.key) {
        case ErrorTabs_1.logStacktraceTab.key:
            return (react_1.default.createElement(Stacktrace_1.Stacktrace, { stackframes: logStackframes, codeLanguage: codeLanguage }));
        case ErrorTabs_1.exceptionStacktraceTab.key:
            return (react_1.default.createElement(Stacktrace_1.Stacktrace, { stackframes: excStackframes, codeLanguage: codeLanguage }));
        default:
            return react_1.default.createElement(ErrorMetadata_1.ErrorMetadata, { error: error });
    }
}
exports.TabContent = TabContent;
