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
const certificate_fingerprint_1 = require("../../certificate_fingerprint");
const ja3_fingerprint_1 = require("../../ja3_fingerprint");
/**
 * Renders rows of draggable badges containing ja3 and certificate fingerprints
 * (i.e. sha1 hashes)
 */
exports.Fingerprints = recompose_1.pure(({ contextId, eventId, tlsClientCertificateFingerprintSha1, tlsFingerprintsJa3Hash, tlsServerCertificateFingerprintSha1, }) => (React.createElement(eui_1.EuiFlexGroup, { alignItems: "center", "data-test-subj": "fingerprints-group", direction: "column", justifyContent: "center", gutterSize: "none" },
    tlsFingerprintsJa3Hash != null
        ? fp_1.uniq(tlsFingerprintsJa3Hash).map(ja3 => (React.createElement(eui_1.EuiFlexItem, { grow: false, key: ja3 },
            React.createElement(ja3_fingerprint_1.Ja3Fingerprint, { eventId: eventId, fieldName: ja3_fingerprint_1.JA3_HASH_FIELD_NAME, contextId: contextId, value: ja3 }))))
        : null,
    tlsClientCertificateFingerprintSha1 != null
        ? fp_1.uniq(tlsClientCertificateFingerprintSha1).map(clientCert => (React.createElement(eui_1.EuiFlexItem, { grow: false, key: clientCert },
            React.createElement(certificate_fingerprint_1.CertificateFingerprint, { eventId: eventId, certificateType: "client", contextId: contextId, fieldName: certificate_fingerprint_1.TLS_CLIENT_CERTIFICATE_FINGERPRINT_SHA1_FIELD_NAME, value: clientCert }))))
        : null,
    tlsServerCertificateFingerprintSha1 != null
        ? fp_1.uniq(tlsServerCertificateFingerprintSha1).map(serverCert => (React.createElement(eui_1.EuiFlexItem, { grow: false, key: serverCert },
            React.createElement(certificate_fingerprint_1.CertificateFingerprint, { eventId: eventId, certificateType: "server", contextId: contextId, fieldName: certificate_fingerprint_1.TLS_SERVER_CERTIFICATE_FINGERPRINT_SHA1_FIELD_NAME, value: serverCert }))))
        : null)));
