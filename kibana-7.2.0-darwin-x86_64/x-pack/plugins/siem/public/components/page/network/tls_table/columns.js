"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const helpers_1 = require("../../../tables/helpers");
const localized_date_tooltip_1 = require("../../../localized_date_tooltip");
const formatted_date_1 = require("../../../formatted_date");
const i18n = tslib_1.__importStar(require("./translations"));
exports.getTlsColumns = (tableId) => [
    {
        field: 'node',
        name: i18n.ISSUER,
        truncateText: false,
        hideForMobile: false,
        sortable: false,
        render: ({ _id, issuerNames }) => helpers_1.getRowItemDraggables({
            rowItems: issuerNames,
            attrName: 'tls.server_certificate.issuer.common_name',
            idPrefix: `${tableId}-${_id}-table-issuerNames`,
        }),
    },
    {
        field: 'node',
        name: i18n.SUBJECT,
        truncateText: false,
        hideForMobile: false,
        sortable: false,
        render: ({ _id, alternativeNames, commonNames }) => alternativeNames != null && alternativeNames.length > 0
            ? helpers_1.getRowItemDraggables({
                rowItems: alternativeNames,
                attrName: 'tls.server_certificate.alternative_names',
                idPrefix: `${tableId}-${_id}-table-alternative-name`,
            })
            : helpers_1.getRowItemDraggables({
                rowItems: commonNames,
                attrName: 'tls.server_certificate.subject.common_name',
                idPrefix: `${tableId}-${_id}-table-common-name`,
            }),
    },
    {
        field: 'node._id',
        name: i18n.SHA1_FINGERPRINT,
        truncateText: false,
        hideForMobile: false,
        sortable: true,
        render: sha1 => helpers_1.getRowItemDraggable({
            rowItem: sha1,
            attrName: 'tls.server_certificate.fingerprint.sha1',
            idPrefix: `${tableId}-${sha1}-table-sha1`,
        }),
    },
    {
        field: 'node',
        name: i18n.JA3_FINGERPRINT,
        truncateText: false,
        hideForMobile: false,
        sortable: false,
        render: ({ _id, ja3 }) => helpers_1.getRowItemDraggables({
            rowItems: ja3,
            attrName: 'tls.fingerprints.ja3.hash',
            idPrefix: `${tableId}-${_id}-table-ja3`,
        }),
    },
    {
        field: 'node',
        name: i18n.VALID_UNTIL,
        truncateText: false,
        hideForMobile: false,
        sortable: false,
        render: ({ _id, notAfter }) => helpers_1.getRowItemDraggables({
            rowItems: notAfter,
            attrName: 'tls.server_certificate.not_after',
            idPrefix: `${tableId}-${_id}-table-notAfter`,
            render: validUntil => (react_1.default.createElement(localized_date_tooltip_1.LocalizedDateTooltip, { date: moment_1.default(new Date(validUntil)).toDate() },
                react_1.default.createElement(formatted_date_1.PreferenceFormattedDate, { value: new Date(validUntil) }))),
        }),
    },
];
