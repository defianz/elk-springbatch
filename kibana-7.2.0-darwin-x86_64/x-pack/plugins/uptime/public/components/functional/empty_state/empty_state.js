"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const format_error_list_1 = require("../../../lib/helper/format_error_list");
const higher_order_1 = require("../../higher_order");
const queries_1 = require("../../../queries");
const empty_index_1 = require("./empty_index");
const empty_state_error_1 = require("./empty_state_error");
const empty_state_loading_1 = require("./empty_state_loading");
exports.EmptyStateComponent = ({ basePath, children, data, errors }) => {
    if (errors) {
        return react_1.default.createElement(empty_state_error_1.EmptyStateError, { errorMessage: format_error_list_1.formatUptimeGraphQLErrorList(errors) });
    }
    if (data && data.getDocCount) {
        const { count } = data.getDocCount;
        /**
         * We choose to render the children any time the count > 0, even if
         * the component is loading. If we render the loading state for this component,
         * it will blow away the state of child components and trigger an ugly
         * jittery UX any time the components refresh. This way we'll keep the stale
         * state displayed during the fetching process.
         */
        if (count) {
            return react_1.default.createElement(react_1.Fragment, null, children);
        }
        if (count === 0) {
            return react_1.default.createElement(empty_index_1.EmptyIndex, { basePath: basePath });
        }
    }
    return react_1.default.createElement(empty_state_loading_1.EmptyStateLoading, null);
};
exports.EmptyState = higher_order_1.withUptimeGraphQL(exports.EmptyStateComponent, queries_1.docCountQuery);
