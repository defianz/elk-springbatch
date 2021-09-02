"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const resize_checker_1 = require("ui/resize_checker");
const definition_provider_1 = require("./definition/definition_provider");
const uri_util_1 = require("../../common/uri_util");
const editor_service_1 = require("./editor_service");
const hover_controller_1 = require("./hover/hover_controller");
const monaco_1 = require("./monaco");
const references_action_1 = require("./references/references_action");
const single_selection_helper_1 = require("./single_selection_helper");
const textmodel_resolver_1 = require("./textmodel_resolver");
class MonacoHelper {
    constructor(container, editorActions, urlQuery) {
        this.container = container;
        this.editorActions = editorActions;
        this.urlQuery = urlQuery;
        this.decorations = [];
        this.editor = null;
        this.monaco = null;
        this.resizeChecker = null;
        this.updateUrlQuery = (q) => {
            this.urlQuery = q;
        };
        this.getUrlQuery = () => {
            return this.urlQuery;
        };
        this.destroy = () => {
            this.monaco = null;
            document.removeEventListener('copy', this.handleCopy);
            document.removeEventListener('cut', this.handleCopy);
            if (this.resizeChecker) {
                this.resizeChecker.destroy();
            }
        };
        this.handleCopy = this.handleCopy.bind(this);
    }
    get initialized() {
        return this.monaco !== null;
    }
    init() {
        return new Promise(resolve => {
            this.monaco = monaco_1.monaco;
            const definitionProvider = {
                provideDefinition(model, position) {
                    return definition_provider_1.provideDefinition(monaco_1.monaco, model, position);
                },
            };
            this.monaco.languages.registerDefinitionProvider('java', definitionProvider);
            this.monaco.languages.registerDefinitionProvider('typescript', definitionProvider);
            this.monaco.languages.registerDefinitionProvider('javascript', definitionProvider);
            if (chrome_1.default.getInjected('enableLangserversDeveloping', false) === true) {
                this.monaco.languages.registerDefinitionProvider('go', definitionProvider);
            }
            const codeEditorService = new editor_service_1.EditorService(this.getUrlQuery);
            codeEditorService.setMonacoHelper(this);
            this.editor = monaco_1.monaco.editor.create(this.container, {
                readOnly: true,
                minimap: {
                    enabled: false,
                },
                hover: {
                    enabled: false,
                },
                occurrencesHighlight: false,
                selectionHighlight: false,
                renderLineHighlight: 'none',
                contextmenu: false,
                folding: true,
                scrollBeyondLastLine: false,
                renderIndentGuides: false,
                automaticLayout: false,
            }, {
                textModelService: new textmodel_resolver_1.TextModelResolverService(monaco_1.monaco),
                codeEditorService,
            });
            single_selection_helper_1.registerEditor(this.editor);
            this.resizeChecker = new resize_checker_1.ResizeChecker(this.container);
            this.resizeChecker.on('resize', () => {
                setTimeout(() => {
                    this.editor.layout();
                });
            });
            references_action_1.registerReferencesAction(this.editor, this.getUrlQuery);
            const hoverController = new hover_controller_1.HoverController(this.editor);
            hoverController.setReduxActions(this.editorActions);
            document.addEventListener('copy', this.handleCopy);
            document.addEventListener('cut', this.handleCopy);
            resolve(this.editor);
        });
    }
    async loadFile(repoUri, file, text, lang, revision = 'master') {
        if (!this.initialized) {
            await this.init();
        }
        const ed = this.editor;
        const oldModel = ed.getModel();
        if (oldModel) {
            oldModel.dispose();
        }
        ed.setModel(null);
        const uri = this.monaco.Uri.parse(uri_util_1.toCanonicalUrl({ schema: 'git:', repoUri, file, revision, pathType: 'blob' }));
        let newModel = this.monaco.editor.getModel(uri);
        if (!newModel) {
            newModel = this.monaco.editor.createModel(text, lang, uri);
        }
        else {
            newModel.setValue(text);
        }
        ed.setModel(newModel);
        return ed;
    }
    revealPosition(line, pos) {
        const position = {
            lineNumber: line,
            column: pos,
        };
        this.decorations = this.editor.deltaDecorations(this.decorations, [
            {
                range: new this.monaco.Range(line, 0, line, 0),
                options: {
                    isWholeLine: true,
                    className: `code-monaco-highlight-line code-line-number-${line}`,
                    linesDecorationsClassName: 'code-mark-line-number',
                },
            },
        ]);
        this.editor.setPosition(position);
        this.editor.revealLineInCenterIfOutsideViewport(line);
    }
    clearLineSelection() {
        this.decorations = this.editor.deltaDecorations(this.decorations, []);
    }
    handleCopy(e) {
        if (this.editor &&
            this.editor.hasTextFocus() &&
            this.editor.hasWidgetFocus() &&
            !this.editor.getSelection().isEmpty()) {
            const text = this.editor.getModel().getValueInRange(this.editor.getSelection());
            e.clipboardData.setData('text/plain', text);
            e.preventDefault();
        }
    }
}
exports.MonacoHelper = MonacoHelper;
