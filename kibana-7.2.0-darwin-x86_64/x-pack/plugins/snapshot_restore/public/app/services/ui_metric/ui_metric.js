"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const constants_1 = require("../../constants");
class UiMetricService {
    constructor() {
        this.track = () => { };
        this.init = (track) => {
            this.track = track;
        };
        this.trackUiMetric = (actionType) => {
            return this.track(constants_1.UIM_APP_NAME, actionType);
        };
    }
}
exports.uiMetricService = new UiMetricService();
