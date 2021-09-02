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
const styled_components_1 = tslib_1.__importStar(require("styled-components"));
const helpers_1 = require("./helpers");
const i18n = tslib_1.__importStar(require("./translations"));
const EDIT_DATA_PROVIDER_WIDTH = 400;
const FIELD_COMBO_BOX_WIDTH = 195;
const OPERATOR_COMBO_BOX_WIDTH = 160;
const VALUE_INPUT_CLASS_NAME = 'edit-data-provider-value';
const SAVE_CLASS_NAME = 'edit-data-provider-save';
exports.HeaderContainer = styled_components_1.default.div `
  width: ${EDIT_DATA_PROVIDER_WIDTH};
`;
// SIDE EFFECT: the following `injectGlobal` overrides the default styling
// of euiComboBoxOptionsList because it's implemented as a popover, so it's
// not selectable as a child of the styled component
// eslint-disable-next-line no-unused-expressions
styled_components_1.injectGlobal `
  .euiComboBoxOptionsList {
    z-index: 9999;
  }
`;
exports.FieldComboBox = styled_components_1.default(eui_1.EuiComboBox) `
  width: ${FIELD_COMBO_BOX_WIDTH}px;
`;
exports.OperatorComboBox = styled_components_1.default(eui_1.EuiComboBox) `
  width: ${OPERATOR_COMBO_BOX_WIDTH}px;
`;
const sanatizeValue = (value) => Array.isArray(value) ? `${value[0]}` : `${value}`; // fun fact: value should never be an array
exports.getInitialOperatorLabel = (isExcluded, operator) => {
    if (operator === ':') {
        return isExcluded ? [{ label: i18n.IS_NOT }] : [{ label: i18n.IS }];
    }
    else {
        return isExcluded ? [{ label: i18n.DOES_NOT_EXIST }] : [{ label: i18n.EXISTS }];
    }
};
class StatefulEditDataProvider extends React.PureComponent {
    constructor(props) {
        super(props);
        /** Focuses the Value input if it is visible, falling back to the Save button if it's not */
        this.focusInput = () => {
            const elements = document.getElementsByClassName(VALUE_INPUT_CLASS_NAME);
            if (elements.length > 0) {
                elements[0].focus(); // this cast is required because focus() does not exist on every `Element` returned by `getElementsByClassName`
            }
            else {
                const saveElements = document.getElementsByClassName(SAVE_CLASS_NAME);
                if (saveElements.length > 0) {
                    saveElements[0].focus();
                }
            }
        };
        this.onFieldSelected = (selectedField) => {
            this.setState({ updatedField: selectedField });
            this.focusInput();
        };
        this.onOperatorSelected = (updatedOperator) => {
            this.setState({ updatedOperator });
            this.focusInput();
        };
        this.onValueChange = (e) => {
            this.setState({
                updatedValue: e.target.value,
            });
        };
        this.disableScrolling = () => {
            const x = window.pageXOffset !== undefined
                ? window.pageXOffset
                : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
            const y = window.pageYOffset !== undefined
                ? window.pageYOffset
                : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            window.onscroll = () => window.scrollTo(x, y);
        };
        this.enableScrolling = () => (window.onscroll = () => fp_1.noop);
        const { field, isExcluded, operator, value } = props;
        this.state = {
            updatedField: [{ label: field }],
            updatedOperator: exports.getInitialOperatorLabel(isExcluded, operator),
            updatedValue: value,
        };
    }
    componentDidMount() {
        this.disableScrolling();
        this.focusInput();
    }
    componentWillUnmount() {
        this.enableScrolling();
    }
    render() {
        const { andProviderId, browserFields, onDataProviderEdited, providerId, timelineId, } = this.props;
        const { updatedField, updatedOperator, updatedValue } = this.state;
        return (React.createElement(eui_1.EuiPanel, { paddingSize: "s" },
            React.createElement(eui_1.EuiFlexGroup, { direction: "column", gutterSize: "none" },
                React.createElement(eui_1.EuiFlexItem, { grow: false },
                    React.createElement(eui_1.EuiFlexGroup, { direction: "row", gutterSize: "none", justifyContent: "spaceBetween" },
                        React.createElement(eui_1.EuiFlexItem, { grow: false },
                            React.createElement(eui_1.EuiFormRow, { label: i18n.FIELD },
                                React.createElement(eui_1.EuiToolTip, { content: this.state.updatedField.length > 0 ? this.state.updatedField[0].label : null },
                                    React.createElement(exports.FieldComboBox, { isClearable: false, onChange: this.onFieldSelected, options: helpers_1.getCategorizedFieldNames(browserFields), placeholder: i18n.FIELD_PLACEHOLDER, selectedOptions: this.state.updatedField, singleSelection: { asPlainText: true } })))),
                        React.createElement(eui_1.EuiFlexItem, { grow: false },
                            React.createElement(eui_1.EuiFormRow, { label: i18n.OPERATOR },
                                React.createElement(exports.OperatorComboBox, { isClearable: false, onChange: this.onOperatorSelected, options: helpers_1.operatorLabels, placeholder: i18n.SELECT_AN_OPERATOR, selectedOptions: this.state.updatedOperator, singleSelection: { asPlainText: true } }))))),
                React.createElement(eui_1.EuiFlexItem, { grow: false },
                    React.createElement(eui_1.EuiSpacer, null)),
                this.state.updatedOperator.length > 0 &&
                    this.state.updatedOperator[0].label !== i18n.EXISTS &&
                    this.state.updatedOperator[0].label !== i18n.DOES_NOT_EXIST ? (React.createElement(eui_1.EuiFlexItem, { grow: false },
                    React.createElement(eui_1.EuiFormRow, { label: i18n.VALUE_LABEL },
                        React.createElement(eui_1.EuiFieldText, { className: VALUE_INPUT_CLASS_NAME, placeholder: i18n.VALUE, onChange: this.onValueChange, value: sanatizeValue(this.state.updatedValue) })))) : null,
                React.createElement(eui_1.EuiFlexItem, { grow: false },
                    React.createElement(eui_1.EuiSpacer, null)),
                React.createElement(eui_1.EuiFlexItem, { grow: false },
                    React.createElement(eui_1.EuiFlexGroup, { justifyContent: "flexEnd", gutterSize: "none" },
                        React.createElement(eui_1.EuiFlexItem, { grow: false },
                            React.createElement(eui_1.EuiButton, { autoFocus: true, className: SAVE_CLASS_NAME, color: "primary", "data-test-subj": "save", fill: true, onClick: () => {
                                    onDataProviderEdited({
                                        andProviderId,
                                        excluded: helpers_1.getExcludedFromSelection(updatedOperator),
                                        field: updatedField.length > 0 ? updatedField[0].label : '',
                                        id: timelineId,
                                        operator: helpers_1.getQueryOperatorFromSelection(updatedOperator),
                                        providerId,
                                        value: updatedValue,
                                    });
                                }, isDisabled: !helpers_1.selectionsAreValid({
                                    browserFields: this.props.browserFields,
                                    selectedField: updatedField,
                                    selectedOperator: updatedOperator,
                                }), size: "s" }, i18n.SAVE)))))));
    }
}
exports.StatefulEditDataProvider = StatefulEditDataProvider;
