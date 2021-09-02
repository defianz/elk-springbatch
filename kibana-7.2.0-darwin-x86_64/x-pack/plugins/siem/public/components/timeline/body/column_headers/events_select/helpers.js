"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const pin_1 = require("../../../../pin");
const i18n = tslib_1.__importStar(require("./translations"));
const InputDisplay = styled_components_1.default.div `
  width: 5px;
`;
const PinIconContainer = styled_components_1.default.div `
  margin-right: 5px;
`;
const PinActionItem = styled_components_1.default.div `
  display: flex;
  flex-direction: row;
`;
exports.DropdownDisplay = recompose_1.pure(({ text }) => (React.createElement(eui_1.EuiText, { size: "s", color: "subdued" }, text)));
exports.getEventsSelectOptions = () => [
    {
        inputDisplay: React.createElement(InputDisplay, null),
        disabled: true,
        dropdownDisplay: React.createElement(exports.DropdownDisplay, { text: i18n.SELECT_ALL }),
        value: 'select-all',
    },
    {
        inputDisplay: React.createElement(InputDisplay, null),
        disabled: true,
        dropdownDisplay: React.createElement(exports.DropdownDisplay, { text: i18n.SELECT_NONE }),
        value: 'select-none',
    },
    {
        inputDisplay: React.createElement(InputDisplay, null),
        disabled: true,
        dropdownDisplay: React.createElement(exports.DropdownDisplay, { text: i18n.SELECT_PINNED }),
        value: 'select-pinned',
    },
    {
        inputDisplay: React.createElement(InputDisplay, null),
        disabled: true,
        dropdownDisplay: React.createElement(exports.DropdownDisplay, { text: i18n.SELECT_UNPINNED }),
        value: 'select-unpinned',
    },
    {
        inputDisplay: React.createElement(InputDisplay, null),
        disabled: true,
        dropdownDisplay: (React.createElement(PinActionItem, null,
            React.createElement(PinIconContainer, null,
                React.createElement(pin_1.Pin, { allowUnpinning: true, pinned: true })),
            React.createElement(exports.DropdownDisplay, { text: i18n.PIN_SELECTED }))),
        value: 'pin-selected',
    },
    {
        inputDisplay: React.createElement(InputDisplay, null),
        disabled: true,
        dropdownDisplay: (React.createElement(PinActionItem, null,
            React.createElement(PinIconContainer, null,
                React.createElement(pin_1.Pin, { allowUnpinning: true, pinned: false })),
            React.createElement(exports.DropdownDisplay, { text: i18n.UNPIN_SELECTED }))),
        value: 'unpin-selected',
    },
];
