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
const netflow_1 = require("../netflow");
const zeek_signature_1 = require("./zeek_signature");
const Details = styled_components_1.default.div `
  margin: 10px 0;
`;
exports.ZeekDetails = recompose_1.pure(({ data }) => data.zeek != null ? (React.createElement(Details, null,
    React.createElement(zeek_signature_1.ZeekSignature, { data: data }),
    React.createElement(eui_1.EuiSpacer, { size: "s" }),
    React.createElement(netflow_1.NetflowRenderer, { data: data }))) : null);
