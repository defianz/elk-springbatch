"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_dom_1 = tslib_1.__importDefault(require("react-dom"));
// @ts-ignore
const modules_1 = require("ui/modules");
const module = modules_1.uiModules.get('apps/ml', ['react']);
const i18n_1 = require("ui/i18n");
const timefilter_1 = require("ui/timefilter");
// @ts-ignore
const new_job_utils_1 = require("../../../jobs/new_job/utils/new_job_utils");
const common_1 = require("../../common");
const page_1 = require("./page");
module.directive('mlNewDataFrame', ($injector) => {
    return {
        scope: {},
        restrict: 'E',
        link: (scope, element) => {
            const indexPatterns = $injector.get('indexPatterns');
            const kbnBaseUrl = $injector.get('kbnBaseUrl');
            const kibanaConfig = $injector.get('config');
            const Private = $injector.get('Private');
            timefilter_1.timefilter.disableTimeRangeSelector();
            timefilter_1.timefilter.disableAutoRefreshSelector();
            const createSearchItems = Private(new_job_utils_1.SearchItemsProvider);
            const { indexPattern, savedSearch, combinedQuery } = createSearchItems();
            const kibanaContext = {
                combinedQuery,
                currentIndexPattern: indexPattern,
                currentSavedSearch: savedSearch,
                indexPatterns,
                kbnBaseUrl,
                kibanaConfig,
            };
            react_dom_1.default.render(react_1.default.createElement(i18n_1.I18nContext, null,
                react_1.default.createElement(common_1.KibanaContext.Provider, { value: kibanaContext }, react_1.default.createElement(page_1.Page))), element[0]);
            element.on('$destroy', () => {
                react_dom_1.default.unmountComponentAtNode(element[0]);
                scope.$destroy();
            });
        },
    };
});
