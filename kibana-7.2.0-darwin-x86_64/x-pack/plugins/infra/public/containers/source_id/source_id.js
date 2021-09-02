"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const runtimeTypes = tslib_1.__importStar(require("io-ts"));
const use_url_state_1 = require("../../utils/use_url_state");
const SOURCE_ID_URL_STATE_KEY = 'sourceId';
exports.useSourceId = () => {
    return use_url_state_1.useUrlState({
        defaultState: 'default',
        decodeUrlState: decodeSourceIdUrlState,
        encodeUrlState: encodeSourceIdUrlState,
        urlStateKey: SOURCE_ID_URL_STATE_KEY,
    });
};
exports.replaceSourceIdInQueryString = (sourceId) => use_url_state_1.replaceStateKeyInQueryString(SOURCE_ID_URL_STATE_KEY, sourceId);
const sourceIdRuntimeType = runtimeTypes.union([runtimeTypes.string, runtimeTypes.undefined]);
const encodeSourceIdUrlState = sourceIdRuntimeType.encode;
const decodeSourceIdUrlState = (value) => sourceIdRuntimeType.decode(value).getOrElse(undefined);
