"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const scrollableElement_1 = require("monaco-editor/esm/vs/base/browser/ui/scrollbar/scrollableElement");
const disposable_1 = require("./disposable");
const monaco_1 = require("./monaco");
function toggleClass(node, clazzName, toggle) {
    node.classList.toggle(clazzName, toggle);
}
exports.toggleClass = toggleClass;
class ContentWidget extends disposable_1.Disposable {
    constructor(id, editor) {
        super();
        this.id = id;
        this.editor = editor;
        this.stoleFocus = false;
        this.containerDomNode = document.createElement('div');
        this.domNode = document.createElement('div');
        this.extraNode = document.createElement('div');
        this.scrollbar = new scrollableElement_1.DomScrollableElement(this.domNode, {});
        this.disposables.push(this.scrollbar);
        this.containerDomNode.appendChild(this.scrollbar.getDomNode());
        this.containerDomNode.appendChild(this.extraNode);
        this.visible = false;
        this.editor.onDidLayoutChange(e => this.updateMaxHeight());
        this.editor.onDidChangeModel(() => this.hide());
        this.updateMaxHeight();
        this.showAtPosition = null;
        // @ts-ignore
        this.editor.addContentWidget(this);
    }
    get isVisible() {
        return this.visible;
    }
    set isVisible(value) {
        this.visible = value;
        toggleClass(this.containerDomNode, 'hidden', !this.visible);
    }
    getId() {
        return this.id;
    }
    getDomNode() {
        return this.containerDomNode;
    }
    showAt(position, focus) {
        this.showAtPosition = position;
        // @ts-ignore
        this.editor.layoutContentWidget(this);
        this.isVisible = true;
        this.editor.render();
        this.stoleFocus = focus;
        if (focus) {
            this.containerDomNode.focus();
        }
    }
    hide() {
        if (!this.isVisible) {
            return;
        }
        this.isVisible = false;
        // @ts-ignore
        this.editor.layoutContentWidget(this);
        if (this.stoleFocus) {
            this.editor.focus();
        }
    }
    // @ts-ignore
    getPosition() {
        const { ContentWidgetPositionPreference } = monaco_1.monaco.editor;
        if (this.isVisible) {
            return {
                position: this.showAtPosition,
                preference: [ContentWidgetPositionPreference.ABOVE, ContentWidgetPositionPreference.BELOW],
            };
        }
        return null;
    }
    dispose() {
        // @ts-ignore
        this.editor.removeContentWidget(this);
        this.disposables.forEach(d => d.dispose());
    }
    updateContents(node, extra) {
        this.domNode.textContent = '';
        this.domNode.appendChild(node);
        this.extraNode.innerHTML = '';
        if (extra) {
            this.extraNode.appendChild(extra);
        }
        this.updateFont();
        // @ts-ignore
        this.editor.layoutContentWidget(this);
        this.onContentsChange();
    }
    onContentsChange() {
        this.scrollbar.scanDomNode();
    }
    updateMaxHeight() {
        const height = Math.max(this.editor.getLayoutInfo().height / 4, 250);
        const { fontSize, lineHeight } = this.editor.getConfiguration().fontInfo;
        this.domNode.style.fontSize = `${fontSize}px`;
        this.domNode.style.lineHeight = `${lineHeight}px`;
        this.domNode.style.maxHeight = `${height}px`;
    }
    updateFont() {
        const codeTags = Array.prototype.slice.call(this.domNode.getElementsByTagName('code'));
        const codeClasses = Array.prototype.slice.call(this.domNode.getElementsByClassName('code'));
        [...codeTags, ...codeClasses].forEach(node => this.editor.applyFontInfo(node));
    }
}
exports.ContentWidget = ContentWidget;
