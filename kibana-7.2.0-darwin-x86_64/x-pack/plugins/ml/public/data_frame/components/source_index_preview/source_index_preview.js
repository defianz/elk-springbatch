"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const moment_timezone_1 = tslib_1.__importDefault(require("moment-timezone"));
const i18n_1 = require("@kbn/i18n");
const eui_1 = require("@elastic/eui");
const ExpandableTable = eui_1.EuiInMemoryTable;
const field_types_1 = require("../../../../common/constants/field_types");
const date_utils_1 = require("../../../util/date_utils");
const common_1 = require("../../common");
const common_2 = require("./common");
const expanded_row_1 = require("./expanded_row");
const use_source_index_data_1 = require("./use_source_index_data");
const CELL_CLICK_ENABLED = false;
// Defining our own ENUM here.
// EUI's SortDirection wasn't usable as a union type
// required for the Sorting interface.
var SORT_DIRECTON;
(function (SORT_DIRECTON) {
    SORT_DIRECTON["ASC"] = "asc";
    SORT_DIRECTON["DESC"] = "desc";
})(SORT_DIRECTON || (SORT_DIRECTON = {}));
const SourceIndexPreviewTitle = ({ indexPatternTitle }) => (react_1.default.createElement(eui_1.EuiTitle, { size: "xs" },
    react_1.default.createElement("span", null, i18n_1.i18n.translate('xpack.ml.dataframe.sourceIndexPreview.sourceIndexPatternTitle', {
        defaultMessage: 'Source index {indexPatternTitle}',
        values: { indexPatternTitle },
    }))));
