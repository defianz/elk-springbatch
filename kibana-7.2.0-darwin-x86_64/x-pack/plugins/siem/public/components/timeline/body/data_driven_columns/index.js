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
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const resize_handle_1 = require("../../../resize_handle");
const styled_handles_1 = require("../../../resize_handle/styled_handles");
const styles_1 = require("../column_headers/common/styles");
const get_column_renderer_1 = require("../renderers/get_column_renderer");
const Cell = styled_components_1.default.div `
  background: ${({ index, theme }) => index % 2 === 0 && theme.darkMode
    ? theme.eui.euiFormBackgroundColor
    : index % 2 === 0 && !theme.darkMode
        ? theme.eui.euiColorLightestShade
        : 'inherit'};
  border-top: 1px solid ${({ theme }) => theme.eui.euiColorLightShade};
  height: 100%;
  overflow: hidden;
  padding: 5px;
  user-select: none;
  width: ${({ width }) => width};
`;
const CellContainer = styled_components_1.default(eui_1.EuiFlexGroup) `
  display: flex;
  height: 100%;
  overflow: hidden;
  width: ${({ width }) => width};
`;
class DataDrivenColumns extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.renderCell = (header, index) => () => {
            const { columnRenderers, data, _id } = this.props;
            return (React.createElement(eui_1.EuiFlexItem, { grow: false },
                React.createElement(Cell, { "data-test-subj": "column-cell", index: index, width: `${header.width - styled_handles_1.CELL_RESIZE_HANDLE_WIDTH}px` }, get_column_renderer_1.getColumnRenderer(header.id, columnRenderers, data).renderColumn({
                    columnName: header.id,
                    eventId: _id,
                    values: getMappedNonEcsValue({
                        data,
                        fieldName: header.id,
                    }),
                    field: header,
                    width: `${header.width - styled_handles_1.CELL_RESIZE_HANDLE_WIDTH}px`,
                }))));
        };
        this.onResize = ({ delta, id }) => {
            this.props.onColumnResized({ columnId: id, delta });
        };
    }
    render() {
        const { columnHeaders } = this.props;
        return (React.createElement(eui_1.EuiFlexGroup, { "data-test-subj": "data-driven-columns", direction: "row", gutterSize: "none" }, columnHeaders.map((header, index) => (React.createElement(eui_1.EuiFlexItem, { grow: false, key: header.id },
            React.createElement(CellContainer, { "data-test-subj": "cell-container", gutterSize: "none", key: header.id, width: `${header.width}px` },
                React.createElement(resize_handle_1.Resizeable, { handle: React.createElement(styles_1.FullHeightFlexItem, { grow: false },
                        React.createElement(styled_handles_1.CellResizeHandle, { "data-test-subj": "cell-resize-handle" })), height: "100%", id: header.id, key: header.id, render: this.renderCell(header, index), onResize: this.onResize })))))));
    }
}
exports.DataDrivenColumns = DataDrivenColumns;
const getMappedNonEcsValue = ({ data, fieldName, }) => {
    const item = data.find(d => d.field === fieldName);
    if (item != null && item.value != null) {
        return item.value;
    }
    return undefined;
};
