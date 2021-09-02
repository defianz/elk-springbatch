"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// @ts-ignore unconverted Elastic lib
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
// @ts-ignore unconverted local file
const constants_1 = require("../../common/lib/constants");
// @ts-ignore unconverted local file
const fetch_1 = require("../../common/lib/fetch");
const basePath = chrome_1.default.getBasePath();
const apiPath = `${basePath}${constants_1.API_ROUTE_CUSTOM_ELEMENT}`;
exports.create = (customElement) => fetch_1.fetch.post(apiPath, customElement);
exports.get = (customElementId) => fetch_1.fetch
    .get(`${apiPath}/${customElementId}`)
    .then(({ data: element }) => element);
exports.update = (id, element) => fetch_1.fetch.put(`${apiPath}/${id}`, element);
exports.remove = (id) => fetch_1.fetch.delete(`${apiPath}/${id}`);
exports.find = async (searchTerm) => {
    const validSearchTerm = typeof searchTerm === 'string' && searchTerm.length > 0;
    return fetch_1.fetch
        .get(`${apiPath}/find?name=${validSearchTerm ? searchTerm : ''}&perPage=10000`)
        .then(({ data: customElements }) => customElements);
};
