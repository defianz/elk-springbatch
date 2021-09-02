"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_theme_light_json_1 = tslib_1.__importDefault(require("@elastic/eui/dist/eui_theme_light.json"));
const react_1 = require("react");
/**
 * These are default values for the context. These defaults are typically
 * overwritten by the Uptime App upon its invocation.
 */
const defaultContext = {
    autorefreshIsPaused: true,
    autorefreshInterval: 10000,
    basePath: '',
    colors: {
        success: eui_theme_light_json_1.default.euiColorSuccess,
        range: eui_theme_light_json_1.default.euiFocusBackgroundColor,
        mean: eui_theme_light_json_1.default.euiColorPrimary,
        danger: eui_theme_light_json_1.default.euiColorDanger,
    },
    dateRangeStart: 'now-15m',
    dateRangeEnd: 'now',
    isApmAvailable: true,
    isInfraAvailable: true,
    isLogsAvailable: true,
    refreshApp: () => {
        throw new Error('App refresh was not initialized, set it when you invoke the context');
    },
    setHeadingText: () => {
        throw new Error('setHeadingText was not initialized on UMSettingsContext.');
    },
};
exports.UptimeSettingsContext = react_1.createContext(defaultContext);
