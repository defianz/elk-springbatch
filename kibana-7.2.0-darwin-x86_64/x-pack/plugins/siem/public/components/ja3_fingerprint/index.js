"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const draggables_1 = require("../draggables");
const external_link_icon_1 = require("../external_link_icon");
const links_1 = require("../links");
const i18n = tslib_1.__importStar(require("./translations"));
exports.JA3_HASH_FIELD_NAME = 'tls.fingerprints.ja3.hash';
const Ja3FingerprintLabel = styled_components_1.default.span `
  margin-right: 5px;
`;
/**
 * Renders a ja3 fingerprint, which enables (some) clients and servers communicating
 * using TLS traffic to be identified, which is possible because SSL
 * negotiations happen in the clear
 */
exports.Ja3Fingerprint = recompose_1.pure(({ contextId, eventId, fieldName, value }) => (React.createElement(draggables_1.DraggableBadge, { contextId: contextId, "data-test-subj": "ja3-hash", eventId: eventId, field: fieldName, iconType: "snowflake", value: value },
    React.createElement(Ja3FingerprintLabel, { "data-test-subj": "ja3-fingerprint-label" }, i18n.JA3_FINGERPRINT_LABEL),
    React.createElement(links_1.Ja3FingerprintLink, { "data-test-subj": "ja3-hash-link", ja3Fingerprint: value || '' }),
    React.createElement(external_link_icon_1.ExternalLinkIcon, null))));
