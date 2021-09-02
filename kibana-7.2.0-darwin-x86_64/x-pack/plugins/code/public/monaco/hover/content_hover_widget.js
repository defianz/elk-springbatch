"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// @ts-ignore
const async_1 = require("monaco-editor/esm/vs/base/common/async");
// @ts-ignore
const wordHighlighter_1 = require("monaco-editor/esm/vs/editor/contrib/wordHighlighter/wordHighlighter");
const react_1 = tslib_1.__importDefault(require("react"));
const react_dom_1 = tslib_1.__importDefault(require("react-dom"));
const lsp_error_codes_1 = require("../../../common/lsp_error_codes");
const hover_buttons_1 = require("../../components/hover/hover_buttons");
const hover_widget_1 = require("../../components/hover/hover_widget");
const content_widget_1 = require("../content_widget");
const monaco_1 = require("../monaco");
const operation_1 = require("../operation");
const hover_computer_1 = require("./hover_computer");
class ContentHoverWidget extends content_widget_1.ContentWidget {
    constructor(editor) {
        super(ContentHoverWidget.ID, editor);
        this.lastRange = null;
        this.shouldFocus = false;
        this.hoverResultAction = undefined;
        this.highlightDecorations = [];
        this.hoverState = hover_widget_1.HoverState.LOADING;
        this.containerDomNode.className = 'monaco-editor-hover hidden';
        this.containerDomNode.tabIndex = 0;
        this.domNode.className = 'monaco-editor-hover-content';
        this.computer = new hover_computer_1.HoverComputer();
        this.hoverOperation = new operation_1.Operation(this.computer, result => this.result(result), error => {
            // @ts-ignore
            if (error.code === lsp_error_codes_1.ServerNotInitialized) {
                this.hoverState = hover_widget_1.HoverState.INITIALIZING;
                this.render(this.lastRange);
            }
        }, () => {
            this.hoverState = hover_widget_1.HoverState.LOADING;
            this.render(this.lastRange);
        });
    }
    startShowingAt(range, focus) {
        if (this.isVisible && this.lastRange && this.lastRange.containsRange(range)) {
            return;
        }
        this.hoverOperation.cancel();
        const url = this.editor.getModel().uri.toString();
        if (this.isVisible) {
            this.hide();
        }
        this.computer.setParams(url, range);
        this.hoverOperation.start();
        this.lastRange = range;
        this.shouldFocus = focus;
    }
    setHoverResultAction(hoverResultAction) {
        this.hoverResultAction = hoverResultAction;
    }
    hide() {
        super.hide();
        this.highlightDecorations = this.editor.deltaDecorations(this.highlightDecorations, []);
    }
    result(result) {
        if (this.hoverResultAction) {
            // pass the result to redux
            this.hoverResultAction(result);
        }
        if (this.lastRange && result && result.contents) {
            this.render(this.lastRange, result);
        }
        else {
            this.hide();
        }
    }
    render(renderRange, result) {
        const fragment = document.createDocumentFragment();
        let props = {
            state: this.hoverState,
            gotoDefinition: this.gotoDefinition.bind(this),
            findReferences: this.findReferences.bind(this),
        };
        let startColumn = renderRange.startColumn;
        if (result) {
            let contents = [];
            if (Array.isArray(result.contents)) {
                contents = result.contents;
            }
            else {
                contents = [result.contents];
            }
            contents = contents.filter(v => {
                if (typeof v === 'string') {
                    return !!v;
                }
                else {
                    return !!v.value;
                }
            });
            if (contents.length === 0) {
                this.hide();
                return;
            }
            props = {
                ...props,
                state: hover_widget_1.HoverState.READY,
                contents,
            };
            if (result.range) {
                this.lastRange = this.toMonacoRange(result.range);
                this.highlightOccurrences(this.lastRange);
            }
            startColumn = Math.min(renderRange.startColumn, result.range ? result.range.start.character + 1 : Number.MAX_VALUE);
        }
        this.showAt(new monaco_1.monaco.Position(renderRange.startLineNumber, startColumn), this.shouldFocus);
        const element = react_1.default.createElement(hover_widget_1.HoverWidget, props, null);
        // @ts-ignore
        react_dom_1.default.render(element, fragment);
        const buttonFragment = document.createDocumentFragment();
        const buttons = react_1.default.createElement(hover_buttons_1.HoverButtons, props, null);
        // @ts-ignore
        react_dom_1.default.render(buttons, buttonFragment);
        this.updateContents(fragment, buttonFragment);
    }
    toMonacoRange(r) {
        return new monaco_1.monaco.Range(r.start.line + 1, r.start.character + 1, r.end.line + 1, r.end.character + 1);
    }
    gotoDefinition() {
        if (this.lastRange) {
            this.editor.setPosition({
                lineNumber: this.lastRange.startLineNumber,
                column: this.lastRange.startColumn,
            });
            const action = this.editor.getAction('editor.action.revealDefinition');
            action.run().then(() => this.hide());
        }
    }
    findReferences() {
        if (this.lastRange) {
            this.editor.setPosition({
                lineNumber: this.lastRange.startLineNumber,
                column: this.lastRange.startColumn,
            });
            const action = this.editor.getAction('editor.action.referenceSearch.trigger');
            action.run().then(() => this.hide());
        }
    }
    highlightOccurrences(range) {
        const pos = new monaco_1.monaco.Position(range.startLineNumber, range.startColumn);
        return async_1.createCancelablePromise((token) => wordHighlighter_1.getOccurrencesAtPosition(this.editor.getModel(), pos, token).then((data) => {
            if (data) {
                if (this.isVisible) {
                    const decorations = data.map(h => ({
                        range: h.range,
                        options: ContentHoverWidget.DECORATION_OPTIONS,
                    }));
                    this.highlightDecorations = this.editor.deltaDecorations(this.highlightDecorations, decorations);
                }
            }
            else {
                this.highlightDecorations = this.editor.deltaDecorations(this.highlightDecorations, [
                    {
                        range,
                        options: ContentHoverWidget.DECORATION_OPTIONS,
                    },
                ]);
            }
        }));
    }
}
ContentHoverWidget.ID = 'editor.contrib.contentHoverWidget';
ContentHoverWidget.DECORATION_OPTIONS = {
    className: 'wordHighlightStrong',
};
exports.ContentHoverWidget = ContentHoverWidget;
