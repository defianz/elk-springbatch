"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_dom_1 = tslib_1.__importDefault(require("react-dom"));
const blame_1 = require("../../components/main/blame");
class BlameWidget {
    constructor(blame, isFirstLine, editor) {
        this.blame = blame;
        this.isFirstLine = isFirstLine;
        this.editor = editor;
        this.allowEditorOverflow = true;
        this.suppressMouseDown = false;
        this.containerNode = document.createElement('div');
        this.domNode = document.createElement('div');
        this.containerNode.appendChild(this.domNode);
        this.editor.onDidLayoutChange(() => this.update());
        // this.editor.onDidScrollChange(e => this.update());
        this.update();
        // @ts-ignore
        this.editor.addContentWidget(this);
        this.editor.layoutContentWidget(this);
    }
    destroy() {
        this.editor.removeContentWidget(this);
    }
    getDomNode() {
        return this.containerNode;
    }
    getId() {
        return 'blame_' + this.blame.startLine;
    }
    getPosition() {
        return {
            position: {
                column: 0,
                lineNumber: this.blame.startLine,
            },
            preference: [0],
        };
    }
    update() {
        const { fontSize, lineHeight } = this.editor.getConfiguration().fontInfo;
        this.domNode.style.position = 'relative';
        this.domNode.style.left = '-332px';
        this.domNode.style.width = '316px';
        this.domNode.style.fontSize = `${fontSize}px`;
        this.domNode.style.lineHeight = `${lineHeight}px`;
        const element = react_1.default.createElement(blame_1.Blame, { blame: this.blame, isFirstLine: this.isFirstLine }, null);
        // @ts-ignore
        react_dom_1.default.render(element, this.domNode);
    }
}
exports.BlameWidget = BlameWidget;
