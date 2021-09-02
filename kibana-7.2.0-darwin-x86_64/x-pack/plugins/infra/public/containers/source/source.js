"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const constate_latest_1 = tslib_1.__importDefault(require("constate-latest"));
const react_1 = require("react");
const apollo_context_1 = require("../../utils/apollo_context");
const use_tracked_promise_1 = require("../../utils/use_tracked_promise");
const create_source_gql_query_1 = require("./create_source.gql_query");
const query_source_gql_query_1 = require("./query_source.gql_query");
const update_source_gql_query_1 = require("./update_source.gql_query");
exports.useSource = ({ sourceId }) => {
    const apolloClient = apollo_context_1.useApolloClient();
    const [source, setSource] = react_1.useState(undefined);
    const [loadSourceRequest, loadSource] = use_tracked_promise_1.useTrackedPromise({
        cancelPreviousOn: 'resolution',
        createPromise: async () => {
            if (!apolloClient) {
                throw new DependencyError('Failed to load source: No apollo client available.');
            }
            return await apolloClient.query({
                fetchPolicy: 'no-cache',
                query: query_source_gql_query_1.sourceQuery,
                variables: {
                    sourceId,
                },
            });
        },
        onResolve: response => {
            setSource(response.data.source);
        },
    }, [apolloClient, sourceId]);
    const [createSourceConfigurationRequest, createSourceConfiguration] = use_tracked_promise_1.useTrackedPromise({
        createPromise: async (sourceProperties) => {
            if (!apolloClient) {
                throw new DependencyError('Failed to create source configuration: No apollo client available.');
            }
            return await apolloClient.mutate({
                mutation: create_source_gql_query_1.createSourceMutation,
                fetchPolicy: 'no-cache',
                variables: {
                    sourceId,
                    sourceProperties,
                },
            });
        },
        onResolve: response => {
            if (response.data) {
                setSource(response.data.createSource.source);
            }
        },
    }, [apolloClient, sourceId]);
    const [updateSourceConfigurationRequest, updateSourceConfiguration] = use_tracked_promise_1.useTrackedPromise({
        createPromise: async (sourceProperties) => {
            if (!apolloClient) {
                throw new DependencyError('Failed to update source configuration: No apollo client available.');
            }
            return await apolloClient.mutate({
                mutation: update_source_gql_query_1.updateSourceMutation,
                fetchPolicy: 'no-cache',
                variables: {
                    sourceId,
                    sourceProperties,
                },
            });
        },
        onResolve: response => {
            if (response.data) {
                setSource(response.data.updateSource.source);
            }
        },
    }, [apolloClient, sourceId]);
    const derivedIndexPattern = react_1.useMemo(() => ({
        fields: source ? source.status.indexFields : [],
        title: source ? `${source.configuration.logAlias}` : 'unknown-index',
    }), [source]);
    const isLoading = react_1.useMemo(() => [
        loadSourceRequest.state,
        createSourceConfigurationRequest.state,
        updateSourceConfigurationRequest.state,
    ].some(state => state === 'pending'), [
        loadSourceRequest.state,
        createSourceConfigurationRequest.state,
        updateSourceConfigurationRequest.state,
    ]);
    const sourceExists = react_1.useMemo(() => (source ? !!source.version : undefined), [source]);
    const logIndicesExist = react_1.useMemo(() => source && source.status && source.status.logIndicesExist, [
        source,
    ]);
    const metricIndicesExist = react_1.useMemo(() => source && source.status && source.status.metricIndicesExist, [source]);
    react_1.useEffect(() => {
        loadSource();
    }, [loadSource, sourceId]);
    return {
        createSourceConfiguration,
        derivedIndexPattern,
        logIndicesExist,
        isLoading,
        isLoadingSource: loadSourceRequest.state === 'pending',
        hasFailedLoadingSource: loadSourceRequest.state === 'rejected',
        loadSource,
        loadSourceFailureMessage: loadSourceRequest.state === 'rejected' ? `${loadSourceRequest.value}` : undefined,
        metricIndicesExist,
        source,
        sourceExists,
        sourceId,
        updateSourceConfiguration,
        version: source && source.version ? source.version : undefined,
    };
};
exports.Source = constate_latest_1.default(exports.useSource);
class DependencyError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
