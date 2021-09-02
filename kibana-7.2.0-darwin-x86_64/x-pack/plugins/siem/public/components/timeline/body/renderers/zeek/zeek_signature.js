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
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const draggable_wrapper_1 = require("../../../../drag_and_drop/draggable_wrapper");
const helpers_1 = require("../../../../drag_and_drop/helpers");
const external_link_icon_1 = require("../../../../external_link_icon");
const links_1 = require("../../../../links");
const provider_1 = require("../../../../timeline/data_providers/provider");
const data_provider_1 = require("../../../data_providers/data_provider");
const i18n = tslib_1.__importStar(require("./translations"));
const Badge = styled_components_1.default(eui_1.EuiBadge) `
  vertical-align: top;
`;
const TokensFlexItem = styled_components_1.default(eui_1.EuiFlexItem) `
  margin-left: 3px;
`;
const LinkFlexItem = styled_components_1.default(eui_1.EuiFlexItem) `
  margin-left: 6px;
`;
exports.defaultStringRenderer = (value) => value;
exports.moduleStringRenderer = (value) => {
    const split = value.split('.');
    if (split.length >= 2 && split[1] != null) {
        if (split[1] !== '') {
            return split[1];
        }
        else {
            return split[0];
        }
    }
    else {
        return value;
    }
};
exports.droppedStringRenderer = (value) => `Dropped:${value}`;
exports.md5StringRenderer = (value) => `md5: ${value.substr(0, 7)}...`;
exports.sha1StringRenderer = (value) => `sha1: ${value.substr(0, 7)}...`;
exports.DraggableZeekElement = recompose_1.pure(({ id, field, value, stringRenderer = exports.defaultStringRenderer }) => value != null ? (React.createElement(TokensFlexItem, { grow: false },
    React.createElement(draggable_wrapper_1.DraggableWrapper, { dataProvider: {
            and: [],
            enabled: true,
            id: helpers_1.escapeDataProviderId(`zeek-${id}-${field}-${value}`),
            name: value,
            excluded: false,
            kqlQuery: '',
            queryMatch: {
                field,
                value,
                operator: data_provider_1.IS_OPERATOR,
            },
        }, render: (dataProvider, _, snapshot) => snapshot.isDragging ? (React.createElement(draggable_wrapper_1.DragEffects, null,
            React.createElement(provider_1.Provider, { dataProvider: dataProvider }))) : (React.createElement(eui_1.EuiToolTip, { "data-test-subj": "badge-tooltip", content: field },
            React.createElement(Badge, { iconType: "tag", color: "hollow" }, stringRenderer(value)))) }))) : null);
exports.Link = recompose_1.pure(({ value, link }) => {
    if (value != null) {
        if (link != null) {
            return (React.createElement(LinkFlexItem, { grow: false },
                React.createElement("div", null,
                    React.createElement(links_1.GoogleLink, { link: link }, value),
                    React.createElement(external_link_icon_1.ExternalLinkIcon, null))));
        }
        else {
            return (React.createElement(LinkFlexItem, { grow: false },
                React.createElement("div", null,
                    React.createElement(links_1.GoogleLink, { link: value }),
                    React.createElement(external_link_icon_1.ExternalLinkIcon, null))));
        }
    }
    else {
        return null;
    }
});
exports.TotalVirusLinkSha = recompose_1.pure(({ value }) => value != null ? (React.createElement(LinkFlexItem, { grow: false },
    React.createElement("div", null,
        React.createElement(links_1.VirusTotalLink, { link: value }, value),
        React.createElement(external_link_icon_1.ExternalLinkIcon, null)))) : null);
