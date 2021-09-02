"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
// Note for translators and programmers
// Examples of these strings are all of the form
// Session {user.name}@{hostname} in {folder} was authorized to use {executable} with result {result.success/failure}
// E.x. Frank@server-1 in /root was authorized to use wget with result success
// However, the strings can be dropped depending on the circumstances of the variables. For example, with no data at all
// Example with just a user name and hostname
// Session 20 frank@server-1
// Example with user name, hostname, but no result
// Session 20 frank@server-1 started process curl
exports.SESSION = i18n_1.i18n.translate('xpack.siem.system.systemDescription', {
    defaultMessage: 'System',
});
exports.WITH_RESULT = i18n_1.i18n.translate('xpack.siem.system.withResultDescription', {
    defaultMessage: 'with result',
});
exports.WAS_AUTHORIZED_TO_USE = i18n_1.i18n.translate('xpack.siem.system.wasAuthorizedToUseDescription', {
    defaultMessage: 'was authorized to use',
});
exports.ATTEMPTED_LOGIN = i18n_1.i18n.translate('xpack.siem.system.attemptedLoginDescription', {
    defaultMessage: 'attempted a login via',
});
exports.LOGGED_OUT = i18n_1.i18n.translate('xpack.siem.system.loggedOutDescription', {
    defaultMessage: 'logged out via',
});
exports.USING = i18n_1.i18n.translate('xpack.siem.system.usingDescription', {
    defaultMessage: 'using',
});
exports.PROCESS_STARTED = i18n_1.i18n.translate('xpack.siem.system.processStartedDescription', {
    defaultMessage: 'started process',
});
exports.PROCESS_STOPPED = i18n_1.i18n.translate('xpack.siem.system.processStoppedDescription', {
    defaultMessage: 'stopped process',
});
exports.EXISTING_PROCESS = i18n_1.i18n.translate('xpack.siem.system.existingProcessDescription', {
    defaultMessage: 'is running process',
});
exports.SOCKET_OPENED = i18n_1.i18n.translate('xpack.siem.system.socketOpenedDescription', {
    defaultMessage: 'opened a socket with',
});
exports.SOCKET_CLOSED = i18n_1.i18n.translate('xpack.siem.system.socketClosedDescription', {
    defaultMessage: 'closed a socket with',
});
exports.EXISTING_USER = i18n_1.i18n.translate('xpack.siem.system.existingUserDescription', {
    defaultMessage: 'is an existing user',
});
exports.EXISTING_SOCKET = i18n_1.i18n.translate('xpack.siem.system.existingSocketDescription', {
    defaultMessage: 'is using an existing socket from',
});
exports.EXISTING_PACKAGE = i18n_1.i18n.translate('xpack.siem.system.existingPackageDescription', {
    defaultMessage: 'is using an existing package',
});
exports.INVALID = i18n_1.i18n.translate('xpack.siem.system.invalidDescription', {
    defaultMessage: 'attempted invalid usage of',
});
exports.USER_CHANGED = i18n_1.i18n.translate('xpack.siem.system.userChangedDescription', {
    defaultMessage: 'user has changed',
});
exports.HOST_CHANGED = i18n_1.i18n.translate('xpack.siem.system.hostDescription', {
    defaultMessage: 'host information',
});
exports.USER_ADDED = i18n_1.i18n.translate('xpack.siem.system.userAddedDescription', {
    defaultMessage: 'user was added',
});
exports.PROCESS_ERROR = i18n_1.i18n.translate('xpack.siem.system.processErrorDescription', {
    defaultMessage: 'encountered a process error with',
});
exports.ERROR = i18n_1.i18n.translate('xpack.siem.system.errorDescription', {
    defaultMessage: 'encountered an error with',
});
exports.PACKAGE_INSTALLED = i18n_1.i18n.translate('xpack.siem.system.packageInstalledDescription', {
    defaultMessage: 'installed package',
});
exports.BOOT = i18n_1.i18n.translate('xpack.siem.system.packageSystemStartedDescription', {
    defaultMessage: 'system started',
});
exports.ACCEPTED = i18n_1.i18n.translate('xpack.siem.system.acceptedDescription', {
    defaultMessage: 'accepted the user via',
});
exports.PACKAGE_UPDATED = i18n_1.i18n.translate('xpack.siem.system.packageUpdatedDescription', {
    defaultMessage: 'updated package',
});
exports.PACKAGE_REMOVED = i18n_1.i18n.translate('xpack.siem.system.packageRemovedDescription', {
    defaultMessage: 'removed package',
});
exports.USER_REMOVED = i18n_1.i18n.translate('xpack.siem.system.userRemovedDescription', {
    defaultMessage: 'was removed',
});
