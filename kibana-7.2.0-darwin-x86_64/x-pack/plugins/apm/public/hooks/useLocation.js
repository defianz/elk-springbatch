"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const LocationContext_1 = require("../context/LocationContext");
function useLocation() {
    return react_1.useContext(LocationContext_1.LocationContext);
}
exports.useLocation = useLocation;
