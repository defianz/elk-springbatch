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
const helpers_1 = require("../../lib/helpers");
// Internal Links
exports.HostDetailsLink = recompose_1.pure(({ children, hostName }) => (React.createElement(eui_1.EuiLink, { href: `#/link-to/hosts/${encodeURIComponent(hostName)}` }, children ? children : hostName)));
exports.IPDetailsLink = recompose_1.pure(({ children, ip }) => (React.createElement(eui_1.EuiLink, { href: `#/link-to/network/ip/${encodeURIComponent(helpers_1.encodeIpv6(ip))}` }, children ? children : ip)));
// External Links
exports.GoogleLink = recompose_1.pure(({ children, link }) => (React.createElement(eui_1.EuiLink, { href: `https://www.google.com/search?q=${encodeURIComponent(link)}`, target: "_blank" }, children ? children : link)));
exports.PortOrServiceNameLink = recompose_1.pure(({ children, portOrServiceName }) => (React.createElement(eui_1.EuiLink, { "data-test-subj": "port-or-service-name-link", href: `https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?search=${encodeURIComponent(String(portOrServiceName))}`, target: "_blank" }, children ? children : portOrServiceName)));
exports.Ja3FingerprintLink = recompose_1.pure(({ children, ja3Fingerprint }) => (React.createElement(eui_1.EuiLink, { "data-test-subj": "ja3-fingerprint-link", href: `https://sslbl.abuse.ch/ja3-fingerprints/${encodeURIComponent(ja3Fingerprint)}`, target: "_blank" }, children ? children : ja3Fingerprint)));
exports.CertificateFingerprintLink = recompose_1.pure(({ children, certificateFingerprint }) => (React.createElement(eui_1.EuiLink, { "data-test-subj": "certificate-fingerprint-link", href: `https://sslbl.abuse.ch/ssl-certificates/sha1/${encodeURIComponent(certificateFingerprint)}`, target: "_blank" }, children ? children : certificateFingerprint)));
exports.ReputationLink = recompose_1.pure(({ children, domain }) => (React.createElement(eui_1.EuiLink, { href: `https://www.talosintelligence.com/reputation_center/lookup?search=${encodeURIComponent(domain)}`, target: "_blank" }, children ? children : domain)));
exports.VirusTotalLink = recompose_1.pure(({ children, link }) => (React.createElement(eui_1.EuiLink, { href: `https://www.virustotal.com/#/search/${encodeURIComponent(link)}`, target: "_blank" }, children ? children : link)));
exports.WhoIsLink = recompose_1.pure(({ children, domain }) => (React.createElement(eui_1.EuiLink, { href: `https://www.iana.org/whois?q=${encodeURIComponent(domain)}`, target: "_blank" }, children ? children : domain)));
