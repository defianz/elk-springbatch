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
const react_router_dom_1 = require("react-router-dom");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const history_1 = require("../utils/history");
const LocationContext_1 = require("../context/LocationContext");
const UrlParamsContext_1 = require("../context/UrlParamsContext");
const variables_1 = require("../style/variables");
const LoadingIndicatorContext_1 = require("../context/LoadingIndicatorContext");
const LicenseContext_1 = require("../context/LicenseContext");
const UpdateBreadcrumbs_1 = require("../components/app/Main/UpdateBreadcrumbs");
const routeConfig_1 = require("../components/app/Main/routeConfig");
const ScrollToTopOnPathChange_1 = require("../components/app/Main/ScrollToTopOnPathChange");
const useUpdateBadgeEffect_1 = require("../components/app/Main/useUpdateBadgeEffect");
exports.REACT_APP_ROOT_ID = 'react-apm-root';
const MainContainer = styled_components_1.default.div `
  min-width: ${variables_1.px(variables_1.unit * 50)};
  padding: ${variables_1.px(variables_1.units.plus)};
  min-height: calc(100vh - ${variables_1.topNavHeight});
`;
function App() {
    useUpdateBadgeEffect_1.useUpdateBadgeEffect();
    return (react_1.default.createElement(UrlParamsContext_1.UrlParamsProvider, null,
        react_1.default.createElement(LoadingIndicatorContext_1.LoadingIndicatorProvider, null,
            react_1.default.createElement(MainContainer, { "data-test-subj": "apmMainContainer" },
                react_1.default.createElement(UpdateBreadcrumbs_1.UpdateBreadcrumbs, null),
                react_1.default.createElement(react_router_dom_1.Route, { component: ScrollToTopOnPathChange_1.ScrollToTopOnPathChange }),
                react_1.default.createElement(LicenseContext_1.LicenseProvider, null,
                    react_1.default.createElement(react_router_dom_1.Switch, null, routeConfig_1.routes.map((route, i) => (react_1.default.createElement(react_router_dom_1.Route, Object.assign({ key: i }, route))))))))));
}
class Plugin {
    setup(core) {
        const { i18n } = core;
        react_dom_1.default.render(react_1.default.createElement(i18n.Context, null,
            react_1.default.createElement(react_router_dom_1.Router, { history: history_1.history },
                react_1.default.createElement(LocationContext_1.LocationProvider, null,
                    react_1.default.createElement(App, null)))), document.getElementById(exports.REACT_APP_ROOT_ID));
    }
}
exports.Plugin = Plugin;
