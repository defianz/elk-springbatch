"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const data_provider_1 = require("../data_provider");
/**
 * A map of mock data provider name to a count of events for
 * that mock data provider
 */
const mockSourceNameToEventCount = {
    'Provider 1': 64,
    'Provider 2': 158,
    'Provider 3': 381,
    'Provider 4': 237,
    'Provider 5': 310,
    'Provider 6': 1052,
    'Provider 7': 533,
    'Provider 8': 429,
    'Provider 9': 706,
    'Provider 10': 863,
};
/** Returns a collection of mock data provider names */
exports.mockDataProviderNames = () => Object.keys(mockSourceNameToEventCount);
/** Returns a count of the events for a mock data provider */
exports.getEventCount = (dataProviderName) => mockSourceNameToEventCount[dataProviderName] || 0;
/**
 * A collection of mock data providers, that can both be rendered
 * in the browser, and also used as mocks in unit and functional tests.
 */
exports.mockDataProviders = Object.keys(mockSourceNameToEventCount).map(name => ({
    id: `id-${name}`,
    name,
    enabled: true,
    excluded: false,
    kqlQuery: '',
    queryMatch: {
        field: 'name',
        value: name,
        operator: data_provider_1.IS_OPERATOR,
    },
    and: [],
}));
