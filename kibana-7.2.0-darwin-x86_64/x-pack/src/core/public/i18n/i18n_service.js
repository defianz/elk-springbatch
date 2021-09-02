"use strict";
/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const eui_1 = require("@elastic/eui");
const i18n_1 = require("@kbn/i18n");
const react_2 = require("@kbn/i18n/react");
/**
 * Service that is responsible for i18n capabilities.
 * @internal
 */
class I18nService {
    setup() {
        const mapping = {
            'euiBasicTable.selectAllRows': i18n_1.i18n.translate('core.euiBasicTable.selectAllRows', {
                defaultMessage: 'Select all rows',
                description: 'ARIA and displayed label on a checkbox to select all table rows',
            }),
            'euiBasicTable.selectThisRow': i18n_1.i18n.translate('core.euiBasicTable.selectThisRow', {
                defaultMessage: 'Select this row',
                description: 'ARIA and displayed label on a checkbox to select a single table row',
            }),
            'euiBasicTable.tableDescription': ({ itemCount }) => i18n_1.i18n.translate('core.euiBasicTable.tableDescription', {
                defaultMessage: 'Below is a table of {itemCount} items.',
                values: { itemCount },
                description: 'Screen reader text to describe the size of a table',
            }),
            'euiBottomBar.screenReaderAnnouncement': i18n_1.i18n.translate('core.euiBottomBar.screenReaderAnnouncement', {
                defaultMessage: 'There is a new menu opening with page level controls at the end of the document.',
                description: 'Screen reader announcement that functionality is available in the page document',
            }),
            'euiCodeBlock.copyButton': i18n_1.i18n.translate('core.euiCodeBlock.copyButton', {
                defaultMessage: 'Copy',
                description: 'ARIA label for a button that copies source code text to the clipboard',
            }),
            'euiCodeEditor.startEditing': i18n_1.i18n.translate('core.euiCodeEditor.startEditing', {
                defaultMessage: 'Press Enter to start editing.',
            }),
            'euiCodeEditor.startInteracting': i18n_1.i18n.translate('core.euiCodeEditor.startInteracting', {
                defaultMessage: 'Press Enter to start interacting with the code.',
            }),
            'euiCodeEditor.stopEditing': i18n_1.i18n.translate('core.euiCodeEditor.stopEditing', {
                defaultMessage: "When you're done, press Escape to stop editing.",
            }),
            'euiCodeEditor.stopInteracting': i18n_1.i18n.translate('core.euiCodeEditor.stopInteracting', {
                defaultMessage: "When you're done, press Escape to stop interacting with the code.",
            }),
            'euiCollapsedItemActions.allActions': i18n_1.i18n.translate('core.euiCollapsedItemActions.allActions', {
                defaultMessage: 'All actions',
                description: 'ARIA label and tooltip content describing a button that expands an actions menu',
            }),
            'euiColorPicker.colorSelectionLabel': ({ colorValue }) => i18n_1.i18n.translate('core.euiColorPicker.colorSelectionLabel', {
                defaultMessage: 'Color selection is {colorValue}',
                values: { colorValue },
            }),
            'euiColorPicker.transparentColor': i18n_1.i18n.translate('core.euiColorPicker.transparentColor', {
                defaultMessage: 'transparent',
                description: 'Describes a color that is fully transparent',
            }),
            'euiComboBoxOptionsList.allOptionsSelected': i18n_1.i18n.translate('core.euiComboBoxOptionsList.allOptionsSelected', {
                defaultMessage: "You've selected all available options",
            }),
            'euiComboBoxOptionsList.alreadyAdded': ({ label }) => (react_1.default.createElement(react_2.FormattedMessage, { id: "core.euiComboBoxOptionsList.alreadyAdded", defaultMessage: "{label} has already been added", values: { label } })),
            'euiComboBoxOptionsList.createCustomOption': ({ key, searchValue }) => (react_1.default.createElement(react_2.FormattedMessage, { id: "core.euiComboBoxOptionsList.createCustomOption", defaultMessage: "Hit {key} to add {searchValue} as a custom option", values: { key, searchValue } })),
            'euiComboBoxOptionsList.loadingOptions': i18n_1.i18n.translate('core.euiComboBoxOptionsList.loadingOptions', {
                defaultMessage: 'Loading options',
                description: 'Placeholder message while data is asynchronously loaded',
            }),
            'euiComboBoxOptionsList.noAvailableOptions': i18n_1.i18n.translate('core.euiComboBoxOptionsList.noAvailableOptions', {
                defaultMessage: "There aren't any options available",
            }),
            'euiComboBoxOptionsList.noMatchingOptions': ({ searchValue }) => (react_1.default.createElement(react_2.FormattedMessage, { id: "core.euiComboBoxOptionsList.noMatchingOptions", defaultMessage: "{searchValue} doesn't match any options", values: { searchValue } })),
            'euiComboBoxPill.removeSelection': ({ children }) => i18n_1.i18n.translate('core.euiComboBoxPill.removeSelection', {
                defaultMessage: 'Remove {children} from selection in this group',
                values: { children },
                description: 'ARIA label, `children` is the human-friendly value of an option',
            }),
            'euiForm.addressFormErrors': i18n_1.i18n.translate('core.euiForm.addressFormErrors', {
                defaultMessage: 'Please address the errors in your form.',
            }),
            'euiFormControlLayoutClearButton.label': i18n_1.i18n.translate('core.euiFormControlLayoutClearButton.label', {
                defaultMessage: 'Clear input',
                description: 'ARIA label on a button that removes any entry in a form field',
            }),
            'euiHeaderAlert.dismiss': i18n_1.i18n.translate('core.euiHeaderAlert.dismiss', {
                defaultMessage: 'Dismiss',
                description: 'ARIA label on a button that dismisses/removes a notification',
            }),
            'euiHeaderLinks.appNavigation': i18n_1.i18n.translate('core.euiHeaderLinks.appNavigation', {
                defaultMessage: 'App navigation',
                description: 'ARIA label on a `nav` element',
            }),
            'euiHeaderLinks.openNavigationMenu': i18n_1.i18n.translate('core.euiHeaderLinks.openNavigationMenu', {
                defaultMessage: 'Open navigation menu',
            }),
            'euiModal.closeModal': i18n_1.i18n.translate('core.euiModal.closeModal', {
                defaultMessage: 'Closes this modal window',
            }),
            'euiPagination.jumpToLastPage': ({ pageCount }) => i18n_1.i18n.translate('core.euiPagination.jumpToLastPage', {
                defaultMessage: 'Jump to the last page, number {pageCount}',
                values: { pageCount },
            }),
            'euiPagination.nextPage': i18n_1.i18n.translate('core.euiPagination.nextPage', {
                defaultMessage: 'Next page',
            }),
            'euiPagination.pageOfTotal': ({ page, total }) => i18n_1.i18n.translate('core.euiPagination.pageOfTotal', {
                defaultMessage: 'Page {page} of {total}',
                values: { page, total },
            }),
            'euiPagination.previousPage': i18n_1.i18n.translate('core.euiPagination.previousPage', {
                defaultMessage: 'Previous page',
            }),
            'euiPopover.screenReaderAnnouncement': i18n_1.i18n.translate('core.euiPopover.screenReaderAnnouncement', {
                defaultMessage: 'You are in a popup. To exit this popup, hit Escape.',
            }),
            'euiSelectable.loadingOptions': i18n_1.i18n.translate('core.euiSelectable.loadingOptions', {
                defaultMessage: 'Loading options',
                description: 'Placeholder message while data is asynchronously loaded',
            }),
            'euiSelectable.noAvailableOptions': i18n_1.i18n.translate('core.euiSelectable.noAvailableOptions', {
                defaultMessage: "There aren't any options available",
            }),
            'euiSelectable.noMatchingOptions': ({ searchValue }) => (react_1.default.createElement(react_2.FormattedMessage, { id: "core.euiSelectable.noMatchingOptions", defaultMessage: "{searchValue} doesn't match any options", values: { searchValue } })),
            'euiStep.completeStep': i18n_1.i18n.translate('core.euiStep.completeStep', {
                defaultMessage: 'Step',
                description: 'See https://elastic.github.io/eui/#/navigation/steps to know how Step control looks like',
            }),
            'euiStep.incompleteStep': i18n_1.i18n.translate('core.euiStep.incompleteStep', {
                defaultMessage: 'Incomplete Step',
            }),
            'euiStepHorizontal.buttonTitle': ({ step, title, disabled, isComplete }) => {
                return i18n_1.i18n.translate('core.euiStepHorizontal.buttonTitle', {
                    defaultMessage: 'Step {step}: {title}{titleAppendix, select, completed { is completed} disabled { is disabled} other {}}',
                    values: {
                        step,
                        title,
                        titleAppendix: disabled ? 'disabled' : isComplete ? 'completed' : '',
                    },
                });
            },
            'euiStepHorizontal.step': i18n_1.i18n.translate('core.euiStepHorizontal.step', {
                defaultMessage: 'Step',
                description: 'Screen reader text announcing information about a step in some process',
            }),
            'euiStepNumber.hasErrors': i18n_1.i18n.translate('core.euiStepNumber.hasErrors', {
                defaultMessage: 'has errors',
                description: 'Used as the title attribute on an image or svg icon to indicate a given process step has errors',
            }),
            'euiStepNumber.hasWarnings': i18n_1.i18n.translate('core.euiStepNumber.hasWarnings', {
                defaultMessage: 'has warnings',
                description: 'Used as the title attribute on an image or svg icon to indicate a given process step has warnings',
            }),
            'euiStepNumber.isComplete': i18n_1.i18n.translate('core.euiStepNumber.isComplete', {
                defaultMessage: 'complete',
                description: 'Used as the title attribute on an image or svg icon to indicate a given process step is complete',
            }),
            'euiSuperSelect.screenReaderAnnouncement': ({ optionsCount }) => i18n_1.i18n.translate('core.euiSuperSelect.screenReaderAnnouncement', {
                defaultMessage: 'You are in a form selector of {optionsCount} items and must select a single option. Use the Up and Down keys to navigate or Escape to close.',
                values: { optionsCount },
            }),
            'euiSuperSelectControl.selectAnOption': ({ selectedValue }) => i18n_1.i18n.translate('core.euiSuperSelectControl.selectAnOption', {
                defaultMessage: 'Select an option: {selectedValue}, is selected',
                values: { selectedValue },
            }),
            'euiTablePagination.rowsPerPage': i18n_1.i18n.translate('core.euiTablePagination.rowsPerPage', {
                defaultMessage: 'Rows per page',
                description: 'Displayed in a button that toggles a table pagination menu',
            }),
            'euiTableSortMobile.sorting': i18n_1.i18n.translate('core.euiTableSortMobile.sorting', {
                defaultMessage: 'Sorting',
                description: 'Displayed in a button that toggles a table sorting menu',
            }),
            'euiToast.dismissToast': i18n_1.i18n.translate('core.euiToast.dismissToast', {
                defaultMessage: 'Dismiss toast',
            }),
            'euiToast.newNotification': i18n_1.i18n.translate('core.euiToast.newNotification', {
                defaultMessage: 'A new notification appears',
            }),
            'euiToast.notification': i18n_1.i18n.translate('core.euiToast.notification', {
                defaultMessage: 'Notification',
                description: 'ARIA label on an element containing a notification',
            }),
        };
        const setup = {
            Context: function I18nContext({ children }) {
                return (react_1.default.createElement(react_2.I18nProvider, null,
                    react_1.default.createElement(eui_1.EuiContext, { i18n: { mapping } }, children)));
            },
        };
        return setup;
    }
    start() {
        return this.setup();
    }
    stop() {
        // nothing to do here currently
    }
}
exports.I18nService = I18nService;
