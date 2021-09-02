"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.I18nService = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Service that is responsible for i18n capabilities.
 * @internal
 */
var I18nService =
/*#__PURE__*/
function () {
  function I18nService() {
    _classCallCheck(this, I18nService);
  }

  _createClass(I18nService, [{
    key: "setup",
    value: function setup() {
      var mapping = {
        'euiBasicTable.selectAllRows': _i18n.i18n.translate('core.euiBasicTable.selectAllRows', {
          defaultMessage: 'Select all rows',
          description: 'ARIA and displayed label on a checkbox to select all table rows'
        }),
        'euiBasicTable.selectThisRow': _i18n.i18n.translate('core.euiBasicTable.selectThisRow', {
          defaultMessage: 'Select this row',
          description: 'ARIA and displayed label on a checkbox to select a single table row'
        }),
        'euiBasicTable.tableDescription': function euiBasicTableTableDescription(_ref) {
          var itemCount = _ref.itemCount;
          return _i18n.i18n.translate('core.euiBasicTable.tableDescription', {
            defaultMessage: 'Below is a table of {itemCount} items.',
            values: {
              itemCount: itemCount
            },
            description: 'Screen reader text to describe the size of a table'
          });
        },
        'euiBottomBar.screenReaderAnnouncement': _i18n.i18n.translate('core.euiBottomBar.screenReaderAnnouncement', {
          defaultMessage: 'There is a new menu opening with page level controls at the end of the document.',
          description: 'Screen reader announcement that functionality is available in the page document'
        }),
        'euiCodeBlock.copyButton': _i18n.i18n.translate('core.euiCodeBlock.copyButton', {
          defaultMessage: 'Copy',
          description: 'ARIA label for a button that copies source code text to the clipboard'
        }),
        'euiCodeEditor.startEditing': _i18n.i18n.translate('core.euiCodeEditor.startEditing', {
          defaultMessage: 'Press Enter to start editing.'
        }),
        'euiCodeEditor.startInteracting': _i18n.i18n.translate('core.euiCodeEditor.startInteracting', {
          defaultMessage: 'Press Enter to start interacting with the code.'
        }),
        'euiCodeEditor.stopEditing': _i18n.i18n.translate('core.euiCodeEditor.stopEditing', {
          defaultMessage: "When you're done, press Escape to stop editing."
        }),
        'euiCodeEditor.stopInteracting': _i18n.i18n.translate('core.euiCodeEditor.stopInteracting', {
          defaultMessage: "When you're done, press Escape to stop interacting with the code."
        }),
        'euiCollapsedItemActions.allActions': _i18n.i18n.translate('core.euiCollapsedItemActions.allActions', {
          defaultMessage: 'All actions',
          description: 'ARIA label and tooltip content describing a button that expands an actions menu'
        }),
        'euiColorPicker.colorSelectionLabel': function euiColorPickerColorSelectionLabel(_ref2) {
          var colorValue = _ref2.colorValue;
          return _i18n.i18n.translate('core.euiColorPicker.colorSelectionLabel', {
            defaultMessage: 'Color selection is {colorValue}',
            values: {
              colorValue: colorValue
            }
          });
        },
        'euiColorPicker.transparentColor': _i18n.i18n.translate('core.euiColorPicker.transparentColor', {
          defaultMessage: 'transparent',
          description: 'Describes a color that is fully transparent'
        }),
        'euiComboBoxOptionsList.allOptionsSelected': _i18n.i18n.translate('core.euiComboBoxOptionsList.allOptionsSelected', {
          defaultMessage: "You've selected all available options"
        }),
        'euiComboBoxOptionsList.alreadyAdded': function euiComboBoxOptionsListAlreadyAdded(_ref3) {
          var label = _ref3.label;
          return _react.default.createElement(_react2.FormattedMessage, {
            id: "core.euiComboBoxOptionsList.alreadyAdded",
            defaultMessage: "{label} has already been added",
            values: {
              label: label
            }
          });
        },
        'euiComboBoxOptionsList.createCustomOption': function euiComboBoxOptionsListCreateCustomOption(_ref4) {
          var key = _ref4.key,
              searchValue = _ref4.searchValue;
          return _react.default.createElement(_react2.FormattedMessage, {
            id: "core.euiComboBoxOptionsList.createCustomOption",
            defaultMessage: "Hit {key} to add {searchValue} as a custom option",
            values: {
              key: key,
              searchValue: searchValue
            }
          });
        },
        'euiComboBoxOptionsList.loadingOptions': _i18n.i18n.translate('core.euiComboBoxOptionsList.loadingOptions', {
          defaultMessage: 'Loading options',
          description: 'Placeholder message while data is asynchronously loaded'
        }),
        'euiComboBoxOptionsList.noAvailableOptions': _i18n.i18n.translate('core.euiComboBoxOptionsList.noAvailableOptions', {
          defaultMessage: "There aren't any options available"
        }),
        'euiComboBoxOptionsList.noMatchingOptions': function euiComboBoxOptionsListNoMatchingOptions(_ref5) {
          var searchValue = _ref5.searchValue;
          return _react.default.createElement(_react2.FormattedMessage, {
            id: "core.euiComboBoxOptionsList.noMatchingOptions",
            defaultMessage: "{searchValue} doesn't match any options",
            values: {
              searchValue: searchValue
            }
          });
        },
        'euiComboBoxPill.removeSelection': function euiComboBoxPillRemoveSelection(_ref6) {
          var children = _ref6.children;
          return _i18n.i18n.translate('core.euiComboBoxPill.removeSelection', {
            defaultMessage: 'Remove {children} from selection in this group',
            values: {
              children: children
            },
            description: 'ARIA label, `children` is the human-friendly value of an option'
          });
        },
        'euiForm.addressFormErrors': _i18n.i18n.translate('core.euiForm.addressFormErrors', {
          defaultMessage: 'Please address the errors in your form.'
        }),
        'euiFormControlLayoutClearButton.label': _i18n.i18n.translate('core.euiFormControlLayoutClearButton.label', {
          defaultMessage: 'Clear input',
          description: 'ARIA label on a button that removes any entry in a form field'
        }),
        'euiHeaderAlert.dismiss': _i18n.i18n.translate('core.euiHeaderAlert.dismiss', {
          defaultMessage: 'Dismiss',
          description: 'ARIA label on a button that dismisses/removes a notification'
        }),
        'euiHeaderLinks.appNavigation': _i18n.i18n.translate('core.euiHeaderLinks.appNavigation', {
          defaultMessage: 'App navigation',
          description: 'ARIA label on a `nav` element'
        }),
        'euiHeaderLinks.openNavigationMenu': _i18n.i18n.translate('core.euiHeaderLinks.openNavigationMenu', {
          defaultMessage: 'Open navigation menu'
        }),
        'euiModal.closeModal': _i18n.i18n.translate('core.euiModal.closeModal', {
          defaultMessage: 'Closes this modal window'
        }),
        'euiPagination.jumpToLastPage': function euiPaginationJumpToLastPage(_ref7) {
          var pageCount = _ref7.pageCount;
          return _i18n.i18n.translate('core.euiPagination.jumpToLastPage', {
            defaultMessage: 'Jump to the last page, number {pageCount}',
            values: {
              pageCount: pageCount
            }
          });
        },
        'euiPagination.nextPage': _i18n.i18n.translate('core.euiPagination.nextPage', {
          defaultMessage: 'Next page'
        }),
        'euiPagination.pageOfTotal': function euiPaginationPageOfTotal(_ref8) {
          var page = _ref8.page,
              total = _ref8.total;
          return _i18n.i18n.translate('core.euiPagination.pageOfTotal', {
            defaultMessage: 'Page {page} of {total}',
            values: {
              page: page,
              total: total
            }
          });
        },
        'euiPagination.previousPage': _i18n.i18n.translate('core.euiPagination.previousPage', {
          defaultMessage: 'Previous page'
        }),
        'euiPopover.screenReaderAnnouncement': _i18n.i18n.translate('core.euiPopover.screenReaderAnnouncement', {
          defaultMessage: 'You are in a popup. To exit this popup, hit Escape.'
        }),
        'euiSelectable.loadingOptions': _i18n.i18n.translate('core.euiSelectable.loadingOptions', {
          defaultMessage: 'Loading options',
          description: 'Placeholder message while data is asynchronously loaded'
        }),
        'euiSelectable.noAvailableOptions': _i18n.i18n.translate('core.euiSelectable.noAvailableOptions', {
          defaultMessage: "There aren't any options available"
        }),
        'euiSelectable.noMatchingOptions': function euiSelectableNoMatchingOptions(_ref9) {
          var searchValue = _ref9.searchValue;
          return _react.default.createElement(_react2.FormattedMessage, {
            id: "core.euiSelectable.noMatchingOptions",
            defaultMessage: "{searchValue} doesn't match any options",
            values: {
              searchValue: searchValue
            }
          });
        },
        'euiStep.completeStep': _i18n.i18n.translate('core.euiStep.completeStep', {
          defaultMessage: 'Step',
          description: 'See https://elastic.github.io/eui/#/navigation/steps to know how Step control looks like'
        }),
        'euiStep.incompleteStep': _i18n.i18n.translate('core.euiStep.incompleteStep', {
          defaultMessage: 'Incomplete Step'
        }),
        'euiStepHorizontal.buttonTitle': function euiStepHorizontalButtonTitle(_ref10) {
          var step = _ref10.step,
              title = _ref10.title,
              disabled = _ref10.disabled,
              isComplete = _ref10.isComplete;
          return _i18n.i18n.translate('core.euiStepHorizontal.buttonTitle', {
            defaultMessage: 'Step {step}: {title}{titleAppendix, select, completed { is completed} disabled { is disabled} other {}}',
            values: {
              step: step,
              title: title,
              titleAppendix: disabled ? 'disabled' : isComplete ? 'completed' : ''
            }
          });
        },
        'euiStepHorizontal.step': _i18n.i18n.translate('core.euiStepHorizontal.step', {
          defaultMessage: 'Step',
          description: 'Screen reader text announcing information about a step in some process'
        }),
        'euiStepNumber.hasErrors': _i18n.i18n.translate('core.euiStepNumber.hasErrors', {
          defaultMessage: 'has errors',
          description: 'Used as the title attribute on an image or svg icon to indicate a given process step has errors'
        }),
        'euiStepNumber.hasWarnings': _i18n.i18n.translate('core.euiStepNumber.hasWarnings', {
          defaultMessage: 'has warnings',
          description: 'Used as the title attribute on an image or svg icon to indicate a given process step has warnings'
        }),
        'euiStepNumber.isComplete': _i18n.i18n.translate('core.euiStepNumber.isComplete', {
          defaultMessage: 'complete',
          description: 'Used as the title attribute on an image or svg icon to indicate a given process step is complete'
        }),
        'euiSuperSelect.screenReaderAnnouncement': function euiSuperSelectScreenReaderAnnouncement(_ref11) {
          var optionsCount = _ref11.optionsCount;
          return _i18n.i18n.translate('core.euiSuperSelect.screenReaderAnnouncement', {
            defaultMessage: 'You are in a form selector of {optionsCount} items and must select a single option. Use the Up and Down keys to navigate or Escape to close.',
            values: {
              optionsCount: optionsCount
            }
          });
        },
        'euiSuperSelectControl.selectAnOption': function euiSuperSelectControlSelectAnOption(_ref12) {
          var selectedValue = _ref12.selectedValue;
          return _i18n.i18n.translate('core.euiSuperSelectControl.selectAnOption', {
            defaultMessage: 'Select an option: {selectedValue}, is selected',
            values: {
              selectedValue: selectedValue
            }
          });
        },
        'euiTablePagination.rowsPerPage': _i18n.i18n.translate('core.euiTablePagination.rowsPerPage', {
          defaultMessage: 'Rows per page',
          description: 'Displayed in a button that toggles a table pagination menu'
        }),
        'euiTableSortMobile.sorting': _i18n.i18n.translate('core.euiTableSortMobile.sorting', {
          defaultMessage: 'Sorting',
          description: 'Displayed in a button that toggles a table sorting menu'
        }),
        'euiToast.dismissToast': _i18n.i18n.translate('core.euiToast.dismissToast', {
          defaultMessage: 'Dismiss toast'
        }),
        'euiToast.newNotification': _i18n.i18n.translate('core.euiToast.newNotification', {
          defaultMessage: 'A new notification appears'
        }),
        'euiToast.notification': _i18n.i18n.translate('core.euiToast.notification', {
          defaultMessage: 'Notification',
          description: 'ARIA label on an element containing a notification'
        })
      };
      var setup = {
        Context: function I18nContext(_ref13) {
          var children = _ref13.children;
          return _react.default.createElement(_react2.I18nProvider, null, _react.default.createElement(_eui.EuiContext, {
            i18n: {
              mapping: mapping
            }
          }, children));
        }
      };
      return setup;
    }
  }, {
    key: "start",
    value: function start() {
      return this.setup();
    }
  }, {
    key: "stop",
    value: function stop() {// nothing to do here currently
    }
  }]);

  return I18nService;
}();
/**
 * I18nSetup.Context is required by any localizable React component from \@kbn/i18n and \@elastic/eui packages
 * and is supposed to be used as the topmost component for any i18n-compatible React tree.
 *
 * @public
 *
 */


exports.I18nService = I18nService;