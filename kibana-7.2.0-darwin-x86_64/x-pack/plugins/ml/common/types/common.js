"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// converts a dictionary to an array. note this loses the dictionary `key` information.
// however it's able to retain the type information of the dictionary elements.
function dictionaryToArray(dict) {
    return Object.keys(dict).map(key => dict[key]);
}
exports.dictionaryToArray = dictionaryToArray;
