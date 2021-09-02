"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const recompose_1 = require("recompose");
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const documentation_links_1 = require("ui/documentation_links");
const empty_page_1 = require("../../components/empty_page");
const i18n = tslib_1.__importStar(require("./translations"));
const basePath = chrome_1.default.getBasePath();
exports.NetworkEmptyPage = recompose_1.pure(() => (react_1.default.createElement(empty_page_1.EmptyPage, { actionPrimaryIcon: "gear", actionPrimaryLabel: i18n.EMPTY_ACTION_PRIMARY, actionPrimaryUrl: `${basePath}/app/kibana#/home/tutorial_directory/security`, actionSecondaryIcon: "popout", actionSecondaryLabel: i18n.EMPTY_ACTION_SECONDARY, actionSecondaryTarget: "_blank", actionSecondaryUrl: documentation_links_1.documentationLinks.siem, "data-test-subj": "empty-page", title: i18n.EMPTY_TITLE })));
