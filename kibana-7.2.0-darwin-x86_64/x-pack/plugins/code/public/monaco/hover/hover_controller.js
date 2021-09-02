"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const monaco_1 = require("../monaco");
const content_hover_widget_1 = require("./content_hover_widget");
class HoverController {
    constructor(editor) {
        this.editor = editor;
        this.disposables = [
            this.editor.onMouseMove((e) => this.onEditorMouseMove(e)),
            this.editor.onKeyDown((e) => this.onKeyDown(e)),
        ];
        this.contentWidget = new content_hover_widget_1.ContentHoverWidget(editor);
    }
    static get(editor) {
        return editor.getContribution(HoverController.ID);
    }
    dispose() {
        this.disposables.forEach(d => d.dispose());
    }
    getId() {
        return HoverController.ID;
    }
    setReduxActions(actions) {
        this.contentWidget.setHoverResultAction(actions.hoverResult);
    }
    onEditorMouseMove(mouseEvent) {
        const targetType = mouseEvent.target.type;
        const { MouseTargetType } = monaco_1.monaco.editor;
        if (targetType === MouseTargetType.CONTENT_WIDGET &&
            mouseEvent.target.detail === content_hover_widget_1.ContentHoverWidget.ID) {
            return;
        }
        if (targetType === MouseTargetType.CONTENT_TEXT) {
            this.contentWidget.startShowingAt(mouseEvent.target.range, false);
        }
        else {
            this.contentWidget.hide();
        }
    }
    onKeyDown(e) {
        if (e.keyCode === monaco_1.monaco.KeyCode.Escape) {
            // Do not hide hover when Ctrl/Meta is pressed
            this.contentWidget.hide();
        }
    }
}
HoverController.ID = 'code.editor.contrib.hover';
exports.HoverController = HoverController;
