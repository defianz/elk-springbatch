"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
const react_2 = tslib_1.__importStar(require("react"));
const constants_1 = require("../../../common/constants");
const space_cards_1 = require("../components/space_cards");
class SpaceSelectorUI extends react_2.Component {
    constructor(props) {
        super(props);
        this.setHeaderRef = (ref) => {
            this.headerRef = ref;
            // forcing focus of header for screen readers to announce on page load
            if (this.headerRef) {
                this.headerRef.focus();
            }
        };
        this.getSearchField = () => {
            const { intl } = this.props;
            if (!this.props.spaces || this.props.spaces.length < constants_1.SPACE_SEARCH_COUNT_THRESHOLD) {
                return null;
            }
            return (react_2.default.createElement(eui_1.EuiFlexItem, { className: "spcSpaceSelector__searchHolder" }, 
            // @ts-ignore onSearch doesn't exist on EuiFieldSearch
            react_2.default.createElement(eui_1.EuiFieldSearch, { className: "spcSpaceSelector__searchField", placeholder: intl.formatMessage({
                    id: 'xpack.spaces.spaceSelector.findSpacePlaceholder',
                    defaultMessage: 'Find a space',
                }), incremental: true, onSearch: this.onSearch })));
        };
        this.onSearch = (searchTerm = '') => {
            this.setState({
                searchTerm: searchTerm.trim().toLowerCase(),
            });
        };
        this.onSelectSpace = (space) => {
            this.props.spacesManager.changeSelectedSpace(space);
        };
        const state = {
            loading: false,
            searchTerm: '',
            spaces: [],
        };
        if (Array.isArray(props.spaces)) {
            state.spaces = [...props.spaces];
        }
        this.state = state;
    }
    componentDidMount() {
        if (this.state.spaces.length === 0) {
            this.loadSpaces();
        }
    }
    loadSpaces() {
        this.setState({ loading: true });
        const { spacesManager } = this.props;
        spacesManager.getSpaces().then(spaces => {
            this.setState({
                loading: false,
                spaces,
            });
        });
    }
    render() {
        const { spaces, searchTerm } = this.state;
        let filteredSpaces = spaces;
        if (searchTerm) {
            filteredSpaces = spaces.filter(space => space.name.toLowerCase().indexOf(searchTerm) >= 0 ||
                (space.description || '').toLowerCase().indexOf(searchTerm) >= 0);
        }
        return (react_2.default.createElement(eui_1.EuiPage, { className: "spcSpaceSelector", "data-test-subj": "kibanaSpaceSelector" },
            react_2.default.createElement(eui_1.EuiPageBody, null,
                react_2.default.createElement(eui_1.EuiPageHeader, { className: "spcSpaceSelector__heading" },
                    react_2.default.createElement(eui_1.EuiSpacer, { size: "xxl" }),
                    react_2.default.createElement("span", { className: "spcSpaceSelector__logo" },
                        react_2.default.createElement(eui_1.EuiIcon, { size: "xxl", type: `logoKibana` })),
                    react_2.default.createElement(eui_1.EuiTitle, { size: "l" },
                        react_2.default.createElement("h1", { tabIndex: 0, ref: this.setHeaderRef },
                            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.spaces.spaceSelector.selectSpacesTitle", defaultMessage: "Select your space" }))),
                    react_2.default.createElement(eui_1.EuiText, { size: "s", color: "subdued" },
                        react_2.default.createElement("p", null,
                            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.spaces.spaceSelector.changeSpaceAnytimeAvailabilityText", defaultMessage: "You can change your space at anytime" })))),
                react_2.default.createElement(eui_1.EuiPageContent, { className: "spcSpaceSelector__pageContent" },
                    react_2.default.createElement(eui_1.EuiFlexGroup
                    // @ts-ignore
                    , { 
                        // @ts-ignore
                        direction: "column", alignItems: "center", responsive: false }, this.getSearchField()),
                    react_2.default.createElement(eui_1.EuiSpacer, { size: "xl" }),
                    react_2.default.createElement(space_cards_1.SpaceCards, { spaces: filteredSpaces, onSpaceSelect: this.onSelectSpace }),
                    filteredSpaces.length === 0 && (react_2.default.createElement(react_2.Fragment, null,
                        react_2.default.createElement(eui_1.EuiSpacer, null),
                        react_2.default.createElement(eui_1.EuiText, { color: "subdued", 
                            // @ts-ignore
                            textAlign: "center" },
                            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.spaces.spaceSelector.noSpacesMatchSearchCriteriaDescription", defaultMessage: "No spaces match search criteria" }))))))));
    }
}
exports.SpaceSelector = react_1.injectI18n(SpaceSelectorUI);
