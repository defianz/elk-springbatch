"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = tslib_1.__importDefault(require("react"));
const react_redux_1 = require("react-redux");
const recompose_1 = require("recompose");
const store_1 = require("../../store");
const app_1 = require("../../store/app");
const ErrorToastComponent = recompose_1.pure(({ toastLifeTimeMs = 10000, errors = [], removeError }) => exports.globalListFromToasts(exports.errorsToToasts(errors), removeError, toastLifeTimeMs));
exports.globalListFromToasts = (toasts, removeError, toastLifeTimeMs) => toasts.length !== 0 ? (react_1.default.createElement(eui_1.EuiGlobalToastList, { toasts: toasts, dismissToast: ({ id }) => removeError({ id }), toastLifeTimeMs: toastLifeTimeMs })) : null;
exports.errorsToToasts = (errors) => errors.map(({ id, title, message }) => {
    const toast = {
        id,
        title,
        color: 'danger',
        iconType: 'alert',
        text: react_1.default.createElement("p", null, message),
    };
    return toast;
});
const makeMapStateToProps = () => {
    const getErrorSelector = store_1.appSelectors.errorsSelector();
    return (state) => getErrorSelector(state);
};
exports.ErrorToast = react_redux_1.connect(makeMapStateToProps, {
    removeError: app_1.appActions.removeError,
})(ErrorToastComponent);
