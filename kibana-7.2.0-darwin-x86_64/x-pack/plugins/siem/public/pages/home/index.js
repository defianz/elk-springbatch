"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
const React = tslib_1.__importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const auto_sizer_1 = require("../../components/auto_sizer");
const drag_drop_context_wrapper_1 = require("../../components/drag_and_drop/drag_drop_context_wrapper");
const flyout_1 = require("../../components/flyout");
const help_menu_1 = require("../../components/help_menu");
const link_to_1 = require("../../components/link_to");
const navigation_1 = require("../../components/navigation");
const timeline_1 = require("../../components/timeline");
const auto_save_warning_1 = require("../../components/timeline/auto_save_warning");
const _404_1 = require("../404");
const hosts_1 = require("../hosts");
const network_1 = require("../network");
const overview_1 = require("../overview");
const timelines_1 = require("../timelines");
const source_1 = require("../../containers/source");
const url_state_1 = require("../../components/url_state");
const WrappedByAutoSizer = styled_components_1.default.div `
  height: 100%;
`;
const gutterTimeline = '70px'; // Temporary until timeline is moved - MichaelMarcialis
const Page = styled_components_1.default(eui_1.EuiPage) `
  ${({ theme }) => `
    padding: 0 ${gutterTimeline} ${theme.eui.euiSizeL} ${theme.eui.euiSizeL};
  `}
`;
const NavGlobal = styled_components_1.default.nav `
  ${({ theme }) => `
    background: ${theme.eui.euiColorEmptyShade};
    border-bottom: ${theme.eui.euiBorderThin};
    margin: 0 -${gutterTimeline} 0 -${theme.eui.euiSizeL};
    padding: ${theme.eui.euiSize} ${gutterTimeline} ${theme.eui.euiSize} ${theme.eui.euiSizeL};
  `}
`;
const usersViewing = ['elastic']; // TODO: get the users viewing this timeline from Elasticsearch (persistance)
/** Returns true if we are running with the k7 design */
const isK7Design = () => chrome_1.default.getUiSettingsClient().get('k7design');
/** the global Kibana navigation at the top of every page */
const globalHeaderHeightPx = isK7Design ? 48 : 0;
const calculateFlyoutHeight = ({ globalHeaderSize, windowHeight, }) => Math.max(0, windowHeight - globalHeaderSize);
exports.HomePage = recompose_1.pure(() => (React.createElement(auto_sizer_1.AutoSizer, { detectAnyWindowResize: true, content: true }, ({ measureRef, windowMeasurement: { height: windowHeight = 0 } }) => (React.createElement(WrappedByAutoSizer, { "data-test-subj": "wrapped-by-auto-sizer", innerRef: measureRef },
    React.createElement(Page, { "data-test-subj": "pageContainer" },
        React.createElement(help_menu_1.HelpMenu, null),
        React.createElement(source_1.WithSource, { sourceId: "default" }, ({ browserFields, indexPattern }) => (React.createElement(drag_drop_context_wrapper_1.DragDropContextWrapper, { browserFields: browserFields },
            React.createElement(auto_save_warning_1.AutoSaveWarningMsg, null),
            React.createElement(flyout_1.Flyout, { flyoutHeight: calculateFlyoutHeight({
                    globalHeaderSize: globalHeaderHeightPx,
                    windowHeight,
                }), headerHeight: flyout_1.flyoutHeaderHeight, timelineId: "timeline-1", usersViewing: usersViewing },
                React.createElement(timeline_1.StatefulTimeline, { flyoutHeaderHeight: flyout_1.flyoutHeaderHeight, flyoutHeight: calculateFlyoutHeight({
                        globalHeaderSize: globalHeaderHeightPx,
                        windowHeight,
                    }), id: "timeline-1" })),
            React.createElement(eui_1.EuiPageBody, null,
                React.createElement(NavGlobal, null,
                    React.createElement(eui_1.EuiFlexGroup, { alignItems: "center", gutterSize: "m", justifyContent: "spaceBetween" },
                        React.createElement(eui_1.EuiFlexItem, null,
                            React.createElement(navigation_1.SiemNavigation, null),
                            React.createElement(url_state_1.UrlStateContainer, { indexPattern: indexPattern })),
                        React.createElement(eui_1.EuiFlexItem, { grow: false },
                            React.createElement(eui_1.EuiButton, { "data-test-subj": "add-data", href: "kibana#home/tutorial_directory/security", iconType: "plusInCircle" },
                                React.createElement(react_1.FormattedMessage, { id: "xpack.siem.global.addData", defaultMessage: "Add data" }))))),
                React.createElement(react_router_dom_1.Switch, null,
                    React.createElement(react_router_dom_1.Redirect, { from: "/", exact: true, to: "/overview" }),
                    React.createElement(react_router_dom_1.Route, { path: "/overview", component: overview_1.Overview }),
                    React.createElement(react_router_dom_1.Route, { path: "/hosts", component: hosts_1.HostsContainer }),
                    React.createElement(react_router_dom_1.Route, { path: "/network", component: network_1.NetworkContainer }),
                    React.createElement(react_router_dom_1.Route, { path: "/timelines", component: timelines_1.Timelines }),
                    React.createElement(react_router_dom_1.Route, { path: "/link-to", component: link_to_1.LinkToPage }),
                    React.createElement(react_router_dom_1.Route, { component: _404_1.NotFoundPage }))))))))))));
