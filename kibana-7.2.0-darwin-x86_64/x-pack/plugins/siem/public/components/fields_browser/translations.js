"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.CATEGORY = i18n_1.i18n.translate('xpack.siem.fieldBrowser.categoryLabel', {
    defaultMessage: 'Category',
});
exports.CATEGORIES = i18n_1.i18n.translate('xpack.siem.fieldBrowser.categoriesTitle', {
    defaultMessage: 'Categories',
});
exports.CATEGORIES_COUNT = (totalCount) => i18n_1.i18n.translate('xpack.siem.fieldBrowser.categoriesCountTitle', {
    values: { totalCount },
    defaultMessage: '{totalCount} {totalCount, plural, =1 {Category} other {Categories}}',
});
exports.COPY_TO_CLIPBOARD = i18n_1.i18n.translate('xpack.siem.fieldBrowser.copyToClipboard', {
    defaultMessage: 'Copy to Clipboard',
});
exports.CUSTOMIZE_COLUMNS = i18n_1.i18n.translate('xpack.siem.fieldBrowser.customizeColumnsTitle', {
    defaultMessage: 'Customize Columns',
});
exports.DESCRIPTION = i18n_1.i18n.translate('xpack.siem.fieldBrowser.descriptionLabel', {
    defaultMessage: 'Description',
});
exports.FIELD = i18n_1.i18n.translate('xpack.siem.fieldBrowser.fieldLabel', {
    defaultMessage: 'Field',
});
exports.FIELDS = i18n_1.i18n.translate('xpack.siem.fieldBrowser.fieldsTitle', {
    defaultMessage: 'Fields',
});
exports.FIELDS_COUNT = (totalCount) => i18n_1.i18n.translate('xpack.siem.fieldBrowser.fieldsCountTitle', {
    values: { totalCount },
    defaultMessage: '{totalCount} {totalCount, plural, =1 {Field} other {Fields}}',
});
exports.FILTER_PLACEHOLDER = i18n_1.i18n.translate('xpack.siem.fieldBrowser.filterPlaceholder', {
    defaultMessage: 'Field name',
});
exports.NO_FIELDS_MATCH = i18n_1.i18n.translate('xpack.siem.fieldBrowser.noFieldsMatchLabel', {
    defaultMessage: 'No fields match',
});
exports.NO_FIELDS_MATCH_INPUT = (searchInput) => i18n_1.i18n.translate('xpack.siem.fieldBrowser.noFieldsMatchInputLabel', {
    defaultMessage: 'No fields match {searchInput}',
    values: {
        searchInput,
    },
});
exports.RESET_FIELDS = i18n_1.i18n.translate('xpack.siem.fieldBrowser.resetFieldsLink', {
    defaultMessage: 'Reset Fields',
});
exports.VIEW_CATEGORY = (categoryId) => i18n_1.i18n.translate('xpack.siem.fieldBrowser.viewCategoryTooltip', {
    defaultMessage: 'View all {categoryId} fields',
    values: {
        categoryId,
    },
});
