"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const new_platform_1 = require("ui/new_platform");
const use_observable_1 = require("./use_observable");
/**
 * This hook behaves like a `useState` hook in that it provides a requested
 * setting value (with an optional default) from the Kibana UI settings (also
 * known as "advanced settings") and a setter to change that setting:
 *
 * ```
 * const [darkMode, setDarkMode] = useKibanaUiSetting('theme:darkMode');
 * ```
 *
 * This is not just a static consumption of the value, but will reactively
 * update when the underlying setting subscription of the `UiSettingsClient`
 * notifies of a change.
 *
 * Unlike the `useState`, it doesn't give type guarantees for the value,
 * because the underlying `UiSettingsClient` doesn't support that.
 */
exports.useKibanaUiSetting = (key, defaultValue) => {
    const uiSettingsClient = react_1.useMemo(() => new_platform_1.getNewPlatform().setup.core.uiSettings, [new_platform_1.getNewPlatform]);
    const uiSetting$ = react_1.useMemo(() => uiSettingsClient.get$(key, defaultValue), [uiSettingsClient]);
    const uiSetting = use_observable_1.useObservable(uiSetting$);
    const setUiSetting = react_1.useCallback((value) => uiSettingsClient.set(key, value), [
        uiSettingsClient,
    ]);
    return [uiSetting, setUiSetting];
};
