"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const react_fast_compare_1 = tslib_1.__importDefault(require("react-fast-compare"));
// @ts-ignore no @types definition
const react_shortcuts_1 = require("react-shortcuts");
const is_text_input_1 = require("../../lib/is_text_input");
class WorkpadShortcuts extends react_1.Component {
    constructor() {
        super(...arguments);
        this._keyMap = {
            CUT: this.props.cutNodes,
            COPY: this.props.copyNodes,
            PASTE: this.props.pasteNodes,
            CLONE: this.props.cloneNodes,
            DELETE: this.props.deleteNodes,
            BRING_TO_FRONT: this.props.bringToFront,
            BRING_FORWARD: this.props.bringForward,
            SEND_BACKWARD: this.props.sendBackward,
            SEND_TO_BACK: this.props.sendToBack,
            GROUP: this.props.groupNodes,
            UNGROUP: this.props.ungroupNodes,
        };
    }
    render() {
        return (react_1.default.createElement(react_shortcuts_1.Shortcuts, { name: "ELEMENT", handler: (action, event) => {
                if (!is_text_input_1.isTextInput(event.target)) {
                    event.preventDefault();
                    this._keyMap[action]();
                }
            }, targetNodeSelector: `body`, global: true }));
    }
    shouldComponentUpdate(nextProps) {
        return !react_fast_compare_1.default(nextProps, this.props);
    }
}
exports.WorkpadShortcuts = WorkpadShortcuts;
