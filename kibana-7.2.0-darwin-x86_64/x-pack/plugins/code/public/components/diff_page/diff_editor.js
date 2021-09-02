"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const monaco_diff_editor_1 = require("../../monaco/monaco_diff_editor");
class DiffEditor extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.diffEditor = null;
        this.mountDiffEditor = (container) => {
            this.diffEditor = new monaco_diff_editor_1.MonacoDiffEditor(container, this.props.originCode, this.props.modifiedCode, this.props.language, this.props.renderSideBySide);
            this.diffEditor.init();
        };
    }
    componentDidUpdate(prevProps) {
        if (prevProps.renderSideBySide !== this.props.renderSideBySide) {
            this.updateLayout(this.props.renderSideBySide);
        }
    }
    updateLayout(renderSideBySide) {
        this.diffEditor.diffEditor.updateOptions({ renderSideBySide });
    }
    render() {
        return react_1.default.createElement("div", { id: "diffEditor", ref: this.mountDiffEditor, style: { height: 1000 } });
    }
}
exports.DiffEditor = DiffEditor;
