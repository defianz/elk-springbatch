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
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../common/eui_styled_components"));
const typed_react_1 = require("../../utils/typed_react");
const suggestion_item_1 = require("./suggestion_item");
class AutocompleteField extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = {
            areSuggestionsVisible: false,
            isFocused: false,
            selectedIndex: null,
        };
        this.inputElement = null;
        this.handleChangeInputRef = (element) => {
            this.inputElement = element;
        };
        this.handleChange = (evt) => {
            this.changeValue(evt.currentTarget.value);
        };
        this.handleKeyDown = (evt) => {
            const { suggestions } = this.props;
            switch (evt.key) {
                case 'ArrowUp':
                    evt.preventDefault();
                    if (suggestions.length > 0) {
                        this.setState(typed_react_1.composeStateUpdaters(withSuggestionsVisible, withPreviousSuggestionSelected));
                    }
                    break;
                case 'ArrowDown':
                    evt.preventDefault();
                    if (suggestions.length > 0) {
                        this.setState(typed_react_1.composeStateUpdaters(withSuggestionsVisible, withNextSuggestionSelected));
                    }
                    else {
                        this.updateSuggestions();
                    }
                    break;
                case 'Enter':
                    evt.preventDefault();
                    if (this.state.selectedIndex !== null) {
                        this.applySelectedSuggestion();
                    }
                    else {
                        this.submit();
                    }
                    break;
                case 'Escape':
                    evt.preventDefault();
                    this.setState(withSuggestionsHidden);
                    break;
            }
        };
        this.handleKeyUp = (evt) => {
            switch (evt.key) {
                case 'ArrowLeft':
                case 'ArrowRight':
                case 'Home':
                case 'End':
                    this.updateSuggestions();
                    break;
            }
        };
        this.handleFocus = () => {
            this.setState(typed_react_1.composeStateUpdaters(withSuggestionsVisible, withFocused));
        };
        this.handleBlur = () => {
            this.setState(typed_react_1.composeStateUpdaters(withSuggestionsHidden, withUnfocused));
        };
        this.selectSuggestionAt = (index) => () => {
            this.setState(withSuggestionAtIndexSelected(index));
        };
        this.applySelectedSuggestion = () => {
            if (this.state.selectedIndex !== null) {
                this.applySuggestionAt(this.state.selectedIndex)();
            }
        };
        this.applySuggestionAt = (index) => () => {
            const { value, suggestions } = this.props;
            const selectedSuggestion = suggestions[index];
            if (!selectedSuggestion) {
                return;
            }
            const newValue = value.substr(0, selectedSuggestion.start) +
                selectedSuggestion.text +
                value.substr(selectedSuggestion.end);
            this.setState(withSuggestionsHidden);
            this.changeValue(newValue);
            this.focusInputElement();
        };
        this.changeValue = (value) => {
            const { onChange } = this.props;
            if (onChange) {
                onChange(value);
            }
        };
        this.focusInputElement = () => {
            if (this.inputElement) {
                this.inputElement.focus();
            }
        };
        this.showSuggestions = () => {
            this.setState(withSuggestionsVisible);
        };
        this.submit = () => {
            const { isValid, onSubmit, value } = this.props;
            if (isValid && onSubmit) {
                onSubmit(value);
            }
            this.setState(withSuggestionsHidden);
        };
        this.updateSuggestions = () => {
            const inputCursorPosition = this.inputElement ? this.inputElement.selectionStart || 0 : 0;
            this.props.loadSuggestions(this.props.value, inputCursorPosition, 200);
        };
    }
    render() {
        const { suggestions, isLoadingSuggestions, isValid, placeholder, value } = this.props;
        const { areSuggestionsVisible, selectedIndex } = this.state;
        return (react_1.default.createElement(eui_1.EuiOutsideClickDetector, { onOutsideClick: this.handleBlur },
            react_1.default.createElement(AutocompleteContainer, null,
                react_1.default.createElement(FixedEuiFieldSearch, { fullWidth: true, inputRef: this.handleChangeInputRef, isLoading: isLoadingSuggestions, isInvalid: !isValid, onChange: this.handleChange, onFocus: this.handleFocus, onKeyDown: this.handleKeyDown, onKeyUp: this.handleKeyUp, onSearch: this.submit, placeholder: placeholder, value: value }),
                areSuggestionsVisible && !isLoadingSuggestions && suggestions.length > 0 ? (react_1.default.createElement(SuggestionsPanel, null, suggestions.map((suggestion, suggestionIndex) => (react_1.default.createElement(suggestion_item_1.SuggestionItem, { key: suggestion.text, suggestion: suggestion, isSelected: suggestionIndex === selectedIndex, onMouseEnter: this.selectSuggestionAt(suggestionIndex), onClick: this.applySuggestionAt(suggestionIndex) }))))) : null)));
    }
    componentDidMount() {
        if (this.inputElement && this.props.autoFocus) {
            this.inputElement.focus();
        }
    }
    componentDidUpdate(prevProps, prevState) {
        const hasNewValue = prevProps.value !== this.props.value;
        const hasNewSuggestions = prevProps.suggestions !== this.props.suggestions;
        if (hasNewValue) {
            this.updateSuggestions();
        }
        if (hasNewSuggestions && this.state.isFocused) {
            this.showSuggestions();
        }
    }
}
exports.AutocompleteField = AutocompleteField;
const withPreviousSuggestionSelected = (state, props) => ({
    ...state,
    selectedIndex: props.suggestions.length === 0
        ? null
        : state.selectedIndex !== null
            ? (state.selectedIndex + props.suggestions.length - 1) % props.suggestions.length
            : Math.max(props.suggestions.length - 1, 0),
});
const withNextSuggestionSelected = (state, props) => ({
    ...state,
    selectedIndex: props.suggestions.length === 0
        ? null
        : state.selectedIndex !== null
            ? (state.selectedIndex + 1) % props.suggestions.length
            : 0,
});
const withSuggestionAtIndexSelected = (suggestionIndex) => (state, props) => ({
    ...state,
    selectedIndex: props.suggestions.length === 0
        ? null
        : suggestionIndex >= 0 && suggestionIndex < props.suggestions.length
            ? suggestionIndex
            : 0,
});
const withSuggestionsVisible = (state) => ({
    ...state,
    areSuggestionsVisible: true,
});
const withSuggestionsHidden = (state) => ({
    ...state,
    areSuggestionsVisible: false,
    selectedIndex: null,
});
const withFocused = (state) => ({
    ...state,
    isFocused: true,
});
const withUnfocused = (state) => ({
    ...state,
    isFocused: false,
});
const FixedEuiFieldSearch = eui_1.EuiFieldSearch;
const AutocompleteContainer = eui_styled_components_1.default.div `
  position: relative;
`;
const SuggestionsPanel = eui_styled_components_1.default(eui_1.EuiPanel).attrs({
    paddingSize: 'none',
    hasShadow: true,
}) `
  position: absolute;
  width: 100%;
  margin-top: 2px;
  overflow-x: hidden;
  overflow-y: scroll;
  z-index: ${props => props.theme.eui.euiZLevel1};
  max-height: 322px;
`;
