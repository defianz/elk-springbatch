"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const fp_1 = require("lodash/fp");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importStar(require("styled-components"));
const helpers_1 = require("./helpers");
exports.EVENTS_SELECT_WIDTH = 60; // px
// SIDE EFFECT: the following `injectGlobal` overrides
// the style of the select items
// eslint-disable-next-line
styled_components_1.injectGlobal `
  .eventsSelectItem {
    width: 100% !important;

    .euiContextMenu__icon {
      display: none !important;
    }
  }

  .eventsSelectDropdown {
    width: ${exports.EVENTS_SELECT_WIDTH}px;
  }
`;
const CheckboxContainer = styled_components_1.default.div `
  position: relative;
`;
const PositionedCheckbox = styled_components_1.default.div `
  left: 7px;
  position: absolute;
  top: -28px;
`;
exports.EventsSelect = recompose_1.pure(({ checkState, timelineId }) => {
    return (React.createElement("div", { "data-test-subj": "events-select" },
        React.createElement(eui_1.EuiSuperSelect, { className: "eventsSelectDropdown", "data-test-subj": "events-select-dropdown", itemClassName: "eventsSelectItem", onChange: fp_1.noop, options: helpers_1.getEventsSelectOptions(), valueOfSelected: '' }),
        React.createElement(CheckboxContainer, { "data-test-subj": "timeline-events-select-checkbox-container" },
            React.createElement(PositionedCheckbox, { "data-test-subj": "timeline-events-select-positioned-checkbox" },
                React.createElement(eui_1.EuiCheckbox, { checked: checkState === 'checked', "data-test-subj": "events-select-checkbox", disabled: true, id: `timeline-${timelineId}-events-select`, indeterminate: checkState === 'indeterminate', onChange: fp_1.noop })))));
});
