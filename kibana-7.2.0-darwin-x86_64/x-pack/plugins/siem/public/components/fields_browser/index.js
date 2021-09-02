"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_redux_1 = require("react-redux");
const eui_1 = require("@elastic/eui");
const fp_1 = require("lodash/fp");
const React = tslib_1.__importStar(require("react"));
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const default_headers_1 = require("../timeline/body/column_headers/default_headers");
const field_browser_1 = require("./field_browser");
const helpers_1 = require("./helpers");
const i18n = tslib_1.__importStar(require("./translations"));
const actions_1 = require("../../store/actions");
/** wait this many ms after the user completes typing before applying the filter input */
const INPUT_TIMEOUT = 250;
const FieldsBrowserButtonContainer = styled_components_1.default.div `
  button {
    border-color: ${({ theme }) => theme.eui.euiColorLightShade};
    color: ${({ theme }) => theme.eui.euiColorDarkestShade};
    font-size: 14px;
    margin: 1px 5px 2px 0;
  }
`;
/**
 * Manages the state of the field browser
 */
class StatefulFieldsBrowserComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        /** tracks the latest timeout id from `setTimeout`*/
        this.inputTimeoutId = 0;
        /** Shows / hides the field browser */
        this.toggleShow = () => {
            this.setState(({ show }) => ({
                show: !show,
            }));
        };
        this.toggleColumn = (column) => {
            const { columnHeaders, removeColumn, timelineId, upsertColumn } = this.props;
            const exists = columnHeaders.findIndex(c => c.id === column.id) !== -1;
            if (!exists && upsertColumn != null) {
                upsertColumn({
                    column,
                    id: timelineId,
                    index: 1,
                });
            }
            if (exists && removeColumn != null) {
                removeColumn({
                    columnId: column.id,
                    id: timelineId,
                });
            }
        };
        /** Invoked when the user types in the filter input */
        this.updateFilter = (filterInput) => {
            this.setState({
                filterInput,
                isSearching: true,
            });
            if (this.inputTimeoutId !== 0) {
                clearTimeout(this.inputTimeoutId); // ⚠️ mutation: cancel any previous timers
            }
            // ⚠️ mutation: schedule a new timer that will apply the filter when it fires:
            this.inputTimeoutId = window.setTimeout(() => {
                const filteredBrowserFields = helpers_1.filterBrowserFieldsByFieldName({
                    browserFields: helpers_1.mergeBrowserFieldsWithDefaultCategory(this.props.browserFields),
                    substring: this.state.filterInput,
                });
                this.setState(currentState => ({
                    filteredBrowserFields,
                    isSearching: false,
                    selectedCategoryId: currentState.filterInput === '' || Object.keys(filteredBrowserFields).length === 0
                        ? default_headers_1.DEFAULT_CATEGORY_NAME
                        : Object.keys(filteredBrowserFields)
                            .sort()
                            .reduce((selected, category) => filteredBrowserFields[category].fields != null &&
                            filteredBrowserFields[selected].fields != null &&
                            filteredBrowserFields[category].fields.length >
                                filteredBrowserFields[selected].fields.length
                            ? category
                            : selected, Object.keys(filteredBrowserFields)[0]),
                }));
            }, INPUT_TIMEOUT);
        };
        /**
         * Invoked when the user clicks a category name in the left-hand side of
         * the field browser
         */
        this.updateSelectedCategoryId = (categoryId) => {
            this.setState({
                selectedCategoryId: categoryId,
            });
        };
        /**
         * Invoked when the user clicks on the context menu to view a category's
         * columns in the timeline, this function dispatches the action that
         * causes the timeline display those columns.
         */
        this.updateColumnsAndSelectCategoryId = (columns) => {
            this.props.onUpdateColumns(columns); // show the category columns in the timeline
        };
        /** Invoked when the field browser should be hidden */
        this.hideFieldBrowser = () => {
            this.setState({
                filterInput: '',
                filteredBrowserFields: null,
                isSearching: false,
                selectedCategoryId: default_headers_1.DEFAULT_CATEGORY_NAME,
                show: false,
            });
        };
        this.state = {
            filterInput: '',
            filteredBrowserFields: null,
            isSearching: false,
            selectedCategoryId: default_headers_1.DEFAULT_CATEGORY_NAME,
            show: false,
        };
    }
    componentWillUnmount() {
        if (this.inputTimeoutId !== 0) {
            // ⚠️ mutation: cancel any remaining timers and zero-out the timer id:
            clearTimeout(this.inputTimeoutId);
            this.inputTimeoutId = 0;
        }
    }
    render() {
        const { columnHeaders, browserFields, height, isLoading, onFieldSelected, timelineId, width, } = this.props;
        const { filterInput, filteredBrowserFields, isSearching, selectedCategoryId, show, } = this.state;
        // only merge in the default category if the field browser is visible
        const browserFieldsWithDefaultCategory = show
            ? helpers_1.mergeBrowserFieldsWithDefaultCategory(browserFields)
            : {};
        return (React.createElement(React.Fragment, null,
            React.createElement(FieldsBrowserButtonContainer, null,
                React.createElement(eui_1.EuiToolTip, { content: i18n.CUSTOMIZE_COLUMNS },
                    React.createElement(eui_1.EuiButton, { color: "primary", "data-test-subj": "show-field-browser", iconSide: "right", iconType: "arrowDown", onClick: this.toggleShow, size: "s" }, i18n.FIELDS))),
            show && (React.createElement(field_browser_1.FieldsBrowser, { columnHeaders: columnHeaders, browserFields: browserFieldsWithDefaultCategory, filteredBrowserFields: filteredBrowserFields != null
                    ? filteredBrowserFields
                    : browserFieldsWithDefaultCategory, searchInput: filterInput, height: height, isLoading: isLoading, isSearching: isSearching, onCategorySelected: this.updateSelectedCategoryId, onFieldSelected: onFieldSelected, onHideFieldBrowser: this.hideFieldBrowser, onOutsideClick: show ? this.hideFieldBrowser : fp_1.noop, onUpdateColumns: this.updateColumnsAndSelectCategoryId, onSearchInputChange: this.updateFilter, selectedCategoryId: selectedCategoryId, timelineId: timelineId, toggleColumn: this.toggleColumn, width: width }))));
    }
}
exports.StatefulFieldsBrowserComponent = StatefulFieldsBrowserComponent;
exports.StatefulFieldsBrowser = react_redux_1.connect(null, {
    removeColumn: actions_1.timelineActions.removeColumn,
    upsertColumn: actions_1.timelineActions.upsertColumn,
})(StatefulFieldsBrowserComponent);
