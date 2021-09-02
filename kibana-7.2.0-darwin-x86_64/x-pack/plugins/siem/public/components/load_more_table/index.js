"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const fp_1 = require("lodash/fp");
const react_1 = tslib_1.__importDefault(require("react"));
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const header_panel_1 = require("../header_panel");
const loading_1 = require("../loading");
const i18n = tslib_1.__importStar(require("./translations"));
class LoadMoreTable extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            isEmptyTable: this.props.pageOfItems.length === 0,
            isPopoverOpen: false,
            paginationLoading: false,
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
    static getDerivedStateFromProps(props, state) {
        if (state.isEmptyTable && !fp_1.isEmpty(props.pageOfItems)) {
            return {
                ...state,
                isEmptyTable: false,
            };
        }
        return null;
    }
    render() {
        const { columns, hasNextPage, headerCount, headerSupplement, headerTitle, headerTooltip, headerUnit, itemsPerRow, limit, loading, loadingTitle, onChange = fp_1.noop, pageOfItems, sorting = null, updateLimitPagination, } = this.props;
        const { isEmptyTable } = this.state;
        if (loading && isEmptyTable) {
            return (react_1.default.createElement(eui_1.EuiPanel, null,
                react_1.default.createElement(loading_1.LoadingPanel, { height: "auto", width: "100%", text: `${i18n.LOADING} ${loadingTitle ? loadingTitle : headerTitle}`, "data-test-subj": "InitialLoadingPanelLoadMoreTable" })));
        }
        const button = (react_1.default.createElement(eui_1.EuiButtonEmpty, { size: "s", color: "text", iconType: "arrowDown", iconSide: "right", onClick: this.onButtonClick }, `${i18n.ROWS}: ${limit}`));
        const rowItems = itemsPerRow &&
            itemsPerRow.map(item => (react_1.default.createElement(eui_1.EuiContextMenuItem, { key: item.text, icon: limit === item.numberOfRow ? 'check' : 'empty', onClick: () => {
                    this.closePopover();
                    updateLimitPagination(item.numberOfRow);
                } }, item.text)));
        return (react_1.default.createElement(eui_1.EuiPanel, null,
            react_1.default.createElement(exports.BasicTableContainer, null,
                loading && (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(BackgroundRefetch, null),
                    react_1.default.createElement(loading_1.LoadingPanel, { height: "100%", width: "100%", text: `${i18n.LOADING} ${loadingTitle ? loadingTitle : headerTitle}`, position: "absolute", zIndex: 3, "data-test-subj": "LoadingPanelLoadMoreTable" }))),
                react_1.default.createElement(header_panel_1.HeaderPanel, { subtitle: `${i18n.SHOWING}: ${headerCount.toLocaleString()} ${headerUnit}`, title: headerTitle, tooltip: headerTooltip }, headerSupplement),
                react_1.default.createElement(BasicTable, { items: pageOfItems, columns: columns, onChange: onChange, sorting: sorting
                        ? {
                            sort: {
                                field: sorting.field,
                                direction: sorting.direction,
                            },
                        }
                        : null }),
                hasNextPage && (react_1.default.createElement(FooterAction, null,
                    react_1.default.createElement(eui_1.EuiFlexGroup, { gutterSize: "none", alignItems: "flexStart", justifyContent: "flexStart", direction: "row" },
                        react_1.default.createElement(eui_1.EuiFlexItem, { grow: false }, !fp_1.isEmpty(itemsPerRow) && (react_1.default.createElement(eui_1.EuiPopover, { id: "customizablePagination", "data-test-subj": "loadingMoreSizeRowPopover", button: button, isOpen: this.state.isPopoverOpen, closePopover: this.closePopover, panelPaddingSize: "none" },
                            react_1.default.createElement(eui_1.EuiContextMenuPanel, { items: rowItems, "data-test-subj": "loadingMorePickSizeRow" })))),
                        react_1.default.createElement(eui_1.EuiFlexItem, null,
                            react_1.default.createElement(eui_1.EuiFlexGroup, { gutterSize: "none", alignItems: "flexStart", justifyContent: "center", direction: "row" },
                                react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                                    react_1.default.createElement(eui_1.EuiButton, { "data-test-subj": "loadingMoreButton", isLoading: loading, onClick: this.props.loadMore }, loading ? `${i18n.LOADING}` : i18n.LOAD_MORE))))))))));
    }
}
exports.LoadMoreTable = LoadMoreTable;
exports.BasicTableContainer = styled_components_1.default.div `
  position: relative;
`;
const FooterAction = styled_components_1.default.div `
  margin-top: 0.5rem;
  width: 100%;
`;
/*
 *   The getOr is just there to simplify the test
 *   So we do NOT need to wrap it around TestProvider
 */
const BackgroundRefetch = styled_components_1.default.div `
  background-color: ${props => fp_1.getOr('#ffffff', 'theme.eui.euiColorLightShade', props)};
  margin: -5px;
  height: calc(100% + 10px);
  opacity: 0.7;
  width: calc(100% + 10px);
  position: absolute;
  z-index: 3;
  border-radius: 5px;
`;
const BasicTable = styled_components_1.default(eui_1.EuiBasicTable) `
  tbody {
    th,
    td {
      vertical-align: top;
    }
  }
`;
