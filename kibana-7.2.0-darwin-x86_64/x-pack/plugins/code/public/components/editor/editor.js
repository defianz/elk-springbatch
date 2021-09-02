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
const react_router_dom_1 = require("react-router-dom");
const actions_1 = require("../../actions");
const blame_widget_1 = require("../../monaco/blame/blame_widget");
const monaco_1 = require("../../monaco/monaco");
const monaco_helper_1 = require("../../monaco/monaco_helper");
const selectors_1 = require("../../selectors");
const url_1 = require("../../utils/url");
const shortcuts_1 = require("../shortcuts");
const references_panel_1 = require("./references_panel");
const url_2 = require("../../utils/url");
class EditorComponent extends react_1.default.Component {
    constructor(props, context) {
        super(props, context);
        this.lineDecorations = null;
    }
    componentDidMount() {
        this.container = document.getElementById('mainEditor');
        this.monaco = new monaco_helper_1.MonacoHelper(this.container, this.props, this.props.location.search);
        const { file } = this.props;
        if (file && file.content) {
            const { uri, path, revision } = file.payload;
            const qs = this.props.location.search;
            this.loadText(file.content, uri, path, file.lang, revision, qs).then(() => {
                if (this.props.revealPosition) {
                    this.revealPosition(this.props.revealPosition);
                }
                if (this.props.showBlame) {
                    this.loadBlame(this.props.blames);
                }
            });
        }
    }
    componentDidUpdate(prevProps) {
        const { file } = this.props;
        const { uri, path, revision } = file.payload;
        const { resource, org, repo, revision: routeRevision, path: routePath, } = this.props.match.params;
        const prevContent = prevProps.file && prevProps.file.content;
        const qs = this.props.location.search;
        if (prevContent !== file.content || qs !== prevProps.location.search) {
            this.loadText(file.content, uri, path, file.lang, revision, qs).then(() => {
                if (this.props.revealPosition) {
                    this.revealPosition(this.props.revealPosition);
                }
            });
        }
        else if (file.payload.uri === `${resource}/${org}/${repo}` &&
            file.payload.revision === routeRevision &&
            file.payload.path === routePath &&
            prevProps.revealPosition !== this.props.revealPosition) {
            this.revealPosition(this.props.revealPosition);
        }
        if (this.monaco && qs !== prevProps.location.search) {
            this.monaco.updateUrlQuery(qs);
        }
        if (this.monaco && this.monaco.editor) {
            if (prevProps.showBlame !== this.props.showBlame && this.props.showBlame) {
                this.loadBlame(this.props.blames);
                this.monaco.editor.updateOptions({ lineHeight: 38 });
            }
            else if (!this.props.showBlame) {
                this.destroyBlameWidgets();
                this.monaco.editor.updateOptions({ lineHeight: 18, lineDecorationsWidth: 16 });
            }
            if (prevProps.blames !== this.props.blames && this.props.showBlame) {
                this.loadBlame(this.props.blames);
                this.monaco.editor.updateOptions({ lineHeight: 38, lineDecorationsWidth: 316 });
            }
        }
    }
    componentWillUnmount() {
        this.monaco.destroy();
    }
    render() {
        return (react_1.default.createElement(eui_1.EuiFlexItem, { "data-test-subj": "codeSourceViewer", className: "codeOverflowHidden", grow: 1 },
            react_1.default.createElement(shortcuts_1.Shortcut, { keyCode: "f", help: "With editor \u2018active\u2019 Find in file", linuxModifier: [shortcuts_1.Modifier.ctrl], macModifier: [shortcuts_1.Modifier.meta], winModifier: [shortcuts_1.Modifier.ctrl] }),
            react_1.default.createElement("div", { tabIndex: 0, className: "codeContainer__editor", id: "mainEditor" }),
            this.renderReferences()));
    }
    loadBlame(blames) {
        if (this.blameWidgets) {
            this.destroyBlameWidgets();
        }
        this.blameWidgets = blames.map((b, index) => {
            return new blame_widget_1.BlameWidget(b, index === 0, this.monaco.editor);
        });
        if (!this.lineDecorations) {
            this.lineDecorations = this.monaco.editor.deltaDecorations([], [
                {
                    range: new monaco_1.monaco.Range(1, 1, Infinity, 1),
                    options: { isWholeLine: true, linesDecorationsClassName: 'code-line-decoration' },
                },
            ]);
        }
    }
    destroyBlameWidgets() {
        if (this.blameWidgets) {
            this.blameWidgets.forEach((bw) => bw.destroy());
        }
        if (this.lineDecorations) {
            this.monaco.editor.deltaDecorations(this.lineDecorations, []);
            this.lineDecorations = null;
        }
        this.blameWidgets = null;
    }
    async loadText(text, repo, file, lang, revision, qs) {
        if (this.monaco) {
            this.editor = await this.monaco.loadFile(repo, file, text, lang, revision);
            this.editor.onMouseDown((e) => {
                if (e.target.type === monaco_1.monaco.editor.MouseTargetType.GUTTER_LINE_NUMBERS) {
                    const uri = `${repo}/blob/${url_2.encodeRevisionString(revision)}/${file}`;
                    url_1.history.push(`/${uri}!L${e.target.position.lineNumber}:0${qs}`);
                }
                this.monaco.container.focus();
            });
        }
    }
    revealPosition(pos) {
        if (this.monaco) {
            if (pos) {
                this.monaco.revealPosition(pos.line, pos.character);
            }
            else {
                this.monaco.clearLineSelection();
            }
        }
    }
    renderReferences() {
        return (this.props.isReferencesOpen && (react_1.default.createElement(references_panel_1.ReferencesPanel, { onClose: () => this.props.closeReferences(true), references: this.props.references, isLoading: this.props.isReferencesLoading, title: this.props.referencesTitle, refUrl: this.props.refUrl })));
    }
}
exports.EditorComponent = EditorComponent;
const mapStateToProps = (state) => ({
    file: state.file.file,
    isReferencesOpen: state.editor.showing,
    isReferencesLoading: state.editor.loading,
    references: state.editor.references,
    referencesTitle: state.editor.referencesTitle,
    hover: state.editor.hover,
    refUrl: selectors_1.refUrlSelector(state),
    revealPosition: state.editor.revealPosition,
    blames: state.blame.blames,
});
const mapDispatchToProps = {
    closeReferences: actions_1.closeReferences,
    findReferences: actions_1.findReferences,
    hoverResult: actions_1.hoverResult,
};
exports.Editor = react_router_dom_1.withRouter(react_redux_1.connect(mapStateToProps, mapDispatchToProps)(EditorComponent));
