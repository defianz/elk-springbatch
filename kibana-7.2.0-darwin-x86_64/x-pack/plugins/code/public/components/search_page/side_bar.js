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
const repository_utils_1 = require("../../../common/repository_utils");
const scope_tabs_1 = require("./scope_tabs");
class SideBar extends react_1.default.PureComponent {
    render() {
        const { languages, langFacets, repoFacets, repositories } = this.props;
        const repoStatsComp = repoFacets.map((item, index) => {
            if (!!repositories && repositories.has(item.name)) {
                return (react_1.default.createElement(eui_1.EuiFacetButton, { className: "codeFilter__item", key: `repostats${index}`, onClick: this.props.onRepositoryFilterToggled(item.name), quantity: item.value, isSelected: true, buttonRef: () => {
                        /* nothing */
                    } }, repository_utils_1.RepositoryUtils.repoNameFromUri(item.name)));
            }
            else {
                return (react_1.default.createElement(eui_1.EuiFacetButton, { className: "codeFilter__item", key: `repostats${index}`, onClick: this.props.onRepositoryFilterToggled(item.name), quantity: item.value, buttonRef: () => {
                        /* nothing */
                    } }, repository_utils_1.RepositoryUtils.repoNameFromUri(item.name)));
            }
        });
        const langStatsComp = langFacets.map((item, index) => {
            if (languages && languages.has(item.name)) {
                return (react_1.default.createElement(eui_1.EuiFacetButton, { className: "codeFilter__item", key: `langstats${index}`, onClick: this.props.onLanguageFilterToggled(item.name), quantity: item.value, isSelected: true, "data-test-subj": "codeSearchLanguageFilterItem", buttonRef: () => {
                        /* nothing */
                    } }, item.name));
            }
            else {
                return (react_1.default.createElement(eui_1.EuiFacetButton, { className: "codeFilter__item", key: `langstats${index}`, onClick: this.props.onLanguageFilterToggled(item.name), quantity: item.value, "data-test-subj": "codeSearchLanguageFilterItem", buttonRef: () => {
                        /* nothing */
                    } }, item.name));
            }
        });
        return (react_1.default.createElement("div", { className: "codeSidebar__container" },
            react_1.default.createElement(scope_tabs_1.ScopeTabs, { query: this.props.query, scope: this.props.scope }),
            react_1.default.createElement("div", { className: "codeFilter__group" },
                react_1.default.createElement(eui_1.EuiFlexGroup, { className: "codeFilter__title", gutterSize: "s", alignItems: "center", style: { marginBottom: '.5rem' } },
                    react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                        react_1.default.createElement(eui_1.EuiToken, { iconType: "tokenRepo" })),
                    react_1.default.createElement(eui_1.EuiFlexItem, null,
                        react_1.default.createElement(eui_1.EuiTitle, { size: "xxs" },
                            react_1.default.createElement("h3", null, "Repositories")))),
                react_1.default.createElement(eui_1.EuiFacetGroup, null, repoStatsComp),
                react_1.default.createElement(eui_1.EuiSpacer, null),
                react_1.default.createElement(eui_1.EuiFlexGroup, { className: "codeFilter__title", gutterSize: "s", alignItems: "center", style: { marginBottom: '.5rem' } },
                    react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                        react_1.default.createElement(eui_1.EuiToken, { iconType: "tokenElement", displayOptions: { color: 'tokenTint07', shape: 'rectangle', fill: true } })),
                    react_1.default.createElement(eui_1.EuiFlexItem, null,
                        react_1.default.createElement(eui_1.EuiTitle, { size: "xxs" },
                            react_1.default.createElement("h3", null, "Languages")))),
                react_1.default.createElement(eui_1.EuiFacetGroup, { "data-test-subj": "codeSearchLanguageFilterList" }, langStatsComp))));
    }
}
exports.SideBar = SideBar;
