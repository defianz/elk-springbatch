"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const constate_latest_1 = tslib_1.__importDefault(require("constate-latest"));
const react_1 = require("react");
const validTabIds = ['indicesAndFieldsTab', 'logsTab'];
exports.useSourceConfigurationFlyoutState = ({ initialVisibility = false, initialTab = 'indicesAndFieldsTab', } = {}) => {
    const [isVisible, setIsVisible] = react_1.useState(initialVisibility);
    const [activeTabId, setActiveTab] = react_1.useState(initialTab);
    const toggleIsVisible = react_1.useCallback(() => setIsVisible(isCurrentlyVisible => !isCurrentlyVisible), [setIsVisible]);
    const show = react_1.useCallback((tabId) => {
        if (tabId != null) {
            setActiveTab(tabId);
        }
        setIsVisible(true);
    }, [setIsVisible]);
    const showIndicesConfiguration = react_1.useCallback(() => show('indicesAndFieldsTab'), [show]);
    const showLogsConfiguration = react_1.useCallback(() => show('logsTab'), [show]);
    const hide = react_1.useCallback(() => setIsVisible(false), [setIsVisible]);
    return {
        activeTabId,
        hide,
        isVisible,
        setActiveTab,
        show,
        showIndicesConfiguration,
        showLogsConfiguration,
        toggleIsVisible,
    };
};
exports.isValidTabId = (value) => validTabIds.includes(value);
exports.SourceConfigurationFlyoutState = constate_latest_1.default(exports.useSourceConfigurationFlyoutState);
