"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const initialLocation = {};
const LocationContext = react_1.createContext(initialLocation);
exports.LocationContext = LocationContext;
const LocationProvider = react_router_dom_1.withRouter(({ location, children }) => {
    return react_1.default.createElement(LocationContext.Provider, { children: children, value: location });
});
exports.LocationProvider = LocationProvider;
