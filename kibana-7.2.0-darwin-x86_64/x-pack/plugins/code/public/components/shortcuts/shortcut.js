"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_redux_1 = require("react-redux");
const actions_1 = require("../../actions");
var OS;
(function (OS) {
    OS[OS["win"] = 0] = "win";
    OS[OS["mac"] = 1] = "mac";
    OS[OS["linux"] = 2] = "linux";
})(OS = exports.OS || (exports.OS = {}));
var Modifier;
(function (Modifier) {
    Modifier[Modifier["ctrl"] = 0] = "ctrl";
    Modifier[Modifier["meta"] = 1] = "meta";
    Modifier[Modifier["alt"] = 2] = "alt";
    Modifier[Modifier["shift"] = 3] = "shift";
})(Modifier = exports.Modifier || (exports.Modifier = {}));
class ShortcutsComponent extends react_1.default.Component {
    constructor(props, context) {
        super(props, context);
        this.hotKey = {
            key: props.keyCode,
            help: props.help,
            onPress: props.onPress,
            modifier: new Map(),
        };
        if (props.winModifier) {
            this.hotKey.modifier.set(OS.win, props.winModifier);
        }
        if (props.macModifier) {
            this.hotKey.modifier.set(OS.mac, props.macModifier);
        }
        if (props.linuxModifier) {
            this.hotKey.modifier.set(OS.linux, props.linuxModifier);
        }
    }
    componentDidMount() {
        this.props.registerShortcut(this.hotKey);
    }
    componentWillUnmount() {
        this.props.unregisterShortcut(this.hotKey);
    }
    render() {
        return null;
    }
}
const mapDispatchToProps = {
    registerShortcut: actions_1.registerShortcut,
    unregisterShortcut: actions_1.unregisterShortcut,
};
exports.Shortcut = react_redux_1.connect(null, mapDispatchToProps)(ShortcutsComponent);
