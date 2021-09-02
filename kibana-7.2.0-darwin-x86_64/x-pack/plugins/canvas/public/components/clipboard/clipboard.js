"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const copy_to_clipboard_1 = tslib_1.__importDefault(require("copy-to-clipboard"));
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
const react_1 = tslib_1.__importDefault(require("react"));
class Clipboard extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.onClick = (ev) => {
            const { content, onCopy } = this.props;
            ev.preventDefault();
            onCopy(copy_to_clipboard_1.default(content.toString(), { debug: true }));
        };
    }
    render() {
        return (react_1.default.createElement("div", { className: "canvasClipboard", onClick: this.onClick, onKeyPress: this.onClick, role: "button", tabIndex: 0 }, this.props.children));
    }
}
Clipboard.propTypes = {
    children: prop_types_1.default.element.isRequired,
    content: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.number]).isRequired,
    onCopy: prop_types_1.default.func,
};
exports.Clipboard = Clipboard;
