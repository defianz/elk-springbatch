"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const moment_1 = tslib_1.__importDefault(require("moment"));
const react_1 = tslib_1.__importDefault(require("react"));
const recompose_1 = require("recompose");
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const documentation_links_1 = require("ui/documentation_links");
const header_page_1 = require("../../components/header_page");
const overview_host_1 = require("../../components/page/overview/overview_host");
const overview_network_1 = require("../../components/page/overview/overview_network");
const global_time_1 = require("../../containers/global_time");
const summary_1 = require("./summary");
const empty_page_1 = require("../../components/empty_page");
const source_1 = require("../../containers/source");
const i18n = tslib_1.__importStar(require("./translations"));
const basePath = chrome_1.default.getBasePath();
exports.OverviewComponent = recompose_1.pure(() => {
    const dateEnd = Date.now();
    const dateRange = moment_1.default.duration(24, 'hours').asMilliseconds();
    const dateStart = dateEnd - dateRange;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(header_page_1.HeaderPage, { badgeLabel: i18n.PAGE_BADGE_LABEL, badgeTooltip: i18n.PAGE_BADGE_TOOLTIP, subtitle: i18n.PAGE_SUBTITLE, title: i18n.PAGE_TITLE }),
        react_1.default.createElement(source_1.WithSource, { sourceId: "default" }, ({ indicesExist }) => source_1.indicesExistOrDataTemporarilyUnavailable(indicesExist) ? (react_1.default.createElement(global_time_1.GlobalTime, null, ({ setQuery }) => (react_1.default.createElement(eui_1.EuiFlexGroup, null,
            react_1.default.createElement(summary_1.Summary, null),
            react_1.default.createElement(overview_host_1.OverviewHost, { endDate: dateEnd, startDate: dateStart, setQuery: setQuery }),
            react_1.default.createElement(overview_network_1.OverviewNetwork, { endDate: dateEnd, startDate: dateStart, setQuery: setQuery }))))) : (react_1.default.createElement(empty_page_1.EmptyPage, { actionPrimaryIcon: "gear", actionPrimaryLabel: i18n.EMPTY_ACTION_PRIMARY, actionPrimaryUrl: `${basePath}/app/kibana#/home/tutorial_directory/security`, actionSecondaryIcon: "popout", actionSecondaryLabel: i18n.EMPTY_ACTION_SECONDARY, actionSecondaryTarget: "_blank", actionSecondaryUrl: documentation_links_1.documentationLinks.siem, "data-test-subj": "empty-page", title: i18n.EMPTY_TITLE })))));
});
