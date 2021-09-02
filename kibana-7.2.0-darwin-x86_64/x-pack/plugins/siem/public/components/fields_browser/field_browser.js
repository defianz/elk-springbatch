"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fp_1 = require("lodash/fp");
const eui_1 = require("@elastic/eui");
const React = tslib_1.__importStar(require("react"));
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const helpers_1 = require("./helpers");
const header_1 = require("./header");
const categories_pane_1 = require("./categories_pane");
const fields_pane_1 = require("./fields_pane");
const TOP_OFFSET = 207;
const FieldsBrowserContainer = styled_components_1.default.div `
  background-color: ${props => props.theme.eui.euiColorLightestShade};
  border: 1px solid ${({ theme }) => theme.eui.euiColorMediumShade};
  border-radius: 4px;
  padding: 8px 8px 16px 8px;
  position: absolute;
  ${({ top }) => `top: ${top}px`};
  ${({ width }) => `width: ${width}px`};
  z-index: 9990;
`;
const PanesFlexGroup = styled_components_1.default(eui_1.EuiFlexGroup) `
  width: ${helpers_1.PANES_FLEX_GROUP_WIDTH}px;
`;
/**
 * This component has no internal state, but it uses lifecycle methods to
 * set focus to the search input, scroll to the selected category, etc
 */
class FieldsBrowser extends React.PureComponent {
    constructor() {
        super(...arguments);
        /** Focuses the input that filters the field browser */
        this.focusInput = () => {
            const elements = document.getElementsByClassName(helpers_1.getFieldBrowserSearchInputClassName(this.props.timelineId));
            if (elements.length > 0) {
                elements[0].focus(); // this cast is required because focus() does not exist on every `Element` returned by `getElementsByClassName`
            }
        };
        /** Invoked when the user types in the input to filter the field browser */
        this.onInputChange = (event) => this.props.onSearchInputChange(event.target.value);
        this.selectFieldAndHide = (fieldId) => {
            const { onFieldSelected, onHideFieldBrowser } = this.props;
            if (onFieldSelected != null) {
                onFieldSelected(fieldId);
            }
            onHideFieldBrowser();
        };
        this.scrollViews = () => {
            const { selectedCategoryId, timelineId } = this.props;
            if (this.props.selectedCategoryId !== '') {
                const categoryPaneTitles = document.getElementsByClassName(helpers_1.getCategoryPaneCategoryClassName({
                    categoryId: selectedCategoryId,
                    timelineId,
                }));
                if (categoryPaneTitles.length > 0) {
                    categoryPaneTitles[0].scrollIntoView();
                }
                const fieldPaneTitles = document.getElementsByClassName(helpers_1.getFieldBrowserCategoryTitleClassName({
                    categoryId: selectedCategoryId,
                    timelineId,
                }));
                if (fieldPaneTitles.length > 0) {
                    fieldPaneTitles[0].scrollIntoView();
                }
            }
            this.focusInput(); // always re-focus the input to enable additional filtering
        };
    }
    componentDidMount() {
        this.scrollViews();
        this.focusInput();
    }
    componentDidUpdate() {
        this.scrollViews();
        this.focusInput(); // always re-focus the input to enable additional filtering
    }
    render() {
        const { columnHeaders, browserFields, filteredBrowserFields, searchInput, isLoading, isSearching, onCategorySelected, onFieldSelected, onOutsideClick, onUpdateColumns, selectedCategoryId, timelineId, toggleColumn, width, } = this.props;
        return (React.createElement(eui_1.EuiOutsideClickDetector, { "data-test-subj": "outside-click-detector", onOutsideClick: onFieldSelected != null ? fp_1.noop : onOutsideClick, isDisabled: false },
            React.createElement(FieldsBrowserContainer, { "data-test-subj": "fields-browser-container", top: TOP_OFFSET, width: width },
                React.createElement(header_1.Header, { filteredBrowserFields: filteredBrowserFields, isSearching: isSearching, onOutsideClick: onOutsideClick, onSearchInputChange: this.onInputChange, onUpdateColumns: onUpdateColumns, searchInput: searchInput, timelineId: timelineId }),
                React.createElement(PanesFlexGroup, { alignItems: "flexStart", gutterSize: "none", justifyContent: "spaceBetween" },
                    React.createElement(eui_1.EuiFlexItem, { grow: false },
                        React.createElement(categories_pane_1.CategoriesPane, { browserFields: browserFields, "data-test-subj": "left-categories-pane", filteredBrowserFields: filteredBrowserFields, width: helpers_1.CATEGORY_PANE_WIDTH, isLoading: isLoading, onCategorySelected: onCategorySelected, onUpdateColumns: onUpdateColumns, selectedCategoryId: selectedCategoryId, timelineId: timelineId })),
                    React.createElement(eui_1.EuiFlexItem, { grow: false },
                        React.createElement(fields_pane_1.FieldsPane, { columnHeaders: columnHeaders, "data-test-subj": "fields-pane", filteredBrowserFields: filteredBrowserFields, isLoading: isLoading, onCategorySelected: onCategorySelected, onFieldSelected: this.selectFieldAndHide, onUpdateColumns: onUpdateColumns, searchInput: searchInput, selectedCategoryId: selectedCategoryId, timelineId: timelineId, toggleColumn: toggleColumn, width: helpers_1.FIELDS_PANE_WIDTH }))))));
    }
}
exports.FieldsBrowser = FieldsBrowser;
