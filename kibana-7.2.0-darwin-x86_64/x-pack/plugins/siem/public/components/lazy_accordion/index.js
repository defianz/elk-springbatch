"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const React = tslib_1.__importStar(require("react"));
/**
 * An accordion that doesn't render it's content unless it's expanded.
 * This component was created because `EuiAccordion`'s eager rendering of
 * accordion content was creating performance issues when used in repeating
 * content on the page.
 *
 * The current implementation actually renders the content *outside* of the
 * actual EuiAccordion when the accordion is expanded! It does this because
 * EuiAccordian applies a `translate` style to the content that causes
 * any draggable content (inside `EuiAccordian`) to have a `translate` style
 * that messes up rendering while the user drags it.
 *
 * TODO: animate the expansion and collapse of content rendered "below"
 * the real `EuiAccordion`.
 */
class LazyAccordion extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onCollapsedClick = () => {
            const { onExpand } = this.props;
            this.setState({ expanded: true });
            if (onExpand != null) {
                onExpand();
            }
        };
        this.onExpandedClick = () => {
            const { onCollapse } = this.props;
            this.setState({ expanded: false });
            if (onCollapse != null) {
                onCollapse();
            }
        };
        this.state = {
            expanded: false,
        };
    }
    render() {
        const { id, buttonContentClassName, buttonContent, forceExpand, extraAction, renderExpandedContent, paddingSize, } = this.props;
        return (React.createElement(React.Fragment, null, forceExpand || this.state.expanded ? (React.createElement(React.Fragment, null,
            React.createElement(eui_1.EuiAccordion, { buttonContent: buttonContent, buttonContentClassName: buttonContentClassName, "data-test-subj": "lazy-accordion-expanded", extraAction: extraAction, id: id, initialIsOpen: true, onClick: this.onExpandedClick, paddingSize: paddingSize },
                React.createElement(React.Fragment, null)),
            renderExpandedContent(this.state.expanded))) : (React.createElement(eui_1.EuiAccordion, { buttonContent: buttonContent, buttonContentClassName: buttonContentClassName, "data-test-subj": "lazy-accordion-placeholder", extraAction: extraAction, id: id, onClick: this.onCollapsedClick, paddingSize: paddingSize }))));
    }
}
exports.LazyAccordion = LazyAccordion;
