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
const d3_1 = tslib_1.__importDefault(require("d3"));
const react_1 = tslib_1.__importStar(require("react"));
const lodash_1 = require("lodash");
const formatters_1 = require("../../../../utils/formatters");
// @ts-ignore
const Histogram_1 = tslib_1.__importDefault(require("../../../shared/charts/Histogram"));
const EmptyMessage_1 = require("../../../shared/EmptyMessage");
const url_helpers_1 = require("../../../shared/Links/url_helpers");
const history_1 = require("../../../../utils/history");
function getFormattedBuckets(buckets, bucketSize) {
    if (!buckets) {
        return [];
    }
    return buckets.map(({ sample, count, key }) => {
        return {
            sample,
            x0: key,
            x: key + bucketSize,
            y: count,
            style: { cursor: count > 0 && sample ? 'pointer' : 'default' }
        };
    });
}
exports.getFormattedBuckets = getFormattedBuckets;
const getFormatYShort = (transactionType) => (t) => {
    return i18n_1.i18n.translate('xpack.apm.transactionDetails.transactionsDurationDistributionChart.unitShortLabel', {
        defaultMessage: '{transCount} {transType, select, request {req.} other {trans.}}',
        values: {
            transCount: t,
            transType: transactionType
        }
    });
};
const getFormatYLong = (transactionType) => (t) => {
    return transactionType === 'request'
        ? i18n_1.i18n.translate('xpack.apm.transactionDetails.transactionsDurationDistributionChart.requestTypeUnitLongLabel', {
            defaultMessage: '{transCount, plural, =0 {# request} one {# request} other {# requests}}',
            values: {
                transCount: t
            }
        })
        : i18n_1.i18n.translate('xpack.apm.transactionDetails.transactionsDurationDistributionChart.transactionTypeUnitLongLabel', {
            defaultMessage: '{transCount, plural, =0 {# transaction} one {# transaction} other {# transactions}}',
            values: {
                transCount: t
            }
        });
};
exports.TransactionDistribution = (props) => {
    const { distribution, urlParams: { transactionId, traceId, transactionType }, loading } = props;
    const formatYShort = react_1.useCallback(getFormatYShort(transactionType), [
        transactionType
    ]);
    const formatYLong = react_1.useCallback(getFormatYLong(transactionType), [
        transactionType
    ]);
    const redirectToDefaultSample = react_1.useCallback(() => {
        const defaultSample = distribution && distribution.defaultSample
            ? distribution.defaultSample
            : {};
        const parsedQueryParams = url_helpers_1.toQuery(history_1.history.location.search);
        history_1.history.replace({
            ...history_1.history.location,
            search: url_helpers_1.fromQuery({
                ...lodash_1.omit(parsedQueryParams, 'transactionId', 'traceId'),
                ...defaultSample
            })
        });
    }, [distribution, loading]);
    react_1.useEffect(() => {
        if (loading) {
            return;
        }
        const selectedSampleIsAvailable = distribution
            ? !!distribution.buckets.find(bucket => !!(bucket.sample &&
                bucket.sample.transactionId === transactionId &&
                bucket.sample.traceId === traceId))
            : false;
        if (!selectedSampleIsAvailable && !!distribution) {
            redirectToDefaultSample();
        }
    }, [distribution, transactionId, traceId, redirectToDefaultSample, loading]);
    if (!distribution || !distribution.totalHits || !traceId || !transactionId) {
        return (react_1.default.createElement(EmptyMessage_1.EmptyMessage, { heading: i18n_1.i18n.translate('xpack.apm.transactionDetails.notFoundLabel', {
                defaultMessage: 'No transactions were found.'
            }) }));
    }
    const buckets = getFormattedBuckets(distribution.buckets, distribution.bucketSize);
    const xMax = d3_1.default.max(buckets, d => d.x) || 0;
    const timeFormatter = formatters_1.getTimeFormatter(xMax);
    const unit = formatters_1.timeUnit(xMax);
    const bucketIndex = buckets.findIndex(bucket => bucket.sample != null &&
        bucket.sample.transactionId === transactionId &&
        bucket.sample.traceId === traceId);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(eui_1.EuiTitle, { size: "xs" },
            react_1.default.createElement("h5", null,
                i18n_1.i18n.translate('xpack.apm.transactionDetails.transactionsDurationDistributionChartTitle', {
                    defaultMessage: 'Transactions duration distribution'
                }),
                ' ',
                react_1.default.createElement(eui_1.EuiIconTip, { title: i18n_1.i18n.translate('xpack.apm.transactionDetails.transactionsDurationDistributionChartTooltip.samplingLabel', {
                        defaultMessage: 'Sampling'
                    }), content: i18n_1.i18n.translate('xpack.apm.transactionDetails.transactionsDurationDistributionChartTooltip.samplingDescription', {
                        defaultMessage: "Each bucket will show a sample transaction. If there's no sample available, it's most likely because of the sampling limit set in the agent configuration."
                    }), position: "top" }))),
        react_1.default.createElement(Histogram_1.default, { buckets: buckets, bucketSize: distribution.bucketSize, bucketIndex: bucketIndex, onClick: (bucket) => {
                if (bucket.sample && bucket.y > 0) {
                    history_1.history.push({
                        ...history_1.history.location,
                        search: url_helpers_1.fromQuery({
                            ...url_helpers_1.toQuery(history_1.history.location.search),
                            transactionId: bucket.sample.transactionId,
                            traceId: bucket.sample.traceId
                        })
                    });
                }
            }, formatX: timeFormatter, formatYShort: formatYShort, formatYLong: formatYLong, verticalLineHover: (bucket) => bucket.y > 0 && !bucket.sample, backgroundHover: (bucket) => bucket.y > 0 && bucket.sample, tooltipHeader: (bucket) => `${timeFormatter(bucket.x0, { withUnit: false })} - ${timeFormatter(bucket.x, { withUnit: false })} ${unit}`, tooltipFooter: (bucket) => !bucket.sample &&
                i18n_1.i18n.translate('xpack.apm.transactionDetails.transactionsDurationDistributionChart.noSampleTooltip', {
                    defaultMessage: 'No sample available for this bucket'
                }) })));
};
