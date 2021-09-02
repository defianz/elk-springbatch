"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fp_1 = require("lodash/fp");
const react_1 = require("react");
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const constants_1 = require("../../../../common/constants");
const first_last_seen_gql_query_1 = require("./first_last_seen.gql_query");
function useFirstLastSeenDomainQuery(ip, domainName, flowTarget, sourceId, apolloClient) {
    const [loading, updateLoading] = react_1.useState(false);
    const [firstSeen, updateFirstSeen] = react_1.useState(null);
    const [lastSeen, updateLastSeen] = react_1.useState(null);
    const [errorMessage, updateErrorMessage] = react_1.useState(null);
    async function fetchDomainFirstLastSeen() {
        updateLoading(true);
        return apolloClient
            .query({
            query: first_last_seen_gql_query_1.DomainFirstLastSeenGqlQuery,
            fetchPolicy: 'cache-first',
            variables: {
                sourceId,
                ip,
                domainName,
                flowTarget,
                defaultIndex: chrome_1.default.getUiSettingsClient().get(constants_1.DEFAULT_INDEX_KEY),
            },
        })
            .then(result => {
            updateLoading(false);
            updateFirstSeen(fp_1.get('data.source.DomainFirstLastSeen.firstSeen', result));
            updateLastSeen(fp_1.get('data.source.DomainFirstLastSeen.lastSeen', result));
            updateErrorMessage(null);
            return result;
        }, error => {
            updateLoading(false);
            updateErrorMessage(error.message);
            return error;
        });
    }
    react_1.useEffect(() => {
        try {
            fetchDomainFirstLastSeen();
        }
        catch (err) {
            updateFirstSeen(null);
            updateLastSeen(null);
            updateErrorMessage(err.toString());
        }
    }, []);
    return { firstSeen, lastSeen, loading, errorMessage };
}
exports.useFirstLastSeenDomainQuery = useFirstLastSeenDomainQuery;
