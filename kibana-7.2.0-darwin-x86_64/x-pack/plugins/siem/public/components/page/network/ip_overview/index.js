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
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const empty_value_1 = require("../../../empty_value");
const field_renderers_1 = require("../../../field_renderers/field_renderers");
const i18n = tslib_1.__importStar(require("./translations"));
const index_1 = require("../../index");
const loading_1 = require("../../../loading");
const DescriptionList = styled_components_1.default(eui_1.EuiDescriptionList) `
  ${({ theme }) => `
    dt {
      font-size: ${theme.eui.euiFontSizeXS} !important;
    }
  `}
`;
const getDescriptionList = (descriptionList, key) => {
    return (react_1.default.createElement(eui_1.EuiFlexItem, { key: key },
        react_1.default.createElement(DescriptionList, { listItems: descriptionList })));
};
exports.IpOverview = recompose_1.pure(({ ip, data, loading, flowTarget }) => {
    const typeData = data[flowTarget];
    const descriptionLists = [
        [
            {
                title: i18n.LOCATION,
                description: field_renderers_1.locationRenderer([`${flowTarget}.geo.city_name`, `${flowTarget}.geo.region_name`], data),
            },
            {
                title: i18n.AUTONOMOUS_SYSTEM,
                description: typeData
                    ? field_renderers_1.autonomousSystemRenderer(typeData.autonomousSystem, flowTarget)
                    : empty_value_1.getEmptyTagValue(),
            },
        ],
        [
            { title: i18n.FIRST_SEEN, description: field_renderers_1.dateRenderer('firstSeen', typeData) },
            { title: i18n.LAST_SEEN, description: field_renderers_1.dateRenderer('lastSeen', typeData) },
        ],
        [
            {
                title: i18n.HOST_ID,
                description: typeData
                    ? field_renderers_1.hostIdRenderer({ host: data.host, ipFilter: ip })
                    : empty_value_1.getEmptyTagValue(),
            },
            {
                title: i18n.HOST_NAME,
                description: typeData ? field_renderers_1.hostNameRenderer(data.host, ip) : empty_value_1.getEmptyTagValue(),
            },
        ],
        [
            { title: i18n.WHOIS, description: field_renderers_1.whoisRenderer(ip) },
            { title: i18n.REPUTATION, description: field_renderers_1.reputationRenderer(ip) },
        ],
    ];
    return (react_1.default.createElement(index_1.OverviewWrapper, null,
        loading && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(index_1.LoadingOverlay, null),
            react_1.default.createElement(loading_1.LoadingPanel, { height: "100%", width: "100%", text: "", position: "absolute", zIndex: 3, "data-test-subj": "LoadingPanelLoadMoreTable" }))),
        descriptionLists.map((descriptionList, index) => getDescriptionList(descriptionList, index))));
});
