"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const moment_1 = tslib_1.__importDefault(require("moment"));
const react_1 = tslib_1.__importDefault(require("react"));
class Blame extends react_1.default.PureComponent {
    render() {
        const { blame, isFirstLine } = this.props;
        return (react_1.default.createElement(eui_1.EuiFlexGroup, { className: isFirstLine ? 'codeBlame__item codeBlame__item--first ' : 'codeBlame__item', gutterSize: "none", justifyContent: "spaceBetween" },
            react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                react_1.default.createElement(eui_1.EuiFlexGroup, { gutterSize: "none", alignItems: "center" },
                    react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                        react_1.default.createElement(eui_1.EuiAvatar, { size: "s", type: "space", className: "codeAvatar", name: blame.committer.name, initialsLength: 1 })),
                    react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                        react_1.default.createElement(eui_1.EuiText, { size: "xs", className: "codeText__blameMessage eui-textTruncate" }, blame.commit.message)))),
            react_1.default.createElement(eui_1.EuiFlexItem, { grow: false, className: "eui-textTruncate" },
                react_1.default.createElement(eui_1.EuiText, { size: "xs", className: "eui-textTruncate code-auto-margin" },
                    react_1.default.createElement(eui_1.EuiTextColor, { color: "subdued" }, moment_1.default(blame.commit.date).fromNow())))));
    }
}
exports.Blame = Blame;
