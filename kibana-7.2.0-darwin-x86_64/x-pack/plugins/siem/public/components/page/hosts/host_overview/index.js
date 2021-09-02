"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const fp_1 = require("lodash/fp");
const react_1 = tslib_1.__importDefault(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const empty_value_1 = require("../../../empty_value");
const i18n = tslib_1.__importStar(require("./translations"));
const first_last_seen_host_1 = require("../first_last_seen_host");
const field_renderers_1 = require("../../../field_renderers/field_renderers");
const loading_1 = require("../../../loading");
const index_1 = require("../../index");
const links_1 = require("../../../links");
const DescriptionList = styled_components_1.default(eui_1.EuiDescriptionList) `
  ${({ theme }) => `
    dt {
      font-size: ${theme.eui.euiFontSizeXS} !important;
    }
  `}
`;
const getDescriptionList = (descriptionList, key) => (react_1.default.createElement(eui_1.EuiFlexItem, { key: key },
    react_1.default.createElement(DescriptionList, { listItems: descriptionList })));
exports.HostOverview = recompose_1.pure(({ data, loading }) => {
    const getDefaultRenderer = (fieldName, fieldData) => (react_1.default.createElement(field_renderers_1.DefaultFieldRenderer, { rowItems: fp_1.getOr([], fieldName, fieldData), attrName: fieldName, idPrefix: "host-overview" }));
    const descriptionLists = [
        [
            {
                title: i18n.HOST_ID,
                description: data.host
                    ? field_renderers_1.hostIdRenderer({ host: data.host, noLink: true })
                    : empty_value_1.getEmptyTagValue(),
            },
            {
                title: i18n.FIRST_SEEN,
                description: data.host != null && data.host.name && data.host.name.length ? (react_1.default.createElement(first_last_seen_host_1.FirstLastSeenHost, { hostname: data.host.name[0], type: first_last_seen_host_1.FirstLastSeenHostType.FIRST_SEEN })) : (empty_value_1.getEmptyTagValue()),
            },
            {
                title: i18n.LAST_SEEN,
                description: data.host != null && data.host.name && data.host.name.length ? (react_1.default.createElement(first_last_seen_host_1.FirstLastSeenHost, { hostname: data.host.name[0], type: first_last_seen_host_1.FirstLastSeenHostType.LAST_SEEN })) : (empty_value_1.getEmptyTagValue()),
            },
        ],
        [
            {
                title: i18n.IP_ADDRESSES,
                description: (react_1.default.createElement(field_renderers_1.DefaultFieldRenderer, { rowItems: fp_1.getOr([], 'host.ip', data), attrName: 'host.ip', idPrefix: "host-overview", render: ip => (ip != null ? react_1.default.createElement(links_1.IPDetailsLink, { ip: ip }) : empty_value_1.getEmptyTagValue()) })),
            },
            {
                title: i18n.MAC_ADDRESSES,
                description: getDefaultRenderer('host.mac', data),
            },
            { title: i18n.PLATFORM, description: getDefaultRenderer('host.os.platform', data) },
        ],
        [
            { title: i18n.OS, description: getDefaultRenderer('host.os.name', data) },
            { title: i18n.FAMILY, description: getDefaultRenderer('host.os.family', data) },
            { title: i18n.VERSION, description: getDefaultRenderer('host.os.version', data) },
            { title: i18n.ARCHITECTURE, description: getDefaultRenderer('host.architecture', data) },
        ],
        [
            {
                title: i18n.CLOUD_PROVIDER,
                description: getDefaultRenderer('cloud.provider', data),
            },
            {
                title: i18n.REGION,
                description: getDefaultRenderer('cloud.region', data),
            },
            {
                title: i18n.INSTANCE_ID,
                description: getDefaultRenderer('cloud.instance.id', data),
            },
            {
                title: i18n.MACHINE_TYPE,
                description: getDefaultRenderer('cloud.machine.type', data),
            },
        ],
    ];
    return (react_1.default.createElement(index_1.OverviewWrapper, null,
        loading && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(index_1.LoadingOverlay, null),
            react_1.default.createElement(loading_1.LoadingPanel, { height: "100%", width: "100%", text: "", position: "absolute", zIndex: 3, "data-test-subj": "LoadingPanelLoadMoreTable" }))),
        descriptionLists.map((descriptionList, index) => getDescriptionList(descriptionList, index))));
});
