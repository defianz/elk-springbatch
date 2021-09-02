"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SavedObjectSaveModal = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SavedObjectSaveModal =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SavedObjectSaveModal, _React$Component);

  function SavedObjectSaveModal() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SavedObjectSaveModal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SavedObjectSaveModal)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      title: _this.props.title,
      copyOnSave: false,
      isTitleDuplicateConfirmed: false,
      hasTitleDuplicate: false,
      isLoading: false
    });

    _defineProperty(_assertThisInitialized(_this), "onTitleDuplicate", function () {
      _this.setState({
        isLoading: false,
        isTitleDuplicateConfirmed: true,
        hasTitleDuplicate: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "saveSavedObject",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!_this.state.isLoading) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              _this.setState({
                isLoading: true
              });

              _context.next = 5;
              return _this.props.onSave({
                newTitle: _this.state.title,
                newCopyOnSave: _this.state.copyOnSave,
                isTitleDuplicateConfirmed: _this.state.isTitleDuplicateConfirmed,
                onTitleDuplicate: _this.onTitleDuplicate
              });

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "onTitleChange", function (event) {
      _this.setState({
        title: event.target.value,
        isTitleDuplicateConfirmed: false,
        hasTitleDuplicate: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onCopyOnSaveChange", function (event) {
      _this.setState({
        copyOnSave: event.target.checked
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onFormSubmit", function (event) {
      event.preventDefault();

      _this.saveSavedObject();
    });

    _defineProperty(_assertThisInitialized(_this), "renderDuplicateTitleCallout", function () {
      if (!_this.state.hasTitleDuplicate) {
        return;
      }

      return _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement(_eui.EuiCallOut, {
        title: _react2.default.createElement(_react.FormattedMessage, {
          id: "common.ui.savedObjects.saveModal.duplicateTitleLabel",
          defaultMessage: "A {objectType} with the title '{title}' already exists.",
          values: {
            objectType: _this.props.objectType,
            title: _this.state.title
          }
        }),
        color: "warning",
        "data-test-subj": "titleDupicateWarnMsg"
      }, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "common.ui.savedObjects.saveModal.duplicateTitleDescription",
        defaultMessage: "Click {confirmSaveLabel} to save the {objectType} with the duplicate title.",
        values: {
          objectType: _this.props.objectType,
          confirmSaveLabel: _react2.default.createElement("strong", null, _react2.default.createElement(_react.FormattedMessage, {
            id: "common.ui.savedObjects.saveModal.duplicateTitleDescription.confirmSaveText",
            defaultMessage: "Confirm Save"
          }))
        }
      }))), _react2.default.createElement(_eui.EuiSpacer, null));
    });

    _defineProperty(_assertThisInitialized(_this), "renderCopyOnSave", function () {
      if (!_this.props.showCopyOnSave) {
        return;
      }

      return _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement(_eui.EuiSwitch, {
        "data-test-subj": "saveAsNewCheckbox",
        checked: _this.state.copyOnSave,
        onChange: _this.onCopyOnSaveChange,
        label: _react2.default.createElement(_react.FormattedMessage, {
          id: "common.ui.savedObjects.saveModal.saveAsNewLabel",
          defaultMessage: "Save as a new {objectType}",
          values: {
            objectType: _this.props.objectType
          }
        })
      }), _react2.default.createElement(_eui.EuiSpacer, null));
    });

    return _this;
  }

  _createClass(SavedObjectSaveModal, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
          isTitleDuplicateConfirmed = _this$state.isTitleDuplicateConfirmed,
          hasTitleDuplicate = _this$state.hasTitleDuplicate,
          title = _this$state.title,
          isLoading = _this$state.isLoading;
      return _react2.default.createElement(_eui.EuiOverlayMask, null, _react2.default.createElement("form", {
        onSubmit: this.onFormSubmit
      }, _react2.default.createElement(_eui.EuiModal, {
        "data-test-subj": "savedObjectSaveModal",
        className: "dshSaveModal",
        onClose: this.props.onClose
      }, _react2.default.createElement(_eui.EuiModalHeader, null, _react2.default.createElement(_eui.EuiModalHeaderTitle, null, _react2.default.createElement(_react.FormattedMessage, {
        id: "common.ui.savedObjects.saveModal.saveTitle",
        defaultMessage: "Save {objectType}",
        values: {
          objectType: this.props.objectType
        }
      }))), _react2.default.createElement(_eui.EuiModalBody, null, this.renderDuplicateTitleCallout(), _react2.default.createElement(_eui.EuiForm, null, this.renderCopyOnSave(), _react2.default.createElement(_eui.EuiFormRow, {
        label: _react2.default.createElement(_react.FormattedMessage, {
          id: "common.ui.savedObjects.saveModal.titleLabel",
          defaultMessage: "Title"
        })
      }, _react2.default.createElement(_eui.EuiFieldText, {
        autoFocus: true,
        "data-test-subj": "savedObjectTitle",
        value: title,
        onChange: this.onTitleChange,
        isInvalid: !isTitleDuplicateConfirmed && hasTitleDuplicate || title.length === 0
      })), this.props.options)), _react2.default.createElement(_eui.EuiModalFooter, null, _react2.default.createElement(_eui.EuiButtonEmpty, {
        "data-test-subj": "saveCancelButton",
        onClick: this.props.onClose
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "common.ui.savedObjects.saveModal.cancelButtonLabel",
        defaultMessage: "Cancel"
      })), _react2.default.createElement(_eui.EuiButton, {
        fill: true,
        "data-test-subj": "confirmSaveSavedObjectButton",
        isLoading: isLoading,
        isDisabled: title.length === 0,
        type: "submit"
      }, this.props.confirmButtonLabel ? this.props.confirmButtonLabel : _react2.default.createElement(_react.FormattedMessage, {
        id: "common.ui.savedObjects.saveModal.confirmSaveButtonLabel",
        defaultMessage: "Confirm Save"
      }))))));
    }
  }]);

  return SavedObjectSaveModal;
}(_react2.default.Component);

exports.SavedObjectSaveModal = SavedObjectSaveModal;