// English Text for these codes are shortened from
// https://docs.zeek.org/en/stable/scripts/base/protocols/conn/main.bro.html
exports.zeekConnLogDictionay = {
    S0: i18n.S0,
    S1: i18n.S1,
    S2: i18n.S2,
    S3: i18n.S3,
    SF: i18n.SF,
    REJ: i18n.REJ,
    RSTO: i18n.RSTO,
    RSTR: i18n.RSTR,
    RSTOS0: i18n.RSTOS0,
    RSTRH: i18n.RSTRH,
    SH: i18n.SH,
    SHR: i18n.SHR,
    OTH: i18n.OTH,
};
exports.extractStateLink = (state) => {
    if (state != null) {
        const lookup = exports.zeekConnLogDictionay[state];
        if (lookup != null) {
            return `${state} ${lookup}`;
        }
        else {
            return state;
        }
    }
    else {
        return null;
    }
};
exports.extractStateValue = (state) => state != null && exports.zeekConnLogDictionay[state] != null ? exports.zeekConnLogDictionay[state] : null;
exports.constructDroppedValue = (dropped) => dropped != null ? String(dropped) : null;
exports.ZeekSignature = recompose_1.pure(({ data }) => {
    const id = data._id;
    const sessionId = fp_1.get('zeek.session_id[0]', data);
    const dataSet = fp_1.get('event.dataset[0]', data);
    const sslVersion = fp_1.get('zeek.ssl.version[0]', data);
    const cipher = fp_1.get('zeek.ssl.cipher[0]', data);
    const state = fp_1.get('zeek.connection.state[0]', data);
    const history = fp_1.get('zeek.connection.history[0]', data);
    const note = fp_1.get('zeek.notice.note[0]', data);
    const noteMsg = fp_1.get('zeek.notice.msg[0]', data);
    const dropped = exports.constructDroppedValue(fp_1.get('zeek.notice.dropped[0]', data));
    const dnsQuery = fp_1.get('zeek.dns.query[0]', data);
    const qClassName = fp_1.get('zeek.dns.qclass_name[0]', data);
    const httpMethod = fp_1.get('http.request.method[0]', data);
    const httpResponseStatusCode = fp_1.get('http.response.status_code[0]', data);
    const urlOriginal = fp_1.get('url.original[0]', data);
    const fileSha1 = fp_1.get('zeek.files.sha1[0]', data);
    const filemd5 = fp_1.get('zeek.files.md5[0]', data);
    const stateLink = exports.extractStateLink(state);
    const stateValue = exports.extractStateValue(state);
    return (React.createElement(React.Fragment, null,
        React.createElement(eui_1.EuiFlexGroup, { justifyContent: "center", gutterSize: "none", wrap: true },
            React.createElement(exports.DraggableZeekElement, { id: id, field: "zeek.session_id", value: sessionId }),
            React.createElement(exports.DraggableZeekElement, { id: id, field: "event.dataset", value: dataSet, stringRenderer: exports.moduleStringRenderer }),
            React.createElement(exports.DraggableZeekElement, { id: id, field: "zeek.files.sha1", value: fileSha1, stringRenderer: exports.sha1StringRenderer }),
            React.createElement(exports.DraggableZeekElement, { id: id, field: "zeek.files.md5", value: filemd5, stringRenderer: exports.md5StringRenderer }),
            React.createElement(exports.DraggableZeekElement, { id: id, field: "zeek.notice.dropped", value: dropped, stringRenderer: exports.droppedStringRenderer }),
            React.createElement(exports.DraggableZeekElement, { id: id, field: "zeek.ssl.version", value: sslVersion }),
            React.createElement(exports.DraggableZeekElement, { id: id, field: "zeek.ssl.cipher", value: cipher }),
            React.createElement(exports.DraggableZeekElement, { id: id, field: "zeek.connection.state", value: state }),
            React.createElement(exports.DraggableZeekElement, { id: id, field: "http.request.method", value: httpMethod }),
            React.createElement(exports.DraggableZeekElement, { id: id, field: "zeek.connection.history", value: history }),
            React.createElement(exports.DraggableZeekElement, { id: id, field: "zeek.notice.note", value: note }),
            React.createElement(exports.DraggableZeekElement, { id: id, field: "zeek.dns.query", value: dnsQuery }),
            React.createElement(exports.DraggableZeekElement, { id: id, field: "zeek.dns.qclass_name", value: qClassName }),
            React.createElement(exports.DraggableZeekElement, { id: id, field: "http.response.status_code", value: httpResponseStatusCode })),
        React.createElement(eui_1.EuiFlexGroup, { justifyContent: "center", gutterSize: "none" },
            React.createElement(exports.Link, { link: stateLink, value: stateValue }),
            React.createElement(exports.Link, { value: cipher }),
            React.createElement(exports.Link, { value: dnsQuery }),
            React.createElement(exports.Link, { value: noteMsg }),
            React.createElement(exports.Link, { value: urlOriginal }),
            React.createElement(exports.TotalVirusLinkSha, { value: fileSha1 }))));
});
