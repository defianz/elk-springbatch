"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const header_page_1 = require("../../components/header_page");
const open_timeline_1 = require("../../components/open_timeline");
const i18n = tslib_1.__importStar(require("./translations"));
const TimelinesContainer = styled_components_1.default.div `
  width: 100%:
`;
exports.DEFAULT_SEARCH_RESULTS_PER_PAGE = 10;
class TimelinesPage extends react_1.default.PureComponent {
    render() {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(header_page_1.HeaderPage, { title: i18n.PAGE_TITLE }),
            react_1.default.createElement(TimelinesContainer, null,
                react_1.default.createElement(open_timeline_1.StatefulOpenTimeline, { apolloClient: this.props.apolloClient, defaultPageSize: exports.DEFAULT_SEARCH_RESULTS_PER_PAGE, isModal: false, title: i18n.ALL_TIMELINES_PANEL_TITLE }))));
    }
}
exports.TimelinesPage = TimelinesPage;
