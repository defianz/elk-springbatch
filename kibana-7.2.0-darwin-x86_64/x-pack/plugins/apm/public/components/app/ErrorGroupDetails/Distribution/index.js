"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const i18n_1 = require("@kbn/i18n");
const react_1 = tslib_1.__importDefault(require("react"));
// @ts-ignore
const Histogram_1 = tslib_1.__importDefault(require("../../../shared/charts/Histogram"));
const EmptyMessage_1 = require("../../../shared/EmptyMessage");
function getFormattedBuckets(buckets, bucketSize) {
    if (!buckets) {
        return null;
    }
    return buckets.map(({ count, key }) => {
        return {
            x0: key,
            x: key + bucketSize,
            y: count
        };
    });
}
exports.getFormattedBuckets = getFormattedBuckets;
function ErrorDistribution({ distribution, title }) {
    const buckets = getFormattedBuckets(distribution.buckets, distribution.bucketSize);
    const isEmpty = distribution.totalHits === 0;
    if (isEmpty) {
        return (react_1.default.createElement(EmptyMessage_1.EmptyMessage, { heading: i18n_1.i18n.translate('xpack.apm.errorGroupDetails.noErrorsLabel', {
                defaultMessage: 'No errors were found'
            }) }));
    }
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(eui_1.EuiTitle, { size: "xs" },
            react_1.default.createElement("span", null, title)),
        react_1.default.createElement(Histogram_1.default, { verticalLineHover: (bucket) => bucket.x, xType: "time", buckets: buckets, bucketSize: distribution.bucketSize, formatYShort: (value) => i18n_1.i18n.translate('xpack.apm.errorGroupDetails.occurrencesShortLabel', {
                defaultMessage: '{occCount} occ.',
                values: { occCount: value }
            }), formatYLong: (value) => i18n_1.i18n.translate('xpack.apm.errorGroupDetails.occurrencesLongLabel', {
                defaultMessage: '{occCount} occurrences',
                values: { occCount: value }
            }) })));
}
exports.ErrorDistribution = ErrorDistribution;
