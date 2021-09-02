"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const apollo_link_error_1 = require("apollo-link-error");
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const store_1 = require("../../store");
const actions_1 = require("../../store/actions");
const i18n = tslib_1.__importStar(require("./translations"));
exports.errorLink = apollo_link_error_1.onError(({ graphQLErrors, networkError }) => {
    const store = store_1.getStore();
    if (graphQLErrors != null && store != null) {
        graphQLErrors.forEach(({ message }) => store.dispatch(actions_1.appActions.addError({ id: uuid_1.default.v4(), title: i18n.DATA_FETCH_FAILURE, message })));
    }
    if (networkError != null && store != null) {
        store.dispatch(actions_1.appActions.addError({
            id: uuid_1.default.v4(),
            title: i18n.NETWORK_FAILURE,
            message: networkError.message,
        }));
    }
});
