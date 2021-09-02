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
const react_1 = tslib_1.__importStar(require("react"));
const react_2 = require("@kbn/i18n/react");
const recompose_1 = require("recompose");
const draggables_1 = require("../draggables");
const empty_value_1 = require("../empty_value");
const formatted_date_1 = require("../formatted_date");
const links_1 = require("../links");
const i18n = tslib_1.__importStar(require("../page/network/ip_overview/translations"));
const helpers_1 = require("../drag_and_drop/helpers");
const page_1 = require("../page");
exports.IpOverviewId = 'ip-overview';
exports.locationRenderer = (fieldNames, data) => fieldNames.length > 0 && fieldNames.every(fieldName => fp_1.getOr(null, fieldName, data)) ? (react_1.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center", gutterSize: "none", "data-test-subj": "location-field" }, fieldNames.map((fieldName, index) => {
    const locationValue = fp_1.getOr('', fieldName, data);
    return (react_1.default.createElement(react_1.Fragment, { key: `${exports.IpOverviewId}-${fieldName}` },
        index ? ',\u00A0' : '',
        react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
            react_1.default.createElement(draggables_1.DefaultDraggable, { id: `${exports.IpOverviewId}-${fieldName}`, field: fieldName, value: locationValue }))));
}))) : (empty_value_1.getEmptyTagValue());
exports.dateRenderer = (fieldName, data) => (react_1.default.createElement(formatted_date_1.FormattedDate, { value: fp_1.getOr(null, fieldName, data), fieldName: fieldName }));
exports.autonomousSystemRenderer = (as, flowTarget) => as && as.as_org && as.asn ? (react_1.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center", gutterSize: "none" },
    react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
        react_1.default.createElement(draggables_1.DefaultDraggable, { id: `${exports.IpOverviewId}-${flowTarget}.autonomous_system.as_org`, field: `${flowTarget}.autonomous_system.as_org`, value: as.as_org }),
        ' /',
        react_1.default.createElement(draggables_1.DefaultDraggable, { id: `${exports.IpOverviewId}-${flowTarget}.autonomous_system.asn`, field: `${flowTarget}.autonomous_system.asn`, value: as.asn })))) : (empty_value_1.getEmptyTagValue());
exports.hostIdRenderer = ({ host, ipFilter, noLink, }) => host.id && host.ip && (ipFilter == null || host.ip.includes(ipFilter)) ? (react_1.default.createElement(react_1.default.Fragment, null, host.name && host.name[0] != null ? (react_1.default.createElement(draggables_1.DefaultDraggable, { id: `${exports.IpOverviewId}-host-id`, field: "host.id", value: host.id[0] }, noLink ? (react_1.default.createElement(react_1.default.Fragment, null, host.id)) : (react_1.default.createElement(links_1.HostDetailsLink, { hostName: host.name[0] }, host.id)))) : (react_1.default.createElement(react_1.default.Fragment, null, host.id)))) : (empty_value_1.getEmptyTagValue());
exports.hostNameRenderer = (host, ipFilter) => host.name && host.name[0] && host.ip && (!(ipFilter != null) || host.ip.includes(ipFilter)) ? (react_1.default.createElement(draggables_1.DefaultDraggable, { id: `${exports.IpOverviewId}-host-name`, field: 'host.name', value: host.name[0] },
    react_1.default.createElement(links_1.HostDetailsLink, { hostName: host.name[0] }, host.name ? host.name : empty_value_1.getEmptyTagValue()))) : (empty_value_1.getEmptyTagValue());
exports.whoisRenderer = (ip) => react_1.default.createElement(links_1.WhoIsLink, { domain: ip }, i18n.VIEW_WHOIS);
exports.reputationRenderer = (ip) => (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(links_1.VirusTotalLink, { link: ip }, i18n.VIEW_VIRUS_TOTAL),
    ', ',
    react_1.default.createElement(links_1.ReputationLink, { domain: ip }, i18n.VIEW_TALOS_INTELLIGENCE)));
// TODO: This causes breaks between elements until the ticket below is fixed
// https://github.com/elastic/ingest-dev/issues/474
exports.DefaultFieldRenderer = recompose_1.pure(({ rowItems, attrName, idPrefix, render, displayCount = 1, maxOverflow = 5 }) => {
    if (rowItems != null && rowItems.length > 0) {
        const draggables = rowItems.slice(0, displayCount).map((rowItem, index) => {
            const id = helpers_1.escapeDataProviderId(`${idPrefix}-${attrName}-${rowItem}`);
            return (react_1.default.createElement(eui_1.EuiFlexItem, { key: id, grow: false },
                index !== 0 && (react_1.default.createElement(react_1.default.Fragment, null,
                    ',',
                    react_1.default.createElement(page_1.Spacer, null))),
                react_1.default.createElement(draggables_1.DefaultDraggable, { id: id, field: attrName, value: rowItem }, render ? render(rowItem) : rowItem)));
        });
        return draggables.length > 0 ? (react_1.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center", gutterSize: "none" },
            draggables,
            ' ',
            react_1.default.createElement(exports.DefaultFieldRendererOverflow, { rowItems: rowItems, idPrefix: idPrefix, render: render, overflowIndexStart: displayCount, maxOverflowItems: maxOverflow }))) : (empty_value_1.getEmptyTagValue());
    }
    else {
        return empty_value_1.getEmptyTagValue();
    }
});
exports.DefaultFieldRendererOverflow = recompose_1.pure(({ rowItems, idPrefix, render, overflowIndexStart = 5, maxOverflowItems = 5 }) => {
    const [isOpen, setIsOpen] = react_1.useState(false);
    return (react_1.default.createElement(react_1.default.Fragment, null, rowItems.length > overflowIndexStart && (react_1.default.createElement(eui_1.EuiPopover, { id: "popover", button: react_1.default.createElement(react_1.default.Fragment, null,
            ' ,',
            react_1.default.createElement(eui_1.EuiButtonEmpty, { size: "xs", onClick: () => setIsOpen(!isOpen) },
                `+${rowItems.length - overflowIndexStart} `,
                react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.siem.fieldRenderers.moreLabel", defaultMessage: "More" }))), isOpen: isOpen, closePopover: () => setIsOpen(!isOpen) },
        react_1.default.createElement(react_1.default.Fragment, null,
            rowItems
                .slice(overflowIndexStart, overflowIndexStart + maxOverflowItems)
                .map(rowItem => (react_1.default.createElement(eui_1.EuiText, { key: `${idPrefix}-${rowItem}` }, render ? render(rowItem) : rowItem))),
            rowItems.length > overflowIndexStart + maxOverflowItems && (react_1.default.createElement("b", null,
                react_1.default.createElement("br", null),
                react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.siem.fieldRenderers.moreOverflowLabel", defaultMessage: "More..." }))))))));
});
