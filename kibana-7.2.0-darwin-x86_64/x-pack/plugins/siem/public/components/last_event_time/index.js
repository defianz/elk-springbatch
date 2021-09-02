"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
const react_2 = tslib_1.__importDefault(require("react"));
const react_apollo_1 = require("react-apollo");
const recompose_1 = require("recompose");
const last_event_time_1 = require("../../containers/events/last_event_time");
const empty_value_1 = require("../empty_value");
exports.LastEventTime = recompose_1.pure(({ hostName, indexKey, ip }) => {
    return (react_2.default.createElement(react_apollo_1.ApolloConsumer, null, client => {
        const { loading, lastSeen, errorMessage } = last_event_time_1.useLastEventTimeQuery(indexKey, { hostName, ip }, 'default', client);
        if (errorMessage != null) {
            return (react_2.default.createElement(eui_1.EuiToolTip, { position: "top", content: errorMessage, "data-test-subj": "last_event_time_error", "aria-label": "last_event_time_error", id: `last_event_time_error-${indexKey}` },
                react_2.default.createElement(eui_1.EuiIcon, { "aria-describedby": `last_event_time_error-${indexKey}`, type: "alert" })));
        }
        return (react_2.default.createElement(react_2.default.Fragment, null,
            loading && react_2.default.createElement(eui_1.EuiLoadingSpinner, { size: "m" }),
            !loading && lastSeen != null && new Date(lastSeen).toString() === 'Invalid Date'
                ? lastSeen
                : !loading &&
                    lastSeen != null && (react_2.default.createElement(eui_1.EuiToolTip, { "data-test-subj": "last_event_time", position: "bottom", content: lastSeen },
                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.siem.headerPage.pageSubtitle", defaultMessage: "Last Event: {beat}", values: {
                            beat: react_2.default.createElement(react_1.FormattedRelative, { value: new Date(lastSeen) }),
                        } }))),
            !loading && lastSeen == null && empty_value_1.getEmptyTagValue()));
    }));
});
