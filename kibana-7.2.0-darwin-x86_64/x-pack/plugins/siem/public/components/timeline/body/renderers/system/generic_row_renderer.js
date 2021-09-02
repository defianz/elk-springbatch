"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fp_1 = require("lodash/fp");
const react_1 = tslib_1.__importDefault(require("react"));
const i18n = tslib_1.__importStar(require("./translations"));
const row_renderer_1 = require("../row_renderer");
const helpers_1 = require("../helpers");
const generic_details_1 = require("./generic_details");
const generic_file_details_1 = require("./generic_file_details");
exports.createGenericSystemRowRenderer = ({ actionName, text, }) => ({
    isInstance: ecs => {
        const module = fp_1.get('event.module[0]', ecs);
        const action = fp_1.get('event.action[0]', ecs);
        return (module != null &&
            module.toLowerCase() === 'system' &&
            action != null &&
            action.toLowerCase() === actionName);
    },
    renderRow: ({ browserFields, data, width, children }) => (react_1.default.createElement(helpers_1.Row, null,
        children,
        react_1.default.createElement(row_renderer_1.RowRendererContainer, { width: width },
            react_1.default.createElement(generic_details_1.SystemGenericDetails, { browserFields: browserFields, data: data, contextId: actionName, text: text })))),
});
exports.createGenericFileRowRenderer = ({ actionName, text, }) => ({
    isInstance: ecs => {
        const module = fp_1.get('event.module[0]', ecs);
        const action = fp_1.get('event.action[0]', ecs);
        return (module != null &&
            module.toLowerCase() === 'system' &&
            action != null &&
            action.toLowerCase() === actionName);
    },
    renderRow: ({ browserFields, data, width, children }) => (react_1.default.createElement(helpers_1.Row, null,
        children,
        react_1.default.createElement(row_renderer_1.RowRendererContainer, { width: width },
            react_1.default.createElement(generic_file_details_1.SystemGenericFileDetails, { browserFields: browserFields, data: data, contextId: actionName, text: text })))),
});
const systemLoginRowRenderer = exports.createGenericSystemRowRenderer({
    actionName: 'user_login',
    text: i18n.ATTEMPTED_LOGIN,
});
const systemProcessStartedRowRenderer = exports.createGenericFileRowRenderer({
    actionName: 'process_started',
    text: i18n.PROCESS_STARTED,
});
const systemProcessStoppedRowRenderer = exports.createGenericFileRowRenderer({
    actionName: 'process_stopped',
    text: i18n.PROCESS_STOPPED,
});
const systemExistingRowRenderer = exports.createGenericFileRowRenderer({
    actionName: 'existing_process',
    text: i18n.EXISTING_PROCESS,
});
const systemSocketOpenedRowRenderer = exports.createGenericFileRowRenderer({
    actionName: 'socket_opened',
    text: i18n.SOCKET_OPENED,
});
const systemSocketClosedRowRenderer = exports.createGenericFileRowRenderer({
    actionName: 'socket_closed',
    text: i18n.SOCKET_CLOSED,
});
const systemExistingUserRowRenderer = exports.createGenericSystemRowRenderer({
    actionName: 'existing_user',
    text: i18n.EXISTING_USER,
});
const systemExistingSocketRowRenderer = exports.createGenericFileRowRenderer({
    actionName: 'existing_socket',
    text: i18n.EXISTING_SOCKET,
});
const systemExistingPackageRowRenderer = exports.createGenericSystemRowRenderer({
    actionName: 'existing_package',
    text: i18n.EXISTING_PACKAGE,
});
const systemInvalidRowRenderer = exports.createGenericFileRowRenderer({
    actionName: 'invalid',
    text: i18n.INVALID,
});
const systemUserChangedRowRenderer = exports.createGenericSystemRowRenderer({
    actionName: 'user_changed',
    text: i18n.USER_CHANGED,
});
const systemHostChangedRowRenderer = exports.createGenericSystemRowRenderer({
    actionName: 'host',
    text: i18n.HOST_CHANGED,
});
const systemUserAddedRowRenderer = exports.createGenericSystemRowRenderer({
    actionName: 'user_added',
    text: i18n.USER_ADDED,
});
const systemLogoutRowRenderer = exports.createGenericSystemRowRenderer({
    actionName: 'user_logout',
    text: i18n.LOGGED_OUT,
});
const systemProcessErrorRowRenderer = exports.createGenericFileRowRenderer({
    actionName: 'process_error',
    text: i18n.PROCESS_ERROR,
});
// TODO: Remove this once this has been replaced everywhere with "error" below
const systemErrorRowRendererDeprecated = exports.createGenericSystemRowRenderer({
    actionName: 'error:',
    text: i18n.ERROR,
});
const systemErrorRowRenderer = exports.createGenericSystemRowRenderer({
    actionName: 'error',
    text: i18n.ERROR,
});
const systemPackageInstalledRowRenderer = exports.createGenericSystemRowRenderer({
    actionName: 'package_installed',
    text: i18n.PACKAGE_INSTALLED,
});
const systemBootRowRenderer = exports.createGenericSystemRowRenderer({
    actionName: 'boot',
    text: i18n.BOOT,
});
const systemAcceptedRowRenderer = exports.createGenericSystemRowRenderer({
    actionName: 'accepted',
    text: i18n.ACCEPTED,
});
const systemPackageUpdatedRowRenderer = exports.createGenericSystemRowRenderer({
    actionName: 'package_updated',
    text: i18n.PACKAGE_UPDATED,
});
const systemPackageRemovedRowRenderer = exports.createGenericSystemRowRenderer({
    actionName: 'package_removed',
    text: i18n.PACKAGE_REMOVED,
});
const systemUserRemovedRowRenderer = exports.createGenericSystemRowRenderer({
    actionName: 'user_removed',
    text: i18n.USER_REMOVED,
});
exports.systemRowRenderers = [
    systemAcceptedRowRenderer,
    systemBootRowRenderer,
    systemErrorRowRenderer,
    systemErrorRowRendererDeprecated,
    systemExistingPackageRowRenderer,
    systemExistingRowRenderer,
    systemExistingSocketRowRenderer,
    systemExistingUserRowRenderer,
    systemHostChangedRowRenderer,
    systemInvalidRowRenderer,
    systemLoginRowRenderer,
    systemLogoutRowRenderer,
    systemPackageInstalledRowRenderer,
    systemPackageUpdatedRowRenderer,
    systemPackageRemovedRowRenderer,
    systemProcessErrorRowRenderer,
    systemProcessStartedRowRenderer,
    systemProcessStoppedRowRenderer,
    systemSocketClosedRowRenderer,
    systemSocketOpenedRowRenderer,
    systemUserAddedRowRenderer,
    systemUserChangedRowRenderer,
    systemUserRemovedRowRenderer,
];
