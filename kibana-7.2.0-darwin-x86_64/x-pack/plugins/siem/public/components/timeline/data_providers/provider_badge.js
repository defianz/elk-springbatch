"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const fp_1 = require("lodash/fp");
const react_1 = tslib_1.__importDefault(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const empty_value_1 = require("../../empty_value");
const data_provider_1 = require("./data_provider");
const i18n = tslib_1.__importStar(require("./translations"));
const ProviderBadgeStyled = styled_components_1.default(eui_1.EuiBadge) `
  .euiToolTipAnchor {
    &::after {
      font-style: normal;
      content: '|';
      padding: 0px 3px;
    }
  }
  .field-value {
    font-weight: 200;
  }
  &.globalFilterItem {
    line-height: 28px;
    &.globalFilterItem-isDisabled {
      text-decoration: line-through;
      font-weight: 400;
      font-style: italic;
    }
  }
`;
exports.ProviderBadge = recompose_1.pure(({ deleteProvider, field, isEnabled, isExcluded, operator, providerId, togglePopover, val }) => {
    const deleteFilter = (event) => {
        // Make sure it doesn't also trigger the onclick for the whole badge
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        deleteProvider();
    };
    const classes = classnames_1.default('globalFilterItem', {
        'globalFilterItem-isDisabled': !isEnabled,
        'globalFilterItem-isExcluded': isExcluded,
    });
    const formattedValue = fp_1.isString(val) && val === '' ? empty_value_1.getEmptyString() : val;
    const prefix = isExcluded ? react_1.default.createElement("span", null,
        i18n.NOT,
        " ") : null;
    const title = `${field}: "${formattedValue}"`;
    return (react_1.default.createElement(ProviderBadgeStyled, { id: `${providerId}-${field}-${val}`, className: classes, color: "hollow", title: title, iconOnClick: deleteFilter, iconOnClickAriaLabel: i18n.REMOVE_DATA_PROVIDER, iconType: "cross", iconSide: "right", onClick: togglePopover, onClickAriaLabel: `${i18n.SHOW_OPTIONS_DATA_PROVIDER} ${formattedValue}`, closeButtonProps: {
            // Removing tab focus on close button because the same option can be obtained through the context menu
            // TODO: add a `DEL` keyboard press functionality
            tabIndex: '-1',
        }, "data-test-subj": "providerBadge" },
        prefix,
        operator !== data_provider_1.EXISTS_OPERATOR ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("span", { className: "field-value" }, `${field}: `),
            react_1.default.createElement("span", { className: "field-value" }, `"${formattedValue}"`))) : (react_1.default.createElement("span", { className: "field-value" },
            field,
            " ",
            i18n.EXISTS_LABEL))));
});
