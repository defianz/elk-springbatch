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
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const loading_1 = require("../../loading");
const last_updated_1 = require("./last_updated");
const i18n = tslib_1.__importStar(require("./translations"));
const FixedWidthLastUpdated = styled_components_1.default.div `
  width: ${({ compact }) => (!compact ? 200 : 25)}px;
  overflow: hidden;
  text-align: end;
`;
const FooterContainer = styled_components_1.default(eui_1.EuiFlexGroup) `
  height: ${({ height }) => height}px;
`;
const FooterFlexGroup = styled_components_1.default(eui_1.EuiFlexGroup) `
  height: 35px;
  width: 100%;
`;
const LoadingPanelContainer = styled_components_1.default.div `
  padding-top: 3px;
`;
const PopoverRowItems = styled_components_1.default(eui_1.EuiPopover) `
  .euiButtonEmpty__content {
    padding: 0px 0px;
  }
`;
exports.ServerSideEventCount = styled_components_1.default.div `
  margin: 0 5px 0 5px;
`;
/** The height of the footer, exported for use in height calculations */
exports.footerHeight = 40; // px
exports.isCompactFooter = (width) => width < 600;
/** Displays the server-side count of events */
exports.EventsCount = recompose_1.pure(({ closePopover, isOpen, items, itemsCount, onClick, serverSideEventCount }) => (React.createElement("h5", null,
    React.createElement(PopoverRowItems, { className: "footer-popover", id: "customizablePagination", "data-test-subj": "timelineSizeRowPopover", button: React.createElement(React.Fragment, null,
            React.createElement(eui_1.EuiBadge, { color: "hollow" },
                itemsCount,
                React.createElement(eui_1.EuiButtonEmpty, { size: "s", color: "text", iconType: "arrowDown", iconSide: "right", onClick: onClick })),
            ` ${i18n.OF} `), isOpen: isOpen, closePopover: closePopover, panelPaddingSize: "none" },
        React.createElement(eui_1.EuiContextMenuPanel, { items: items, "data-test-subj": "timelinePickSizeRow" })),
    React.createElement(eui_1.EuiToolTip, { content: `${serverSideEventCount} ${i18n.TOTAL_COUNT_OF_EVENTS}` },
        React.createElement(exports.ServerSideEventCount, null,
            React.createElement(eui_1.EuiBadge, { color: "hollow" }, serverSideEventCount),
            " ",
            i18n.EVENTS)))));
exports.PagingControl = recompose_1.pure(({ hasNextPage, isLoading, loadMore }) => (React.createElement(React.Fragment, null, hasNextPage && (React.createElement(eui_1.EuiButton, { "data-test-subj": "TimelineMoreButton", isLoading: isLoading, onClick: loadMore, size: "s" }, isLoading ? `${i18n.LOADING}...` : i18n.LOAD_MORE)))));
/** Renders a loading indicator and paging controls */
class Footer extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            isPopoverOpen: false,
            paginationLoading: false,
            updatedAt: null,
        };
        this.loadMore = () => {
            this.setState(prevState => ({
                ...prevState,
                paginationLoading: true,
            }));
            this.props.onLoadMore(this.props.nextCursor, this.props.tieBreaker);
        };
        this.onButtonClick = () => {
            this.setState(prevState => ({
                ...prevState,
                isPopoverOpen: !prevState.isPopoverOpen,
            }));
        };
        this.closePopover = () => {
            this.setState(prevState => ({
                ...prevState,
                isPopoverOpen: false,
            }));
        };
    }
    componentDidUpdate(prevProps) {
        const { paginationLoading, updatedAt } = this.state;
        const { isLoading, getUpdatedAt } = this.props;
        if (paginationLoading && prevProps.isLoading && !isLoading) {
            this.setState(prevState => ({
                ...prevState,
                paginationLoading: false,
                updatedAt: getUpdatedAt(),
            }));
        }
        if (updatedAt === null || (prevProps.isLoading && !isLoading)) {
            this.setState(prevState => ({
                ...prevState,
                updatedAt: getUpdatedAt(),
            }));
        }
    }
    render() {
        const { height, isLive, isLoading, itemsCount, itemsPerPage, itemsPerPageOptions, onChangeItemsPerPage, serverSideEventCount, hasNextPage, getUpdatedAt, width, } = this.props;
        if (isLoading && !this.state.paginationLoading) {
            return (React.createElement(LoadingPanelContainer, null,
                React.createElement(loading_1.LoadingPanel, { "data-test-subj": "LoadingPanelTimeline", height: "35px", showBorder: false, text: `${i18n.LOADING_TIMELINE_DATA}...`, width: "100%" })));
        }
        const rowItems = itemsPerPageOptions &&
            itemsPerPageOptions.map(item => (React.createElement(eui_1.EuiContextMenuItem, { key: item, icon: itemsPerPage === item ? 'check' : 'empty', onClick: () => {
                    this.closePopover();
                    onChangeItemsPerPage(item);
                } }, `${item} ${i18n.ROWS}`)));
        return (React.createElement(React.Fragment, null,
            React.createElement(FooterContainer, { "data-test-subj": "timeline-footer", direction: "column", height: height, gutterSize: "none", justifyContent: "spaceAround" },
                React.createElement(FooterFlexGroup, { alignItems: "center", "data-test-subj": "footer-flex-group", direction: "row", gutterSize: "none", justifyContent: "spaceBetween" },
                    React.createElement(eui_1.EuiFlexItem, { "data-test-subj": "event-count-container", grow: false },
                        React.createElement(eui_1.EuiFlexGroup, { alignItems: "center", "data-test-subj": "events-count", direction: "row", gutterSize: "none" },
                            React.createElement(exports.EventsCount, { closePopover: this.closePopover, isOpen: this.state.isPopoverOpen, items: rowItems, itemsCount: itemsCount, onClick: this.onButtonClick, serverSideEventCount: serverSideEventCount }))),
                    React.createElement(eui_1.EuiFlexItem, { "data-test-subj": "paging-control-container", grow: false }, isLive ? (React.createElement(eui_1.EuiText, { size: "s", "data-test-subj": "is-live-on-message" },
                        React.createElement("b", null,
                            i18n.AUTO_REFRESH_ACTIVE,
                            React.createElement(eui_1.EuiIconTip, { content: React.createElement(react_1.FormattedMessage, { id: "xpack.siem.footer.autoRefreshActiveTooltip", defaultMessage: "While auto-refresh is enabled, timeline will show you the latest {numberOfItems} events that match your query.", values: {
                                        numberOfItems: itemsCount,
                                    } }), position: "top" })))) : (React.createElement(exports.PagingControl, { "data-test-subj": "paging-control", hasNextPage: hasNextPage, isLoading: isLoading, loadMore: this.loadMore }))),
                    React.createElement(eui_1.EuiFlexItem, { "data-test-subj": "last-updated-container", grow: false },
                        React.createElement(FixedWidthLastUpdated, { "data-test-subj": "fixed-width-last-updated", compact: exports.isCompactFooter(width) },
                            React.createElement(last_updated_1.LastUpdatedAt, { updatedAt: this.state.updatedAt || getUpdatedAt(), compact: exports.isCompactFooter(width) })))))));
    }
}
exports.Footer = Footer;
