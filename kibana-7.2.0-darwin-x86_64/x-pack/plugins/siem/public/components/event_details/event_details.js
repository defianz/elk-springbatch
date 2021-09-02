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
const event_fields_browser_1 = require("./event_fields_browser");
const json_view_1 = require("./json_view");
const i18n = tslib_1.__importStar(require("./translations"));
const Details = styled_components_1.default.div `
  user-select: none;
  width: 100%;
`;
exports.EventDetails = recompose_1.pure(({ browserFields, data, id, isLoading, view, onUpdateColumns, onViewSelected, timelineId }) => {
    const tabs = [
        {
            id: 'table-view',
            name: i18n.TABLE,
            content: (React.createElement(event_fields_browser_1.EventFieldsBrowser, { browserFields: browserFields, data: data, eventId: id, isLoading: isLoading, onUpdateColumns: onUpdateColumns, timelineId: timelineId })),
        },
        {
            id: 'json-view',
            name: i18n.JSON_VIEW,
            content: React.createElement(json_view_1.JsonView, { data: data }),
        },
    ];
    return (React.createElement(Details, { "data-test-subj": "eventDetails" },
        React.createElement(eui_1.EuiTabbedContent, { tabs: tabs, selectedTab: view === 'table-view' ? tabs[0] : tabs[1], onTabClick: e => onViewSelected(e.id) })));
});
