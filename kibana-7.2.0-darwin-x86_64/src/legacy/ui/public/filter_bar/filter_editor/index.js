"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterEditor = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _lodash = require("lodash");

var _react2 = _interopRequireWildcard(require("react"));

var _generic_combo_box = require("./generic_combo_box");

var _filter_editor_utils = require("./lib/filter_editor_utils");

var _phrase_value_input = require("./phrase_value_input");

var _phrases_values_input = require("./phrases_values_input");

var _range_value_input = require("./range_value_input");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FilterEditorUI =
/*#__PURE__*/
function (_Component) {
  _inherits(FilterEditorUI, _Component);

  function FilterEditorUI(props) {
    var _this;

    _classCallCheck(this, FilterEditorUI);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FilterEditorUI).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "toggleCustomEditor", function () {
      var isCustomEditorOpen = !_this.state.isCustomEditorOpen;

      _this.setState({
        isCustomEditorOpen: isCustomEditorOpen
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onIndexPatternChange", function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          selectedIndexPattern = _ref2[0];

      var selectedField = undefined;
      var selectedOperator = undefined;
      var params = undefined;

      _this.setState({
        selectedIndexPattern: selectedIndexPattern,
        selectedField: selectedField,
        selectedOperator: selectedOperator,
        params: params
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onFieldChange", function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 1),
          selectedField = _ref4[0];

      var selectedOperator = undefined;
      var params = undefined;

      _this.setState({
        selectedField: selectedField,
        selectedOperator: selectedOperator,
        params: params
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onOperatorChange", function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 1),
          selectedOperator = _ref6[0];

      // Only reset params when the operator type changes
      var params = (0, _lodash.get)(_this.state.selectedOperator, 'type') === (0, _lodash.get)(selectedOperator, 'type') ? _this.state.params : undefined;

      _this.setState({
        selectedOperator: selectedOperator,
        params: params
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onCustomLabelSwitchChange", function (event) {
      var useCustomLabel = event.target.checked;
      var customLabel = event.target.checked ? '' : null;

      _this.setState({
        useCustomLabel: useCustomLabel,
        customLabel: customLabel
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onCustomLabelChange", function (event) {
      var customLabel = event.target.value;

      _this.setState({
        customLabel: customLabel
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onParamsChange", function (params) {
      _this.setState({
        params: params
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onQueryDslChange", function (queryDsl) {
      _this.setState({
        queryDsl: queryDsl
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSubmit", function () {
      var _this$state = _this.state,
          indexPattern = _this$state.selectedIndexPattern,
          field = _this$state.selectedField,
          operator = _this$state.selectedOperator,
          params = _this$state.params,
          useCustomLabel = _this$state.useCustomLabel,
          customLabel = _this$state.customLabel,
          isCustomEditorOpen = _this$state.isCustomEditorOpen,
          queryDsl = _this$state.queryDsl;
      var store = _this.props.filter.$state.store;
      var alias = useCustomLabel ? customLabel : null;

      if (isCustomEditorOpen) {
        var _this$props$filter$me = _this.props.filter.meta,
            index = _this$props$filter$me.index,
            disabled = _this$props$filter$me.disabled,
            negate = _this$props$filter$me.negate;
        var newIndex = index || _this.props.indexPatterns[0].id;
        var body = JSON.parse(queryDsl);

        var _filter = (0, _filter_editor_utils.buildCustomFilter)(newIndex, body, disabled, negate, alias, store);

        _this.props.onSubmit(_filter);
      } else if (indexPattern && field && operator) {
        var _filter2 = (0, _filter_editor_utils.buildFilter)(indexPattern, field, operator, params, alias, store);

        _this.props.onSubmit(_filter2);
      }
    });

    _this.state = {
      selectedIndexPattern: _this.getIndexPatternFromFilter(),
      selectedField: _this.getFieldFromFilter(),
      selectedOperator: _this.getSelectedOperator(),
      params: (0, _filter_editor_utils.getFilterParams)(props.filter),
      useCustomLabel: props.filter.meta.alias !== null,
      customLabel: props.filter.meta.alias,
      queryDsl: JSON.stringify((0, _filter_editor_utils.getQueryDslFromFilter)(props.filter), null, 2),
      isCustomEditorOpen: _this.isUnknownFilterType()
    };
    return _this;
  }

  _createClass(FilterEditorUI, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("div", null, _react2.default.createElement(_eui.EuiPopoverTitle, null, _react2.default.createElement(_eui.EuiFlexGroup, {
        alignItems: "baseline"
      }, _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_react.FormattedMessage, {
        id: "common.ui.filterEditor.editFilterPopupTitle",
        defaultMessage: "Edit filter"
      })), _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiButtonEmpty, {
        size: "xs",
        onClick: this.toggleCustomEditor
      }, this.state.isCustomEditorOpen ? _react2.default.createElement(_react.FormattedMessage, {
        id: "common.ui.filterEditor.editFilterValuesButtonLabel",
        defaultMessage: "Edit filter values"
      }) : _react2.default.createElement(_react.FormattedMessage, {
        id: "common.ui.filterEditor.editQueryDslButtonLabel",
        defaultMessage: "Edit as Query DSL"
      }))))), _react2.default.createElement("div", {
        className: "globalFilterItem__editorForm"
      }, _react2.default.createElement(_eui.EuiForm, null, this.renderIndexPatternInput(), this.state.isCustomEditorOpen ? this.renderCustomEditor() : this.renderRegularEditor(), _react2.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), _react2.default.createElement(_eui.EuiSwitch, {
        id: "filterEditorCustomLabelSwitch",
        label: this.props.intl.formatMessage({
          id: 'common.ui.filterEditor.createCustomLabelSwitchLabel',
          defaultMessage: 'Create custom label?'
        }),
        checked: this.state.useCustomLabel,
        onChange: this.onCustomLabelSwitchChange
      }), this.state.useCustomLabel && _react2.default.createElement("div", null, _react2.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), _react2.default.createElement(_eui.EuiFormRow, {
        label: this.props.intl.formatMessage({
          id: 'common.ui.filterEditor.createCustomLabelInputLabel',
          defaultMessage: 'Custom label'
        })
      }, _react2.default.createElement(_eui.EuiFieldText, {
        value: "".concat(this.state.customLabel),
        onChange: this.onCustomLabelChange
      }))), _react2.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), _react2.default.createElement(_eui.EuiFlexGroup, {
        direction: "rowReverse",
        alignItems: "center"
      }, _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiButton, {
        fill: true,
        onClick: this.onSubmit,
        isDisabled: !this.isFilterValid(),
        "data-test-subj": "saveFilter"
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "common.ui.filterEditor.saveButtonLabel",
        defaultMessage: "Save"
      }))), _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiButtonEmpty, {
        flush: "right",
        onClick: this.props.onCancel,
        "data-test-subj": "cancelSaveFilter"
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "common.ui.filterEditor.cancelButtonLabel",
        defaultMessage: "Cancel"
      }))), _react2.default.createElement(_eui.EuiFlexItem, null)))));
    }
  }, {
    key: "renderIndexPatternInput",
    value: function renderIndexPatternInput() {
      if (this.props.indexPatterns.length <= 1) {
        return '';
      }

      var selectedIndexPattern = this.state.selectedIndexPattern;
      return _react2.default.createElement(_eui.EuiFlexGroup, null, _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiFormRow, {
        label: this.props.intl.formatMessage({
          id: 'common.ui.filterEditor.indexPatternSelectLabel',
          defaultMessage: 'Index Pattern'
        })
      }, _react2.default.createElement(IndexPatternComboBox, {
        placeholder: this.props.intl.formatMessage({
          id: 'common.ui.filterBar.indexPatternSelectPlaceholder',
          defaultMessage: 'Select an index pattern'
        }),
        options: this.props.indexPatterns,
        selectedOptions: selectedIndexPattern ? [selectedIndexPattern] : [],
        getLabel: function getLabel(indexPattern) {
          return indexPattern.title;
        },
        onChange: this.onIndexPatternChange,
        singleSelection: {
          asPlainText: true
        },
        isClearable: false,
        "data-test-subj": "filterIndexPatternsSelect"
      }))));
    }
  }, {
    key: "renderRegularEditor",
    value: function renderRegularEditor() {
      return _react2.default.createElement("div", null, _react2.default.createElement(_eui.EuiFlexGroup, null, _react2.default.createElement(_eui.EuiFlexItem, {
        style: {
          maxWidth: '188px'
        }
      }, this.renderFieldInput()), _react2.default.createElement(_eui.EuiFlexItem, {
        style: {
          maxWidth: '188px'
        }
      }, this.renderOperatorInput())), _react2.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), _react2.default.createElement("div", {
        "data-test-subj": "filterParams"
      }, this.renderParamsEditor()));
    }
  }, {
    key: "renderFieldInput",
    value: function renderFieldInput() {
      var _this$state2 = this.state,
          selectedIndexPattern = _this$state2.selectedIndexPattern,
          selectedField = _this$state2.selectedField;
      var fields = selectedIndexPattern ? (0, _filter_editor_utils.getFilterableFields)(selectedIndexPattern) : [];
      return _react2.default.createElement(_eui.EuiFormRow, {
        label: this.props.intl.formatMessage({
          id: 'common.ui.filterEditor.fieldSelectLabel',
          defaultMessage: 'Field'
        })
      }, _react2.default.createElement(FieldComboBox, {
        id: "fieldInput",
        isDisabled: !selectedIndexPattern,
        placeholder: this.props.intl.formatMessage({
          id: 'common.ui.filterEditor.fieldSelectPlaceholder',
          defaultMessage: 'Select a field'
        }),
        options: fields,
        selectedOptions: selectedField ? [selectedField] : [],
        getLabel: function getLabel(field) {
          return field.name;
        },
        onChange: this.onFieldChange,
        singleSelection: {
          asPlainText: true
        },
        isClearable: false,
        "data-test-subj": "filterFieldSuggestionList"
      }));
    }
  }, {
    key: "renderOperatorInput",
    value: function renderOperatorInput() {
      var _this$state3 = this.state,
          selectedField = _this$state3.selectedField,
          selectedOperator = _this$state3.selectedOperator;
      var operators = selectedField ? (0, _filter_editor_utils.getOperatorOptions)(selectedField) : [];
      return _react2.default.createElement(_eui.EuiFormRow, {
        label: this.props.intl.formatMessage({
          id: 'common.ui.filterEditor.operatorSelectLabel',
          defaultMessage: 'Operator'
        })
      }, _react2.default.createElement(OperatorComboBox, {
        isDisabled: !selectedField,
        placeholder: this.props.intl.formatMessage({
          id: 'common.ui.filterEditor.operatorSelectPlaceholder',
          defaultMessage: 'Select an operator'
        }),
        options: operators,
        selectedOptions: selectedOperator ? [selectedOperator] : [],
        getLabel: function getLabel(_ref7) {
          var message = _ref7.message;
          return message;
        },
        onChange: this.onOperatorChange,
        singleSelection: {
          asPlainText: true
        },
        isClearable: false,
        "data-test-subj": "filterOperatorList"
      }));
    }
  }, {
    key: "renderCustomEditor",
    value: function renderCustomEditor() {
      return _react2.default.createElement(_eui.EuiFormRow, {
        label: "Value"
      }, _react2.default.createElement(_eui.EuiCodeEditor, {
        value: this.state.queryDsl,
        onChange: this.onQueryDslChange,
        mode: "json",
        width: "100%",
        height: "250px"
      }));
    }
  }, {
    key: "renderParamsEditor",
    value: function renderParamsEditor() {
      var indexPattern = this.state.selectedIndexPattern;

      if (!indexPattern || !this.state.selectedOperator) {
        return '';
      }

      switch (this.state.selectedOperator.type) {
        case 'exists':
          return '';

        case 'phrase':
          return _react2.default.createElement(_phrase_value_input.PhraseValueInput, {
            indexPattern: indexPattern,
            field: this.state.selectedField,
            value: this.state.params,
            onChange: this.onParamsChange,
            "data-test-subj": "phraseValueInput"
          });

        case 'phrases':
          return _react2.default.createElement(_phrases_values_input.PhrasesValuesInput, {
            indexPattern: indexPattern,
            field: this.state.selectedField,
            values: this.state.params,
            onChange: this.onParamsChange
          });

        case 'range':
          return _react2.default.createElement(_range_value_input.RangeValueInput, {
            field: this.state.selectedField,
            value: this.state.params,
            onChange: this.onParamsChange
          });
      }
    }
  }, {
    key: "isUnknownFilterType",
    value: function isUnknownFilterType() {
      var type = this.props.filter.meta.type;
      return !!type && !['phrase', 'phrases', 'range', 'exists'].includes(type);
    }
  }, {
    key: "getIndexPatternFromFilter",
    value: function getIndexPatternFromFilter() {
      return (0, _filter_editor_utils.getIndexPatternFromFilter)(this.props.filter, this.props.indexPatterns);
    }
  }, {
    key: "getFieldFromFilter",
    value: function getFieldFromFilter() {
      var indexPattern = this.getIndexPatternFromFilter();
      return indexPattern && (0, _filter_editor_utils.getFieldFromFilter)(this.props.filter, indexPattern);
    }
  }, {
    key: "getSelectedOperator",
    value: function getSelectedOperator() {
      return (0, _filter_editor_utils.getOperatorFromFilter)(this.props.filter);
    }
  }, {
    key: "isFilterValid",
    value: function isFilterValid() {
      var _this$state4 = this.state,
          isCustomEditorOpen = _this$state4.isCustomEditorOpen,
          queryDsl = _this$state4.queryDsl,
          indexPattern = _this$state4.selectedIndexPattern,
          field = _this$state4.selectedField,
          operator = _this$state4.selectedOperator,
          params = _this$state4.params;

      if (isCustomEditorOpen) {
        try {
          return Boolean(JSON.parse(queryDsl));
        } catch (e) {
          return false;
        }
      }

      return (0, _filter_editor_utils.isFilterValid)(indexPattern, field, operator, params);
    }
  }]);

  return FilterEditorUI;
}(_react2.Component);

function IndexPatternComboBox(props) {
  return (0, _generic_combo_box.GenericComboBox)(props);
}

function FieldComboBox(props) {
  return (0, _generic_combo_box.GenericComboBox)(props);
}

function OperatorComboBox(props) {
  return (0, _generic_combo_box.GenericComboBox)(props);
}

var FilterEditor = (0, _react.injectI18n)(FilterEditorUI);
exports.FilterEditor = FilterEditor;