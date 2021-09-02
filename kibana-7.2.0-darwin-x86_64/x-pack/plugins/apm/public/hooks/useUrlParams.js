"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const UrlParamsContext_1 = require("../context/UrlParamsContext");
function useUrlParams() {
    return react_1.useContext(UrlParamsContext_1.UrlParamsContext);
}
exports.useUrlParams = useUrlParams;
