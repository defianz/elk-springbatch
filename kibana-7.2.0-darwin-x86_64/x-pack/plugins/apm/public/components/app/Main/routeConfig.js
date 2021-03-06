"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const i18n_1 = require("@kbn/i18n");
const react_1 = tslib_1.__importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const url_helpers_1 = require("../../shared/Links/url_helpers");
const ErrorGroupDetails_1 = require("../ErrorGroupDetails");
const ServiceDetails_1 = require("../ServiceDetails");
const TransactionDetails_1 = require("../TransactionDetails");
const Home_1 = require("./Home");
const renderAsRedirectTo = (to) => {
    return ({ location }) => (react_1.default.createElement(react_router_dom_1.Redirect, { to: {
            ...location,
            pathname: to
        } }));
};
exports.routes = [
    {
        exact: true,
        path: '/',
        render: renderAsRedirectTo('/services'),
        breadcrumb: 'APM'
    },
    {
        exact: true,
        path: '/services',
        component: Home_1.Home,
        breadcrumb: i18n_1.i18n.translate('xpack.apm.breadcrumb.servicesTitle', {
            defaultMessage: 'Services'
        })
    },
    {
        exact: true,
        path: '/traces',
        component: Home_1.Home,
        breadcrumb: i18n_1.i18n.translate('xpack.apm.breadcrumb.tracesTitle', {
            defaultMessage: 'Traces'
        })
    },
    {
        exact: true,
        path: '/:serviceName',
        breadcrumb: ({ match }) => match.params.serviceName,
        render: (props) => renderAsRedirectTo(`/${props.match.params.serviceName}/transactions`)(props)
    },
    {
        exact: true,
        path: '/:serviceName/errors/:groupId',
        component: ErrorGroupDetails_1.ErrorGroupDetails,
        breadcrumb: ({ match }) => match.params.groupId
    },
    {
        exact: true,
        path: '/:serviceName/errors',
        component: ServiceDetails_1.ServiceDetails,
        breadcrumb: i18n_1.i18n.translate('xpack.apm.breadcrumb.errorsTitle', {
            defaultMessage: 'Errors'
        })
    },
    {
        exact: true,
        path: '/:serviceName/transactions',
        component: ServiceDetails_1.ServiceDetails,
        breadcrumb: i18n_1.i18n.translate('xpack.apm.breadcrumb.transactionsTitle', {
            defaultMessage: 'Transactions'
        })
    },
    // Have to split this out as its own route to prevent duplicate breadcrumbs from both matching
    // if we use :transactionType? as a single route here
    {
        exact: true,
        path: '/:serviceName/transactions/:transactionType',
        component: ServiceDetails_1.ServiceDetails,
        breadcrumb: null
    },
    {
        exact: true,
        path: '/:serviceName/metrics',
        component: ServiceDetails_1.ServiceDetails,
        breadcrumb: i18n_1.i18n.translate('xpack.apm.breadcrumb.metricsTitle', {
            defaultMessage: 'Metrics'
        })
    },
    {
        exact: true,
        path: '/:serviceName/transactions/:transactionType/:transactionName',
        component: TransactionDetails_1.TransactionDetails,
        breadcrumb: ({ match }) => url_helpers_1.legacyDecodeURIComponent(match.params.transactionName) || ''
    }
];
