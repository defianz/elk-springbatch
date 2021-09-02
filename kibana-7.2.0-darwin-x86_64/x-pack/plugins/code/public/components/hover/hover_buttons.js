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
const hover_widget_1 = require("./hover_widget");
class HoverButtons extends react_1.default.PureComponent {
    render() {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(eui_1.EuiFlexGroup, { className: "button-group euiFlexGroup", gutterSize: "none", responsive: true },
                react_1.default.createElement(eui_1.EuiButton, { size: "s", isDisabled: this.props.state !== hover_widget_1.HoverState.READY, onClick: this.props.gotoDefinition, "data-test-subj": "codeGoToDefinitionButton" }, "Goto Definition"),
                react_1.default.createElement(eui_1.EuiButton, { size: "s", isDisabled: this.props.state !== hover_widget_1.HoverState.READY, onClick: this.props.findReferences, "data-test-subj": "codeFindReferenceButton" }, "Find Reference"))));
    }
}
exports.HoverButtons = HoverButtons;
