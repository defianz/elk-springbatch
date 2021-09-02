"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
exports.ResponsiveFlyout = styled_components_1.default(eui_1.EuiFlyout) `
  width: 100%;

  @media (min-width: 800px) {
    width: 90%;
  }

  @media (min-width: 1000px) {
    width: 80%;
  }

  @media (min-width: 1400px) {
    width: 70%;
  }

  @media (min-width: 2000px) {
    width: 60%;
  }
`;
