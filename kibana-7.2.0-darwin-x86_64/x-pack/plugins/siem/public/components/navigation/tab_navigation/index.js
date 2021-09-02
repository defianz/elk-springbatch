"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const eui_1 = require("@elastic/eui");
const React = tslib_1.__importStar(require("react"));
const link_to_1 = require("../../link_to");
const track_usage_1 = require("../../../lib/track_usage");
const i18n = tslib_1.__importStar(require("../translations"));
const navTabs = [
    {
        id: 'overview',
        name: i18n.OVERVIEW,
        href: link_to_1.getOverviewUrl(),
        disabled: false,
    },
    {
        id: 'hosts',
        name: i18n.HOSTS,
        href: link_to_1.getHostsUrl(),
        disabled: false,
    },
    {
        id: 'network',
        name: i18n.NETWORK,
        href: link_to_1.getNetworkUrl(),
        disabled: false,
    },
    {
        id: 'timelines',
        name: i18n.TIMELINES,
        href: link_to_1.getTimelinesUrl(),
        disabled: false,
    },
];
class TabNavigation extends React.PureComponent {
    constructor(props) {
        super(props);
        this.mapLocationToTab = (pathname) => navTabs.reduce((res, tab) => {
            if (pathname.includes(tab.id)) {
                res = tab.id;
            }
            return res;
        }, '');
        this.handleTabClick = (href, id) => {
            this.setState(prevState => ({
                ...prevState,
                selectedTabId: id,
            }));
            track_usage_1.trackUiAction(`tab_${id}`);
            window.location.assign(href);
        };
        this.renderTabs = () => navTabs.map((tab) => (React.createElement(eui_1.EuiTab, { "data-href": tab.href, "data-test-subj": `navigation-${tab.id}`, disabled: tab.disabled, isSelected: this.state.selectedTabId === tab.id, key: `navigation-${tab.id}`, onClick: () => this.handleTabClick(tab.href, tab.id) }, tab.name)));
        const pathname = props.location;
        const selectedTabId = this.mapLocationToTab(pathname);
        this.state = {
            selectedTabId,
        };
    }
    componentWillReceiveProps(nextProps) {
        const pathname = nextProps.location;
        const selectedTabId = this.mapLocationToTab(pathname);
        if (this.state.selectedTabId !== selectedTabId) {
            this.setState(prevState => ({
                ...prevState,
                selectedTabId,
            }));
        }
    }
    render() {
        return React.createElement(eui_1.EuiTabs, { display: "condensed" }, this.renderTabs());
    }
}
exports.TabNavigation = TabNavigation;
