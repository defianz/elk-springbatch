"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const fp_1 = require("lodash/fp");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const draggables_1 = require("../../../../draggables");
const helpers_1 = require("../../../../tables/helpers");
const i18n = tslib_1.__importStar(require("./translations"));
const netflow_1 = require("../netflow");
const user_host_working_dir_1 = require("../user_host_working_dir");
const helpers_2 = require("../helpers");
const process_draggable_1 = require("../process_draggable");
const args_1 = require("../args");
const auth_ssh_1 = require("./auth_ssh");
const package_1 = require("./package");
const page_1 = require("../../../../page");
exports.SystemGenericFileLine = recompose_1.pure(({ args, contextId, hostName, id, message, outcome, packageName, packageSummary, packageVersion, processExecutable, processName, processPid, processTitle, sshSignature, sshMethod, text, userName, workingDirectory, }) => (React.createElement(React.Fragment, null,
    React.createElement(eui_1.EuiFlexGroup, { justifyContent: "center", gutterSize: "none", wrap: true },
        React.createElement(user_host_working_dir_1.UserHostWorkingDir, { eventId: id, contextId: contextId, userName: userName, workingDirectory: workingDirectory, hostName: hostName }),
        React.createElement(helpers_2.TokensFlexItem, { grow: false, component: "span" }, text),
        React.createElement(helpers_2.TokensFlexItem, { grow: false, component: "span" },
            React.createElement(process_draggable_1.ProcessDraggableWithNonExistentProcess, { contextId: contextId, eventId: id, processPid: processPid, processName: processName, processExecutable: processExecutable })),
        React.createElement(args_1.Args, { eventId: id, args: args, contextId: contextId, processTitle: processTitle }),
        outcome != null && (React.createElement(helpers_2.TokensFlexItem, { grow: false, component: "span" }, i18n.WITH_RESULT)),
        React.createElement(helpers_2.TokensFlexItem, { grow: false, component: "span" },
            React.createElement(draggables_1.DraggableBadge, { contextId: contextId, eventId: id, field: "event.outcome", queryValue: outcome, value: outcome })),
        React.createElement(auth_ssh_1.AuthSsh, { contextId: contextId, eventId: id, sshSignature: sshSignature, sshMethod: sshMethod }),
        React.createElement(package_1.Package, { contextId: contextId, eventId: id, packageName: packageName, packageSummary: packageSummary, packageVersion: packageVersion })),
    message != null && (React.createElement(React.Fragment, null,
        React.createElement(eui_1.EuiSpacer, { size: "xs" }),
        React.createElement(eui_1.EuiFlexGroup, { justifyContent: "center", gutterSize: "none", wrap: true },
            React.createElement(helpers_2.TokensFlexItem, { grow: false, component: "span" },
                React.createElement(page_1.Badge, { iconType: "editorComment", color: "hollow" },
                    React.createElement(helpers_1.OverflowField, { value: message })))))))));
exports.SystemGenericFileDetails = recompose_1.pure(({ data, contextId, text }) => {
    const id = data._id;
    const message = data.message != null ? data.message[0] : null;
    const hostName = fp_1.get('host.name[0]', data);
    const userName = fp_1.get('user.name[0]', data);
    const outcome = fp_1.get('event.outcome[0]', data);
    const packageName = fp_1.get('system.audit.package.name[0]', data);
    const packageSummary = fp_1.get('system.audit.package.summary[0]', data);
    const packageVersion = fp_1.get('system.audit.package.version[0]', data);
    const processPid = fp_1.get('process.pid[0]', data);
    const processName = fp_1.get('process.name[0]', data);
    const sshSignature = fp_1.get('system.auth.ssh.signature[0]', data);
    const sshMethod = fp_1.get('system.auth.ssh.method[0]', data);
    const processExecutable = fp_1.get('process.executable[0]', data);
    const processTitle = fp_1.get('process.title[0]', data);
    const workingDirectory = fp_1.get('process.working_directory[0]', data);
    const rawArgs = fp_1.get('process.args', data);
    const args = rawArgs != null ? rawArgs.slice(1).join(' ') : null;
    return (React.createElement(helpers_2.Details, null,
        React.createElement(exports.SystemGenericFileLine, { id: id, contextId: contextId, text: text, hostName: hostName, userName: userName, message: message, processTitle: processTitle, workingDirectory: workingDirectory, args: args, packageName: packageName, packageSummary: packageSummary, packageVersion: packageVersion, processName: processName, processPid: processPid, processExecutable: processExecutable, sshSignature: sshSignature, sshMethod: sshMethod, outcome: outcome }),
        React.createElement(eui_1.EuiSpacer, { size: "s" }),
        React.createElement(netflow_1.NetflowRenderer, { data: data })));
});
