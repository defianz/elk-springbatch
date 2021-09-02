"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const external_link_icon_1 = require("../../../../external_link_icon");
const suricata_links_1 = require("./suricata_links");
const LinkEuiFlexItem = styled_components_1.default(eui_1.EuiFlexItem) `
  display: inline;
`;
exports.SuricataRefs = recompose_1.pure(({ signatureId }) => {
    const links = suricata_links_1.getLinksFromSignature(signatureId);
    return (React.createElement(eui_1.EuiFlexGroup, { gutterSize: "none", justifyContent: "center", wrap: true }, links.map(link => (React.createElement(LinkEuiFlexItem, { key: link, grow: false },
        React.createElement(eui_1.EuiLink, { href: link, color: "subdued", target: "_blank" }, link),
        React.createElement(external_link_icon_1.ExternalLinkIcon, null))))));
});
