"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const resize_checker_1 = require("ui/resize_checker");
const monaco_1 = require("./monaco");
class MonacoDiffEditor {
    constructor(container, originCode, modifiedCode, language, renderSideBySide) {
        this.container = container;
        this.originCode = originCode;
        this.modifiedCode = modifiedCode;
        this.language = language;
        this.renderSideBySide = renderSideBySide;
        this.diffEditor = null;
        this.resizeChecker = null;
    }
    init() {
        return new Promise(resolve => {
            const originalModel = monaco_1.monaco.editor.createModel(this.originCode, this.language);
            const modifiedModel = monaco_1.monaco.editor.createModel(this.modifiedCode, this.language);
            const diffEditor = monaco_1.monaco.editor.createDiffEditor(this.container, {
                enableSplitViewResizing: false,
                renderSideBySide: this.renderSideBySide,
                scrollBeyondLastLine: false,
            });
            this.resizeChecker = new resize_checker_1.ResizeChecker(this.container);
            this.resizeChecker.on('resize', () => {
                setTimeout(() => {
                    this.diffEditor.layout();
                });
            });
            diffEditor.setModel({
                original: originalModel,
                modified: modifiedModel,
            });
            this.diffEditor = diffEditor;
        });
    }
}
exports.MonacoDiffEditor = MonacoDiffEditor;
