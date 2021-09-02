"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const datemath_1 = tslib_1.__importDefault(require("@elastic/datemath"));
const lodash_1 = require("lodash");
const react_1 = require("react");
const types_1 = require("../../../server/routes/metrics_explorer/types");
const fetch_1 = require("../../utils/fetch");
const kuery_1 = require("../../utils/kuery");
function isSameOptions(current, next) {
    return lodash_1.isEqual(current, next);
}
function useMetricsExplorerData(options, source, derivedIndexPattern, timerange, afterKey, signal) {
    const [error, setError] = react_1.useState(null);
    const [loading, setLoading] = react_1.useState(true);
    const [data, setData] = react_1.useState(null);
    const [lastOptions, setLastOptions] = react_1.useState(null);
    const [lastTimerange, setLastTimerange] = react_1.useState(null);
    react_1.useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const from = datemath_1.default.parse(timerange.from);
                const to = datemath_1.default.parse(timerange.to, { roundUp: true });
                if (!from || !to) {
                    throw new Error('Unalble to parse timerange');
                }
                const response = await fetch_1.fetch.post('../api/infra/metrics_explorer', {
                    metrics: options.aggregation === types_1.MetricsExplorerAggregation.count
                        ? [{ aggregation: types_1.MetricsExplorerAggregation.count }]
                        : options.metrics.map(metric => ({
                            aggregation: metric.aggregation,
                            field: metric.field,
                        })),
                    groupBy: options.groupBy,
                    afterKey,
                    limit: options.limit,
                    indexPattern: source.metricAlias,
                    filterQuery: (options.filterQuery &&
                        kuery_1.convertKueryToElasticSearchQuery(options.filterQuery, derivedIndexPattern)) ||
                        void 0,
                    timerange: {
                        ...timerange,
                        field: source.fields.timestamp,
                        from: from.valueOf(),
                        to: to.valueOf(),
                    },
                });
                if (response.data) {
                    if (data &&
                        lastOptions &&
                        data.pageInfo.afterKey !== response.data.pageInfo.afterKey &&
                        isSameOptions(lastOptions, options) &&
                        lodash_1.isEqual(timerange, lastTimerange) &&
                        afterKey) {
                        const { series } = data;
                        setData({
                            ...response.data,
                            series: [...series, ...response.data.series],
                        });
                    }
                    else {
                        setData(response.data);
                    }
                    setLastOptions(options);
                    setLastTimerange(timerange);
                    setError(null);
                }
            }
            catch (e) {
                setError(e);
            }
            setLoading(false);
        })();
    }, [options, source, timerange, signal, afterKey]);
    return { error, loading, data };
}
exports.useMetricsExplorerData = useMetricsExplorerData;
