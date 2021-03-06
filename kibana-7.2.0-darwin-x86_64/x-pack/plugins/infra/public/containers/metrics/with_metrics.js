"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_apollo_1 = require("react-apollo");
const metrics_gql_query_1 = require("./metrics.gql_query");
exports.WithMetrics = ({ children, layouts, sourceId, timerange, nodeType, nodeId, }) => {
    const metrics = layouts.reduce((acc, item) => {
        return acc.concat(item.sections.map(s => s.id));
    }, []);
    return (react_1.default.createElement(react_apollo_1.Query, { query: metrics_gql_query_1.metricsQuery, fetchPolicy: "no-cache", notifyOnNetworkStatusChange: true, variables: {
            sourceId,
            metrics,
            nodeType,
            nodeId,
            timerange,
        } }, ({ data, error, loading, refetch }) => {
        return children({
            metrics: filterOnlyInfraMetricData(data && data.source && data.source.metrics),
            error,
            loading,
            refetch,
        });
    }));
};
const filterOnlyInfraMetricData = (metrics) => {
    if (!metrics) {
        return [];
    }
    return metrics.filter(m => m !== null).map(m => m);
};
