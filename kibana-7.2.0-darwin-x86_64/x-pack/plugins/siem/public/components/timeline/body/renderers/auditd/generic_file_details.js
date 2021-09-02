"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const eui_2 = require("@elastic/eui");
const fp_1 = require("lodash/fp");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const draggables_1 = require("../../../../draggables");
const i18n = tslib_1.__importStar(require("./translations"));
const netflow_1 = require("../netflow");
const helpers_1 = require("../helpers");
const process_draggable_1 = require("../process_draggable");
const args_1 = require("../args");
const session_user_host_working_dir_1 = require("./session_user_host_working_dir");
exports.AuditdGenericFileLine = recompose_1.pure(({ id, contextId, hostName, userName, result, primary, secondary, filePath, processName, processPid, processExecutable, processTitle, workingDirectory, args, session, text, fileIcon, }) => (React.createElement(eui_1.EuiFlexGroup, { justifyContent: "center", gutterSize: "none", wrap: true },
    React.createElement(session_user_host_working_dir_1.SessionUserHostWorkingDir, { eventId: id, contextId: contextId, hostName: hostName, userName: userName, primary: primary, secondary: secondary, workingDirectory: workingDirectory, session: session }),
    (filePath != null || processExecutable != null) && (React.createElement(helpers_1.TokensFlexItem, { grow: false, component: "span" }, text)),
    React.createElement(helpers_1.TokensFlexItem, { grow: false, component: "span" },
        React.createElement(draggables_1.DraggableBadge, { contextId: contextId, eventId: id, field: "file.path", value: filePath, iconType: fileIcon })),
    processExecutable != null && (React.createElement(helpers_1.TokensFlexItem, { grow: false, component: "span" }, i18n.USING)),
    React.createElement(helpers_1.TokensFlexItem, { grow: false, component: "span" },
        React.createElement(process_draggable_1.ProcessDraggable, { contextId: contextId, eventId: id, processPid: processPid, processName: processName, processExecutable: processExecutable })),
    React.createElement(args_1.Args, { eventId: id, args: args, contextId: contextId, processTitle: processTitle }),
    result != null && (React.createElement(helpers_1.TokensFlexItem, { grow: false, component: "span" }, i18n.WITH_RESULT)),
    React.createElement(helpers_1.TokensFlexItem, { grow: false, component: "span" },
        React.createElement(draggables_1.DraggableBadge, { contextId: contextId, eventId: id, field: "auditd.result", queryValue: result, value: result })))));
exports.AuditdGenericFileDetails = recompose_1.pure(({ data, contextId, text, fileIcon = 'document' }) => {
    const id = data._id;
    const session = fp_1.get('auditd.session[0]', data);
    const hostName = fp_1.get('host.name[0]', data);
    const userName = fp_1.get('user.name[0]', data);
    const result = fp_1.get('auditd.result[0]', data);
    const processPid = fp_1.get('process.pid[0]', data);
    const processName = fp_1.get('process.name[0]', data);
    const processExecutable = fp_1.get('process.executable[0]', data);
    const processTitle = fp_1.get('process.title[0]', data);
    const workingDirectory = fp_1.get('process.working_directory[0]', data);
    const filePath = fp_1.get('file.path[0]', data);
    const primary = fp_1.get('auditd.summary.actor.primary[0]', data);
    const secondary = fp_1.get('auditd.summary.actor.secondary[0]', data);
    const rawArgs = fp_1.get('process.args', data);
    const args = rawArgs != null ? rawArgs.slice(1).join(' ') : null;
    if (data.process != null) {
        return (React.createElement(helpers_1.Details, null,
            React.createElement(exports.AuditdGenericFileLine, { id: id, contextId: contextId, text: text, hostName: hostName, userName: userName, filePath: filePath, processName: processName, processPid: processPid, processExecutable: processExecutable, processTitle: processTitle, workingDirectory: workingDirectory, args: args, session: session, primary: primary, secondary: secondary, fileIcon: fileIcon, result: result }),
            React.createElement(eui_2.EuiSpacer, { size: "s" }),
            React.createElement(netflow_1.NetflowRenderer, { data: data })));
    }
    else {
        return null;
    }
});
