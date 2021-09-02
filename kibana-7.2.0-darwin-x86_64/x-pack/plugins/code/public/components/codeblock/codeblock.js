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
const resize_checker_1 = require("ui/resize_checker");
const monaco_1 = require("../../monaco/monaco");
const single_selection_helper_1 = require("../../monaco/single_selection_helper");
class CodeBlock extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.el = null;
        this.currentHighlightDecorations = [];
        this.lineNumbersFunc = (line) => {
            if (this.props.lineNumbersFunc) {
                return this.props.lineNumbersFunc(line);
            }
            return `${(this.props.startLine || 0) + line}`;
        };
    }
    componentDidMount() {
        if (this.el) {
            this.ed = monaco_1.monaco.editor.create(this.el, {
                value: this.props.code,
                language: this.props.language,
                lineNumbers: this.lineNumbersFunc.bind(this),
                readOnly: true,
                folding: this.props.folding,
                minimap: {
                    enabled: false,
                },
                scrollbar: {
                    vertical: 'hidden',
                    handleMouseWheel: false,
                    verticalScrollbarSize: 0,
                },
                hover: {
                    enabled: false,
                },
                contextmenu: false,
                selectOnLineNumbers: false,
                selectionHighlight: false,
                renderLineHighlight: 'none',
                renderIndentGuides: false,
                automaticLayout: false,
            });
            this.ed.onMouseDown((e) => {
                if (this.props.onClick &&
                    (e.target.type === monaco_1.monaco.editor.MouseTargetType.GUTTER_LINE_NUMBERS ||
                        e.target.type === monaco_1.monaco.editor.MouseTargetType.CONTENT_TEXT)) {
                    const lineNumber = (this.props.startLine || 0) + e.target.position.lineNumber;
                    this.props.onClick({
                        lineNumber,
                        column: e.target.position.column,
                    });
                }
            });
            single_selection_helper_1.registerEditor(this.ed);
            if (this.props.highlightRanges) {
                const decorations = this.props.highlightRanges.map((range) => {
                    return {
                        range,
                        options: {
                            inlineClassName: 'codeSearch__highlight',
                        },
                    };
                });
                this.currentHighlightDecorations = this.ed.deltaDecorations([], decorations);
            }
            this.resizeChecker = new resize_checker_1.ResizeChecker(this.el);
            this.resizeChecker.on('resize', () => {
                setTimeout(() => {
                    this.ed.layout();
                });
            });
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.code !== this.props.code ||
            prevProps.highlightRanges !== this.props.highlightRanges) {
            if (this.ed) {
                this.ed.getModel().setValue(this.props.code);
                if (this.props.highlightRanges) {
                    const decorations = this.props.highlightRanges.map((range) => {
                        return {
                            range,
                            options: {
                                inlineClassName: 'codeSearch__highlight',
                            },
                        };
                    });
                    this.currentHighlightDecorations = this.ed.deltaDecorations(this.currentHighlightDecorations, decorations);
                }
            }
        }
    }
    componentWillUnmount() {
        if (this.ed) {
            this.ed.dispose();
        }
    }
    render() {
        const linesCount = this.props.code.split('\n').length;
        return (react_1.default.createElement(eui_1.EuiPanel, { style: { marginBottom: '2rem' }, paddingSize: "s" },
            this.props.fileComponent,
            react_1.default.createElement("div", { ref: r => (this.el = r), style: { height: linesCount * 18 } })));
    }
}
exports.CodeBlock = CodeBlock;
