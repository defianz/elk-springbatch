"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = tslib_1.__importStar(require("react"));
const model_1 = require("../../../../model");
const types_1 = require("../../../common/types");
const variables_1 = require("../../../style/variables");
class ScopeSelector extends react_1.Component {
    constructor() {
        super(...arguments);
        this.scopeOptions = [
            {
                value: model_1.SearchScope.DEFAULT,
                inputDisplay: (react_1.default.createElement("div", null,
                    react_1.default.createElement(eui_1.EuiText, { size: "s" },
                        react_1.default.createElement(eui_1.EuiIcon, { type: "bullseye" }),
                        " ",
                        types_1.SearchScopeText[model_1.SearchScope.DEFAULT]))),
            },
            {
                value: model_1.SearchScope.SYMBOL,
                inputDisplay: (react_1.default.createElement(eui_1.EuiText, { size: "s" },
                    react_1.default.createElement(eui_1.EuiIcon, { type: "crosshairs" }),
                    " ",
                    types_1.SearchScopeText[model_1.SearchScope.SYMBOL])),
            },
            {
                value: model_1.SearchScope.REPOSITORY,
                inputDisplay: (react_1.default.createElement(eui_1.EuiText, { size: "s" },
                    react_1.default.createElement(eui_1.EuiIcon, { type: "branch" }),
                    " ",
                    types_1.SearchScopeText[model_1.SearchScope.REPOSITORY])),
            },
            {
                value: model_1.SearchScope.FILE,
                inputDisplay: (react_1.default.createElement(eui_1.EuiText, { size: "s" },
                    react_1.default.createElement(eui_1.EuiIcon, { type: "document" }),
                    " ",
                    types_1.SearchScopeText[model_1.SearchScope.FILE])),
            },
        ];
    }
    render() {
        return (react_1.default.createElement(eui_1.EuiSuperSelect, { style: { width: variables_1.pxToRem(200) }, options: this.scopeOptions, valueOfSelected: this.props.scope, onChange: this.props.onScopeChanged }));
    }
}
exports.ScopeSelector = ScopeSelector;
