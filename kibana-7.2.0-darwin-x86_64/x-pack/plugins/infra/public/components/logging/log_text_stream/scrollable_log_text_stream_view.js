"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = require("@kbn/i18n/react");
const react_2 = tslib_1.__importStar(require("react"));
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../../common/eui_styled_components"));
const handlers_1 = require("../../../utils/handlers");
const auto_sizer_1 = require("../../auto_sizer");
const empty_states_1 = require("../../empty_states");
const formatted_time_1 = require("../../formatted_time");
const loading_1 = require("../../loading");
const item_1 = require("./item");
const column_headers_1 = require("./column_headers");
const loading_item_view_1 = require("./loading_item_view");
const log_entry_row_1 = require("./log_entry_row");
const measurable_item_view_1 = require("./measurable_item_view");
const vertical_scroll_panel_1 = require("./vertical_scroll_panel");
const log_entry_column_1 = require("./log_entry_column");
const text_styles_1 = require("./text_styles");
class ScrollableLogTextStreamViewClass extends react_2.default.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            target: null,
            targetId: null,
        };
        this.handleOpenFlyout = (id) => {
            this.props.setFlyoutItem(id);
            this.props.setFlyoutVisibility(true);
        };
        this.handleReload = () => {
            const { jumpToTarget, target } = this.props;
            if (target) {
                jumpToTarget(target);
            }
        };
        this.handleLoadNewerItems = () => {
            const { loadNewerItems } = this.props;
            if (loadNewerItems) {
                loadNewerItems();
            }
        };
        // this is actually a method but not recognized as such
        // eslint-disable-next-line @typescript-eslint/member-ordering
        this.handleVisibleChildrenChange = handlers_1.callWithoutRepeats(({ topChild, middleChild, bottomChild, pagesAbove, pagesBelow, }) => {
            this.props.reportVisibleInterval({
                endKey: item_1.parseStreamItemId(bottomChild),
                middleKey: item_1.parseStreamItemId(middleChild),
                pagesAfterEnd: pagesBelow,
                pagesBeforeStart: pagesAbove,
                startKey: item_1.parseStreamItemId(topChild),
            });
        });
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const hasNewTarget = nextProps.target && nextProps.target !== prevState.target;
        const hasItems = nextProps.items.length > 0;
        if (nextProps.isStreaming && hasItems) {
            return {
                target: nextProps.target,
                targetId: item_1.getStreamItemId(nextProps.items[nextProps.items.length - 1]),
            };
        }
        else if (hasNewTarget && hasItems) {
            return {
                target: nextProps.target,
                targetId: item_1.getStreamItemId(item_1.getStreamItemBeforeTimeKey(nextProps.items, nextProps.target)),
            };
        }
        else if (!nextProps.target || !hasItems) {
            return {
                target: null,
                targetId: null,
            };
        }
        return null;
    }
    render() {
        const { columnConfigurations, hasMoreAfterEnd, hasMoreBeforeStart, highlightedItem, intl, isLoadingMore, isReloading, isStreaming, items, lastLoadedTime, scale, showColumnConfiguration, wrap, } = this.props;
        const { targetId } = this.state;
        const hasItems = items.length > 0;
        return (react_2.default.createElement(ScrollableLogTextStreamViewWrapper, null, isReloading && !hasItems ? (react_2.default.createElement(loading_1.InfraLoadingPanel, { width: "100%", height: "100%", text: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.logs.scrollableLogTextStreamView.loadingEntriesLabel", defaultMessage: "Loading entries" }) })) : !hasItems ? (react_2.default.createElement(empty_states_1.NoData, { titleText: intl.formatMessage({
                id: 'xpack.infra.logs.emptyView.noLogMessageTitle',
                defaultMessage: 'There are no log messages to display.',
            }), bodyText: intl.formatMessage({
                id: 'xpack.infra.logs.emptyView.noLogMessageDescription',
                defaultMessage: 'Try adjusting your filter.',
            }), refetchText: intl.formatMessage({
                id: 'xpack.infra.logs.emptyView.checkForNewDataButtonLabel',
                defaultMessage: 'Check for new data',
            }), onRefetch: this.handleReload, testString: "logsNoDataPrompt" })) : (react_2.default.createElement(WithColumnWidths, { columnConfigurations: columnConfigurations, scale: scale }, ({ columnWidths, CharacterDimensionsProbe }) => (react_2.default.createElement(react_2.default.Fragment, null,
            react_2.default.createElement(CharacterDimensionsProbe, null),
            react_2.default.createElement(column_headers_1.LogColumnHeaders, { columnConfigurations: columnConfigurations, columnWidths: columnWidths, showColumnConfiguration: showColumnConfiguration }),
            react_2.default.createElement(auto_sizer_1.AutoSizer, { content: true }, ({ measureRef, content: { width = 0, height = 0 } }) => (react_2.default.createElement(ScrollPanelSizeProbe, { innerRef: measureRef },
                react_2.default.createElement(vertical_scroll_panel_1.VerticalScrollPanel, { height: height, width: width, onVisibleChildrenChange: this.handleVisibleChildrenChange, target: targetId, hideScrollbar: true, "data-test-subj": 'logStream' }, registerChild => (react_2.default.createElement(react_2.default.Fragment, null,
                    react_2.default.createElement(loading_item_view_1.LogTextStreamLoadingItemView, { alignment: "bottom", isLoading: isLoadingMore, hasMore: hasMoreBeforeStart, isStreaming: false, lastStreamingUpdate: null }),
                    items.map(item => (react_2.default.createElement(measurable_item_view_1.MeasurableItemView, { register: registerChild, registrationKey: item_1.getStreamItemId(item), key: item_1.getStreamItemId(item) }, itemMeasureRef => (react_2.default.createElement(log_entry_row_1.LogEntryRow, { columnConfigurations: columnConfigurations, columnWidths: columnWidths, openFlyoutWithItem: this.handleOpenFlyout, boundingBoxRef: itemMeasureRef, logEntry: item.logEntry, scale: scale, wrap: wrap, isHighlighted: highlightedItem
                            ? item.logEntry.gid === highlightedItem
                            : false }))))),
                    react_2.default.createElement(loading_item_view_1.LogTextStreamLoadingItemView, { alignment: "top", isLoading: isStreaming || isLoadingMore, hasMore: hasMoreAfterEnd, isStreaming: isStreaming, lastStreamingUpdate: isStreaming ? lastLoadedTime : null, onLoadMore: this.handleLoadNewerItems })))))))))))));
    }
}
exports.ScrollableLogTextStreamView = react_1.injectI18n(ScrollableLogTextStreamViewClass);
/**
 * This function-as-child component calculates the column widths based on the
 * given configuration. It depends on the `CharacterDimensionsProbe` it returns
 * being rendered so it can measure the monospace character size.
 *
 * If the above component wasn't a class component, this would have been
 * written as a hook.
 */
const WithColumnWidths = ({ children, columnConfigurations, scale }) => {
    const { CharacterDimensionsProbe, dimensions } = text_styles_1.useMeasuredCharacterDimensions(scale);
    const referenceTime = react_2.useMemo(() => Date.now(), []);
    const formattedCurrentDate = formatted_time_1.useFormattedTime(referenceTime);
    const columnWidths = react_2.useMemo(() => log_entry_column_1.getColumnWidths(columnConfigurations, dimensions.width, formattedCurrentDate.length), [columnConfigurations, dimensions.width, formattedCurrentDate]);
    const childParams = react_2.useMemo(() => ({
        columnWidths,
        CharacterDimensionsProbe,
    }), [columnWidths, CharacterDimensionsProbe]);
    return children(childParams);
};
const ScrollableLogTextStreamViewWrapper = eui_styled_components_1.default.div `
  overflow: hidden;
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  align-items: stretch;
`;
const ScrollPanelSizeProbe = eui_styled_components_1.default.div `
  overflow: hidden;
  flex: 1 1 0%;
`;
