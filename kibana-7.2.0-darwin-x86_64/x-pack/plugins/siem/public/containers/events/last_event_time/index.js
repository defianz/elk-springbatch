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
const last_event_time_gql_query_1 = require("./last_event_time.gql_query");
function useLastEventTimeQuery(indexKey, details, sourceId, apolloClient) {
    const [loading, updateLoading] = react_1.useState(false);
    const [lastSeen, updateLastSeen] = react_1.useState(null);
    const [errorMessage, updateErrorMessage] = react_1.useState(null);
    const [currentIndexKey, updateCurrentIndexKey] = react_1.useState(null);
    async function fetchLastEventTime() {
        updateLoading(true);
        return apolloClient
            .query({
            query: last_event_time_gql_query_1.LastEventTimeGqlQuery,
            fetchPolicy: 'cache-first',
            variables: {
                sourceId,
                indexKey,
                details,
                defaultIndex: chrome_1.default.getUiSettingsClient().get(constants_1.DEFAULT_INDEX_KEY),
            },
        })
            .then(result => {
            updateLoading(false);
            updateLastSeen(fp_1.get('data.source.LastEventTime.lastSeen', result));
            updateErrorMessage(null);
            updateCurrentIndexKey(currentIndexKey);
            return result;
        }, error => {
            updateLoading(false);
            updateErrorMessage(error.message);
            return error;
        });
    }
    react_1.useEffect(() => {
        try {
            fetchLastEventTime();
        }
        catch (err) {
            updateLastSeen(null);
            updateErrorMessage(err.toString());
        }
    }, [indexKey, details.hostName, details.ip]);
    return { lastSeen, loading, errorMessage };
}
exports.useLastEventTimeQuery = useLastEventTimeQuery;
