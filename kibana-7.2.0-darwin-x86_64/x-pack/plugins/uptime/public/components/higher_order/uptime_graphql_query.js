"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const react_apollo_1 = require("react-apollo");
const format_error_list_1 = require("../../lib/helper/format_error_list");
const contexts_1 = require("../../contexts");
/**
 * This HOC abstracts the task of querying our GraphQL endpoint,
 * which eliminates the need for a lot of boilerplate code in the other components.
 *
 * @type T - the expected result's type
 * @type P - any props the wrapped component will require
 * @param WrappedComponent - the consuming component
 * @param query - the graphQL query
 */
function withUptimeGraphQL(WrappedComponent, query) {
    return react_apollo_1.withApollo((props) => {
        const { lastRefresh } = react_1.useContext(contexts_1.UptimeRefreshContext);
        const [loading, setLoading] = react_1.useState(true);
        const [data, setData] = react_1.useState(undefined);
        const [errors, setErrors] = react_1.useState(undefined);
        let updateState = (loadingVal, dataVal, errorsVal) => {
            setLoading(loadingVal);
            setData(dataVal);
            setErrors(errorsVal);
        };
        const { client, implementsCustomErrorState, variables } = props;
        const fetch = () => {
            setLoading(true);
            client.query({ fetchPolicy: 'network-only', query, variables }).then((result) => {
                updateState(result.loading, result.data, result.errors);
            });
        };
        react_1.useEffect(() => {
            fetch();
            /**
             * If the `then` handler in `fetch`'s promise is fired after
             * this component has unmounted, it will try to set state on an
             * unmounted component, which indicates a memory leak and will trigger
             * React warnings.
             *
             * We counteract this side effect by providing a cleanup function that will
             * reassign the update function to do nothing with the returned values.
             */
            return () => {
                updateState = () => { };
            };
        }, [variables, lastRefresh]);
        if (!implementsCustomErrorState && errors && errors.length > 0) {
            return react_1.default.createElement(react_1.Fragment, null, format_error_list_1.formatUptimeGraphQLErrorList(errors));
        }
        return react_1.default.createElement(WrappedComponent, Object.assign({}, props, { loading: loading, data: data, errors: errors }));
    });
}
exports.withUptimeGraphQL = withUptimeGraphQL;