exports.SourceIndexPreview = react_1.default.memo(({ cellClick, query }) => {
    const [clearTable, setClearTable] = react_1.useState(false);
    const kibanaContext = react_1.useContext(common_1.KibanaContext);
    if (!common_1.isKibanaContext(kibanaContext)) {
        return null;
    }
    const indexPattern = kibanaContext.currentIndexPattern;
    const [selectedFields, setSelectedFields] = react_1.useState([]);
    const [isColumnsPopoverVisible, setColumnsPopoverVisible] = react_1.useState(false);
    // EuiInMemoryTable has an issue with dynamic sortable columns
    // and will trigger a full page Kibana error in such a case.
    // The following is a workaround until this is solved upstream:
    // - If the sortable/columns config changes,
    //   the table will be unmounted/not rendered.
    //   This is what setClearTable(true) in toggleColumn() does.
    // - After that on next render it gets re-enabled. To make sure React
    //   doesn't consolidate the state updates, setTimeout is used.
    if (clearTable) {
        setTimeout(() => setClearTable(false), 0);
    }
    function toggleColumnsPopover() {
        setColumnsPopoverVisible(!isColumnsPopoverVisible);
    }
    function closeColumnsPopover() {
        setColumnsPopoverVisible(false);
    }
    function toggleColumn(column) {
        // spread to a new array otherwise the component wouldn't re-render
        setClearTable(true);
        setSelectedFields([...common_2.toggleSelectedField(selectedFields, column)]);
    }
    const [itemIdToExpandedRowMap, setItemIdToExpandedRowMap] = react_1.useState({});
    function toggleDetails(item) {
        if (itemIdToExpandedRowMap[item._id]) {
            delete itemIdToExpandedRowMap[item._id];
        }
        else {
            itemIdToExpandedRowMap[item._id] = react_1.default.createElement(expanded_row_1.ExpandedRow, { item: item });
        }
        // spread to a new object otherwise the component wouldn't re-render
        setItemIdToExpandedRowMap({ ...itemIdToExpandedRowMap });
    }
    const { errorMessage, status, tableItems } = use_source_index_data_1.useSourceIndexData(indexPattern, query, selectedFields, setSelectedFields);
    if (status === use_source_index_data_1.SOURCE_INDEX_STATUS.ERROR) {
        return (react_1.default.createElement(eui_1.EuiPanel, { grow: false },
            react_1.default.createElement(SourceIndexPreviewTitle, { indexPatternTitle: indexPattern.title }),
            react_1.default.createElement(eui_1.EuiCallOut, { title: i18n_1.i18n.translate('xpack.ml.dataframe.sourceIndexPreview.sourceIndexPatternError', {
                    defaultMessage: 'An error occurred loading the source index data.',
                }), color: "danger", iconType: "cross" },
                react_1.default.createElement("p", null, errorMessage))));
    }
    if (status === use_source_index_data_1.SOURCE_INDEX_STATUS.LOADED && tableItems.length === 0) {
        return (react_1.default.createElement(eui_1.EuiPanel, { grow: false },
            react_1.default.createElement(SourceIndexPreviewTitle, { indexPatternTitle: indexPattern.title }),
            react_1.default.createElement(eui_1.EuiCallOut, { title: i18n_1.i18n.translate('xpack.ml.dataframe.sourceIndexPreview.dataFrameSourceIndexNoDataCalloutTitle', {
                    defaultMessage: 'Empty source index query result.',
                }), color: "primary" },
                react_1.default.createElement("p", null, i18n_1.i18n.translate('xpack.ml.dataframe.sourceIndexPreview.dataFrameSourceIndexNoDataCalloutBody', {
                    defaultMessage: 'The query for the source index returned no results. Please make sure the index contains documents and your query is not too restrictive.',
                })))));
    }
    let docFields = [];
    let docFieldsCount = 0;
    if (tableItems.length > 0) {
        docFields = Object.keys(tableItems[0]._source);
        docFields.sort();
        docFieldsCount = docFields.length;
    }
    const columns = selectedFields.map(k => {
        const column = {
            field: `_source["${k}"]`,
            name: k,
            sortable: true,
            truncateText: true,
        };
        const field = indexPattern.fields.find(f => f.name === k);
        const render = (d) => {
            return field !== undefined && field.type === field_types_1.KBN_FIELD_TYPES.DATE
                ? date_utils_1.formatHumanReadableDateTimeSeconds(moment_timezone_1.default(d).unix() * 1000)
                : d;
        };
        column.render = render;
        if (CELL_CLICK_ENABLED && cellClick) {
            column.render = (d) => (react_1.default.createElement(eui_1.EuiButtonEmpty, { size: "xs", onClick: () => cellClick(`${k}:(${d})`) }, render(d)));
        }
        return column;
    });
    let sorting = false;
    if (columns.length > 0) {
        sorting = {
            sort: {
                field: columns[0].field,
                direction: SORT_DIRECTON.ASC,
            },
        };
    }
    columns.unshift({
        align: eui_1.RIGHT_ALIGNMENT,
        width: '40px',
        isExpander: true,
        render: (item) => (react_1.default.createElement(eui_1.EuiButtonIcon, { onClick: () => toggleDetails(item), "aria-label": itemIdToExpandedRowMap[item._id]
                ? i18n_1.i18n.translate('xpack.ml.dataframe.sourceIndexPreview.rowCollapse', {
                    defaultMessage: 'Collapse',
                })
                : i18n_1.i18n.translate('xpack.ml.dataframe.sourceIndexPreview.rowExpand', {
                    defaultMessage: 'Expand',
                }), iconType: itemIdToExpandedRowMap[item._id] ? 'arrowUp' : 'arrowDown' })),
    });
    const euiCopyText = i18n_1.i18n.translate('xpack.ml.dataframe.sourceIndexPreview.copyClipboardTooltip', {
        defaultMessage: 'Copy Dev Console statement of the source index preview to the clipboard.',
    });
    return (react_1.default.createElement(eui_1.EuiPanel, { grow: false },
        react_1.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center", justifyContent: "spaceBetween" },
            react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                react_1.default.createElement(SourceIndexPreviewTitle, { indexPatternTitle: indexPattern.title })),
            react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                react_1.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center", gutterSize: "xs" },
                    react_1.default.createElement(eui_1.EuiFlexItem, null, docFieldsCount > common_2.MAX_COLUMNS && (react_1.default.createElement(eui_1.EuiText, { size: "s" }, i18n_1.i18n.translate('xpack.ml.dataframe.sourceIndexPreview.fieldSelection', {
                        defaultMessage: 'showing {selectedFieldsLength, number} of {docFieldsCount, number} {docFieldsCount, plural, one {field} other {fields}}',
                        values: { selectedFieldsLength: selectedFields.length, docFieldsCount },
                    })))),
                    react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                        react_1.default.createElement(eui_1.EuiText, { size: "s" },
                            react_1.default.createElement(eui_1.EuiPopover, { id: "popover", button: react_1.default.createElement(eui_1.EuiButtonIcon, { iconType: "gear", onClick: toggleColumnsPopover, "aria-label": i18n_1.i18n.translate('xpack.ml.dataframe.sourceIndexPreview.selectColumnsAriaLabel', {
                                        defaultMessage: 'Select columns',
                                    }) }), isOpen: isColumnsPopoverVisible, closePopover: closeColumnsPopover, ownFocus: true },
                                react_1.default.createElement(eui_1.EuiPopoverTitle, null, i18n_1.i18n.translate('xpack.ml.dataframe.sourceIndexPreview.selectFieldsPopoverTitle', {
                                    defaultMessage: 'Select fields',
                                })),
                                react_1.default.createElement("div", { style: { maxHeight: '400px', overflowY: 'scroll' } }, docFields.map(d => (react_1.default.createElement(eui_1.EuiCheckbox, { key: d, id: d, label: d, checked: selectedFields.includes(d), onChange: () => toggleColumn(d), disabled: selectedFields.includes(d) && selectedFields.length === 1 }))))))),
                    react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                        react_1.default.createElement(eui_1.EuiCopy, { beforeMessage: euiCopyText, textToCopy: common_2.getSourceIndexDevConsoleStatement(query, indexPattern.title) }, (copy) => (react_1.default.createElement(eui_1.EuiButtonIcon, { onClick: copy, iconType: "copyClipboard", "aria-label": euiCopyText }))))))),
        status === use_source_index_data_1.SOURCE_INDEX_STATUS.LOADING && react_1.default.createElement(eui_1.EuiProgress, { size: "xs", color: "accent" }),
        status !== use_source_index_data_1.SOURCE_INDEX_STATUS.LOADING && (react_1.default.createElement(eui_1.EuiProgress, { size: "xs", color: "accent", max: 1, value: 0 })),
        clearTable === false && (react_1.default.createElement(ExpandableTable, { compressed: true, items: tableItems, columns: columns, pagination: {
                initialPageSize: 5,
                pageSizeOptions: [5, 10, 25],
            }, hasActions: false, isSelectable: false, itemId: "_id", itemIdToExpandedRowMap: itemIdToExpandedRowMap, isExpandable: true, sorting: sorting }))));
});
