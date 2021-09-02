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
exports.SuggestionComponent = props => {
    const click = () => props.onClick(props.suggestion);
    // An util function to help highlight the substring which matches the query.
    const renderMatchingText = (text) => {
        // Match the text with query in case sensitive mode first.
        let index = text.indexOf(props.query);
        if (index < 0) {
            // Fall back with case insensitive mode first.
            index = text.toLowerCase().indexOf(props.query.toLowerCase());
        }
        if (index >= 0) {
            const prefix = text.substring(0, index);
            const highlight = text.substring(index, index + props.query.length);
            const surfix = text.substring(index + props.query.length);
            return (react_1.default.createElement("span", null,
                prefix,
                react_1.default.createElement("strong", null, highlight),
                surfix));
        }
        else {
            return text;
        }
    };
    const icon = props.suggestion.tokenType ? (react_1.default.createElement("div", { className: "codeSearch-suggestion__token" },
        react_1.default.createElement(eui_1.EuiToken, { iconType: props.suggestion.tokenType }))) : null;
    return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus
    react_1.default.createElement("div", { className: 'codeSearch__suggestion-item ' +
            (props.selected ? 'codeSearch__suggestion-item--active' : ''), role: "option", onClick: click, 
        // active={props.selected}
        onMouseEnter: props.onMouseEnter, ref: props.innerRef, id: props.ariaId, "aria-selected": props.selected },
        react_1.default.createElement("div", { className: "codeSearch-suggestion--inner" },
            icon,
            react_1.default.createElement("div", null,
                react_1.default.createElement("div", { className: "codeSearch__suggestion-text", "data-test-subj": `codeTypeaheadItem` }, renderMatchingText(props.suggestion.text)),
                react_1.default.createElement("div", { className: "codeSearch-suggestion__description" }, props.suggestion.description)))));
};
