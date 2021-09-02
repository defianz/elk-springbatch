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
const draggables_1 = require("../draggables");
const external_link_icon_1 = require("../external_link_icon");
const links_1 = require("../links");
const i18n = tslib_1.__importStar(require("./translations"));
exports.TLS_CLIENT_CERTIFICATE_FINGERPRINT_SHA1_FIELD_NAME = 'tls.client_certificate.fingerprint.sha1';
exports.TLS_SERVER_CERTIFICATE_FINGERPRINT_SHA1_FIELD_NAME = 'tls.server_certificate.fingerprint.sha1';
const FingerprintLabel = styled_components_1.default.span `
  margin-right: 5px;
`;
/**
 * Represents a field containing a certificate fingerprint (e.g. a sha1), with
 * a link to an external site, which in-turn compares the fingerprint against a
 * set of known fingerprints
 * Examples:
 * 'tls.client_certificate.fingerprint.sha1'
 * 'tls.server_certificate.fingerprint.sha1'
 */
exports.CertificateFingerprint = recompose_1.pure(({ eventId, certificateType, contextId, fieldName, value }) => {
    return (React.createElement(draggables_1.DraggableBadge, { contextId: contextId, "data-test-subj": `${certificateType}-certificate-fingerprint`, eventId: eventId, field: fieldName, iconType: "snowflake", tooltipContent: React.createElement(eui_1.EuiText, { size: "xs" },
            React.createElement("span", null, fieldName)), value: value },
        React.createElement(FingerprintLabel, { "data-test-subj": "fingerprint-label" }, certificateType === 'client' ? i18n.CLIENT_CERT : i18n.SERVER_CERT),
        React.createElement(links_1.CertificateFingerprintLink, { certificateFingerprint: value || '' }),
        React.createElement(external_link_icon_1.ExternalLinkIcon, null)));
});
