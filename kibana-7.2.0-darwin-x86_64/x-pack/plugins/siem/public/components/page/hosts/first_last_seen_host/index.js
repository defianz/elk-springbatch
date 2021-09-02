"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const moment_1 = tslib_1.__importDefault(require("moment"));
const react_1 = tslib_1.__importDefault(require("react"));
const react_apollo_1 = require("react-apollo");
const recompose_1 = require("recompose");
const first_last_seen_1 = require("../../../../containers/hosts/first_last_seen");
const empty_value_1 = require("../../../empty_value");
const formatted_date_1 = require("../../../formatted_date");
const localized_date_tooltip_1 = require("../../../localized_date_tooltip");
var FirstLastSeenHostType;
(function (FirstLastSeenHostType) {
    FirstLastSeenHostType["FIRST_SEEN"] = "first-seen";
    FirstLastSeenHostType["LAST_SEEN"] = "last-seen";
})(FirstLastSeenHostType = exports.FirstLastSeenHostType || (exports.FirstLastSeenHostType = {}));
exports.FirstLastSeenHost = recompose_1.pure(({ hostname, type }) => {
    return (react_1.default.createElement(react_apollo_1.ApolloConsumer, null, client => {
        const { loading, firstSeen, lastSeen, errorMessage } = first_last_seen_1.useFirstLastSeenHostQuery(hostname, 'default', client);
        if (errorMessage != null) {
            return (react_1.default.createElement(eui_1.EuiToolTip, { position: "top", content: errorMessage, "data-test-subj": "firstLastSeenErrorToolTip", "aria-label": `firstLastSeenError-${type}`, id: `firstLastSeenError-${hostname}-${type}` },
                react_1.default.createElement(eui_1.EuiIcon, { "aria-describedby": `firstLastSeenError-${hostname}-${type}`, type: "alert" })));
        }
        const valueSeen = type === FirstLastSeenHostType.FIRST_SEEN ? firstSeen : lastSeen;
        return (react_1.default.createElement(react_1.default.Fragment, null,
            loading && react_1.default.createElement(eui_1.EuiLoadingSpinner, { size: "m" }),
            !loading && valueSeen != null && new Date(valueSeen).toString() === 'Invalid Date'
                ? valueSeen
                : !loading &&
                    valueSeen != null && (react_1.default.createElement(eui_1.EuiText, { size: "s" },
                    react_1.default.createElement(localized_date_tooltip_1.LocalizedDateTooltip, { date: moment_1.default(new Date(valueSeen)).toDate() },
                        react_1.default.createElement(formatted_date_1.PreferenceFormattedDate, { value: new Date(valueSeen) })))),
            !loading && valueSeen == null && empty_value_1.getEmptyTagValue()));
    }));
});
