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
const actions_1 = require("../../actions");
const shortcut_1 = require("./shortcut");
class ShortcutsComponent extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.handleKeydown = (event) => {
            const target = event.target;
            const key = event.key;
            // @ts-ignore
            if (target && target.tagName === 'INPUT') {
                if (key === 'Escape') {
                    // @ts-ignore
                    target.blur();
                }
            }
        };
        this.handleKeyPress = (event) => {
            const target = event.target;
            const key = event.key;
            // @ts-ignore
            if (target && target.tagName === 'INPUT') {
                return;
            }
            const isPressed = (s) => {
                if (s.modifier) {
                    const mods = s.modifier.get(this.os) || [];
                    for (const mod of mods) {
                        switch (mod) {
                            case shortcut_1.Modifier.alt:
                                if (!event.altKey) {
                                    return false;
                                }
                                break;
                            case shortcut_1.Modifier.ctrl:
                                if (!event.ctrlKey) {
                                    return false;
                                }
                                break;
                            case shortcut_1.Modifier.meta:
                                if (!event.metaKey) {
                                    return false;
                                }
                                break;
                            case shortcut_1.Modifier.shift:
                                if (!event.shiftKey) {
                                    return false;
                                }
                                break;
                        }
                    }
                }
                return key === s.key;
            };
            let isTriggered = false;
            for (const shortcut of this.props.shortcuts) {
                if (isPressed(shortcut) && shortcut.onPress) {
                    shortcut.onPress(this.props.dispatch);
                    isTriggered = true;
                }
            }
            if (isTriggered) {
                // Discard this input since it's been triggered already.
                event.preventDefault();
            }
        };
        this.closeModal = () => {
            this.props.dispatch(actions_1.toggleHelp(false));
        };
        if (navigator.appVersion.indexOf('Win') !== -1) {
            this.os = shortcut_1.OS.win;
        }
        else if (navigator.appVersion.indexOf('Mac') !== -1) {
            this.os = shortcut_1.OS.mac;
        }
        else {
            this.os = shortcut_1.OS.linux;
        }
    }
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeydown);
        document.addEventListener('keypress', this.handleKeyPress);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeydown);
        document.removeEventListener('keypress', this.handleKeyPress);
    }
    render() {
        return (react_1.default.createElement(react_1.default.Fragment, null, this.props.showHelp && (react_1.default.createElement(eui_1.EuiOverlayMask, null,
            react_1.default.createElement(eui_1.EuiModal, { onClose: this.closeModal },
                react_1.default.createElement(eui_1.EuiModalHeader, null,
                    react_1.default.createElement(eui_1.EuiModalHeaderTitle, null, "Keyboard Shortcuts")),
                react_1.default.createElement(eui_1.EuiModalBody, null, this.renderShortcuts()),
                react_1.default.createElement(eui_1.EuiModalFooter, null,
                    react_1.default.createElement(eui_1.EuiButton, { onClick: this.closeModal, fill: true }, "Close")))))));
    }
    showModifier(mod) {
        switch (mod) {
            case shortcut_1.Modifier.meta:
                if (this.os === shortcut_1.OS.mac) {
                    return '⌘';
                }
                else if (this.os === shortcut_1.OS.win) {
                    return '⊞ Win';
                }
                else {
                    return 'meta';
                }
            case shortcut_1.Modifier.shift:
                if (this.os === shortcut_1.OS.mac) {
                    return '⇧';
                }
                else {
                    return 'shift';
                }
            case shortcut_1.Modifier.ctrl:
                if (this.os === shortcut_1.OS.mac) {
                    return '⌃';
                }
                else {
                    return 'ctrl';
                }
            case shortcut_1.Modifier.alt:
                if (this.os === shortcut_1.OS.mac) {
                    return '⌥';
                }
                else {
                    return 'alt';
                }
        }
    }
    renderShortcuts() {
        return this.props.shortcuts.map((s, idx) => {
            return (react_1.default.createElement("div", { key: 'shortcuts_' + idx },
                this.renderModifier(s),
                react_1.default.createElement("span", { className: "codeShortcuts__key" }, s.key),
                react_1.default.createElement("span", { className: "codeShortcuts__helpText" }, s.help)));
        });
    }
    renderModifier(hotKey) {
        if (hotKey.modifier) {
            const modifiers = hotKey.modifier.get(this.os) || [];
            return modifiers.map(m => react_1.default.createElement("div", { className: "codeShortcuts__key" }, this.showModifier(m)));
        }
        else {
            return null;
        }
    }
}
const mapStateToProps = (state) => ({
    shortcuts: state.shortcuts.shortcuts,
    showHelp: state.shortcuts.showHelp,
});
exports.ShortcutsProvider = react_redux_1.connect(mapStateToProps)(ShortcutsComponent);
