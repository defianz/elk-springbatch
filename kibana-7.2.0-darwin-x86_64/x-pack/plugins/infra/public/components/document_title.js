"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const wrapWithSharedState = () => {
    const titles = [];
    const TITLE_SUFFIX = ' - Kibana';
    return class extends react_1.default.Component {
        componentDidMount() {
            this.setState(() => {
                return { index: titles.push('') - 1 };
            }, () => {
                this.pushTitle(this.getTitle(this.props.title));
                this.updateDocumentTitle();
            });
        }
        componentDidUpdate() {
            this.pushTitle(this.getTitle(this.props.title));
            this.updateDocumentTitle();
        }
        componentWillUnmount() {
            this.removeTitle();
            this.updateDocumentTitle();
        }
        render() {
            return null;
        }
        getTitle(title) {
            return typeof title === 'function' ? title(titles[this.state.index - 1]) : title;
        }
        pushTitle(title) {
            titles[this.state.index] = title;
        }
        removeTitle() {
            titles.pop();
        }
        updateDocumentTitle() {
            const title = (titles[titles.length - 1] || '') + TITLE_SUFFIX;
            if (title !== document.title) {
                document.title = title;
            }
        }
    };
};
exports.DocumentTitle = wrapWithSharedState();
