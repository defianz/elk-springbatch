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
const i18n = tslib_1.__importStar(require("./translations"));
const RoundedBadge = styled_components_1.default(eui_1.EuiBadge) `
  align-items: center;
  border-radius: 100%;
  display: inline-flex;
  font-size: 9px;
  height: 19px;
  justify-content: center;
  margin: 0 5px 0 5px;
  padding: 7px 6px 4px 6px;
  user-select: none;
  width: 19px;

  .euiBadge__content {
    position: relative;
    top: -1px;
  }

  .euiBadge__text {
    text-overflow: clip;
  }
`;
/** Displays AND / OR in a round badge */
exports.AndOrBadge = recompose_1.pure(({ type }) => (React.createElement(RoundedBadge, { "data-test-subj": "and-or-badge", color: "hollow" }, type === 'and' ? i18n.AND : i18n.OR)));
