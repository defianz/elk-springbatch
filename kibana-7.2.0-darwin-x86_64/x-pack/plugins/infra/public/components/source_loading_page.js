"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = require("@kbn/i18n/react");
const react_2 = tslib_1.__importDefault(require("react"));
const loading_page_1 = require("./loading_page");
exports.SourceLoadingPage = () => (react_2.default.createElement(loading_page_1.LoadingPage, { message: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.sourceLoadingPage.loadingDataSourcesMessage", defaultMessage: "Loading data sources" }) }));
