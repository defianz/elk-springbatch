"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
/**
 * This is a temporary provider and hook for use with hooks until react-apollo
 * has upgraded to the new-style `createContext` api.
 */
exports.ApolloClientContext = react_1.createContext(undefined);
exports.useApolloClient = () => {
    return react_1.useContext(exports.ApolloClientContext);
};
