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
const React = tslib_1.__importStar(require("react"));
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const field_badge_1 = require("../../../../draggables/field_badge");
const resize_handle_1 = require("../../../../resize_handle");
const styled_handles_1 = require("../../../../resize_handle/styled_handles");
const truncatable_text_1 = require("../../../../truncatable_text");
const with_hover_actions_1 = require("../../../../with_hover_actions");
const actions_1 = require("../actions");
const styles_1 = require("../common/styles");
const filter_1 = require("../filter");
const header_tooltip_content_1 = require("../header_tooltip_content");
const helpers_1 = require("./helpers");
const TITLE_PADDING = 10; // px
const RESIZE_HANDLE_HEIGHT = 35; // px
const HeaderContainer = styled_components_1.default(eui_1.EuiFlexGroup) `
  display: flex;
  height: 100%;
  overflow: hidden;
  width: ${({ width }) => width};
`;
const HeaderFlexItem = styled_components_1.default(eui_1.EuiFlexItem) `
  width: ${({ width }) => width};
`;
const HeaderDiv = styled_components_1.default.div `
  cursor: ${({ isLoading }) => (isLoading ? 'default' : 'grab')};
  display: flex;
  height: 100%;
  flex-direction: row;
  overflow: hidden;
`;
const TruncatableHeaderText = styled_components_1.default(truncatable_text_1.TruncatableText) `
  font-weight: bold;
  padding: 5px;
`;
/** Renders a header */
class Header extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.renderActions = (isResizing) => {
            const { header, isLoading, onColumnRemoved, onFilterChange = fp_1.noop, setIsResizing, sort, } = this.props;
            setIsResizing(isResizing);
            return (React.createElement(HeaderFlexItem, { grow: false, width: `${header.width - styled_handles_1.CELL_RESIZE_HANDLE_WIDTH}px` },
                React.createElement(with_hover_actions_1.WithHoverActions, { render: showHoverContent => (React.createElement(React.Fragment, null,
                        React.createElement(HeaderDiv, { "data-test-subj": "header", isLoading: isLoading, onClick: !isResizing ? this.onClick : fp_1.noop },
                            React.createElement(eui_1.EuiToolTip, { "data-test-subj": "header-tooltip", content: React.createElement(header_tooltip_content_1.HeaderToolTipContent, { header: header }) },
                                React.createElement(styles_1.FullHeightFlexGroup, { "data-test-subj": "header-items", alignItems: "center", gutterSize: "none" },
                                    React.createElement(eui_1.EuiFlexItem, { grow: false },
                                        React.createElement(field_badge_1.FieldNameContainer, null,
                                            React.createElement(TruncatableHeaderText, { "data-test-subj": "header-text", size: "xs", width: `${header.width -
                                                    (actions_1.ACTIONS_WIDTH + styled_handles_1.CELL_RESIZE_HANDLE_WIDTH + TITLE_PADDING)}px` }, header.id))),
                                    React.createElement(styles_1.FullHeightFlexItem, null,
                                        React.createElement(actions_1.Actions, { header: header, isLoading: isLoading, onColumnRemoved: onColumnRemoved, show: header.id !== '@timestamp' ? showHoverContent : false, sort: sort }))))),
                        React.createElement(filter_1.Filter, { header: header, onFilterChange: onFilterChange }))) })));
        };
        this.onClick = () => {
            const { header, isLoading, onColumnSorted, sort } = this.props;
            if (!isLoading && header.aggregatable) {
                onColumnSorted({
                    columnId: header.id,
                    sortDirection: helpers_1.getNewSortDirectionOnClick({
                        clickedHeader: header,
                        currentSort: sort,
                    }),
                });
            }
        };
        this.onResize = ({ delta, id }) => {
            this.props.onColumnResized({ columnId: id, delta });
        };
    }
    render() {
        const { header } = this.props;
        return (React.createElement(HeaderContainer, { "data-test-subj": "header-container", gutterSize: "none", key: header.id, width: `${header.width}px` },
            React.createElement(resize_handle_1.Resizeable, { handle: React.createElement(styles_1.FullHeightFlexItem, { grow: false },
                    React.createElement(styled_handles_1.ColumnHeaderResizeHandle, null)), height: `${RESIZE_HANDLE_HEIGHT}px`, id: header.id, render: this.renderActions, onResize: this.onResize })));
    }
}
exports.Header = Header;
