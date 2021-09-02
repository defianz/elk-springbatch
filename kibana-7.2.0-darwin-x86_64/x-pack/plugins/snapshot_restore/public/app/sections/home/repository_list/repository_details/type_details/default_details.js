"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const eui_1 = require("@elastic/eui");
const index_1 = require("../../../../../index");
require("brace/theme/textmate");
exports.DefaultDetails = ({ repository: { name, settings }, }) => {
    const { core: { i18n: { FormattedMessage }, }, } = index_1.useAppDependencies();
    return (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
            react_1.default.createElement("h3", null,
                react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.settingsTitle", defaultMessage: "Settings" }))),
        react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
        react_1.default.createElement(eui_1.EuiCodeEditor, { mode: "json", theme: "textmate", width: "100%", isReadOnly: true, value: JSON.stringify(settings, null, 2), setOptions: {
                showLineNumbers: false,
                tabSize: 2,
                maxLines: Infinity,
            }, editorProps: {
                $blockScrolling: Infinity,
            }, showGutter: false, minLines: 6, "aria-label": react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.genericSettingsDescription", defaultMessage: "Readonly settings for repository '{name}'", values: {
                    name,
                } }) })));
};
