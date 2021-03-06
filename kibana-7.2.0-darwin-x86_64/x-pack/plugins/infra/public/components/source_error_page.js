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
const error_page_1 = require("./error_page");
exports.SourceErrorPage = ({ errorMessage, retry, }) => (react_2.default.createElement(error_page_1.ErrorPage, { shortMessage: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.sourceErrorPage.failedToLoadDataSourcesMessage", defaultMessage: "Failed to load data sources." }), detailedMessage: react_2.default.createElement("code", null, errorMessage), retry: retry }));
