"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const url_state_1 = require("../../utils/url_state");
exports.getTimeFromLocation = (location) => {
    const timeParam = url_state_1.getParamFromQueryString(url_state_1.getQueryStringFromLocation(location), 'time');
    return timeParam ? parseFloat(timeParam) : NaN;
};
exports.getFilterFromLocation = (location) => {
    const param = url_state_1.getParamFromQueryString(url_state_1.getQueryStringFromLocation(location), 'filter');
    return param ? param : '';
};
exports.getToFromLocation = (location) => {
    const timeParam = url_state_1.getParamFromQueryString(url_state_1.getQueryStringFromLocation(location), 'to');
    return timeParam ? parseFloat(timeParam) : NaN;
};
exports.getFromFromLocation = (location) => {
    const timeParam = url_state_1.getParamFromQueryString(url_state_1.getQueryStringFromLocation(location), 'from');
    return timeParam ? parseFloat(timeParam) : NaN;
};
